import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

/**
 * Lee la GEMINI_API_KEY de forma robusta. Primero intenta process.env (cargado
 * por dotenv al arrancar). Si no está —por ejemplo, si el proceso arrancó antes
 * de que la clave se agregara al .env— la lee directamente del archivo .env.
 */
function resolveApiKey(): string | undefined {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const raw = fs.readFileSync(envPath, 'utf-8');
    const match = raw.match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/m);
    if (match) {
      const value = match[1].trim().replace(/^["']|["']$/g, '');
      if (value) {
        process.env.GEMINI_API_KEY = value; // cachear para llamadas siguientes
        return value;
      }
    }
  } catch {
    // Ignorar: si no se puede leer el archivo, devolvemos undefined abajo.
  }
  return undefined;
}

// Modelos a intentar, en orden. Si el primero está saturado (503/UNAVAILABLE)
// o no disponible, se prueba el siguiente. Esta cuenta usa la familia Gemini 3.x
// (según la respuesta de la API), con -latest como respaldo.
const MODELS = ['gemini-flash-latest', 'gemini-3.6-flash', 'gemini-2.0-flash'];

/**
 * System prompt que define la personalidad y las reglas de Lardi, el asesor
 * legal de bolsillo. Combina el tono cercano de la marca (ardilla 🐿️) con
 * reglas estrictas de responsabilidad legal.
 */
const SYSTEM_INSTRUCTION = `
Eres Lardi 🐿️⚖️, un asesor legal de bolsillo pensado para personas en Colombia
que NO tienen conocimientos jurídicos y no pueden pagar un abogado de inmediato.

TU MISIÓN
- Orientar a la persona como un primer punto de ayuda, explicando su situación
  en lenguaje sencillo, cercano y sin tecnicismos.
- Ayudarla a entender qué está pasando, qué derechos o normas PODRÍAN aplicar y
  qué pasos concretos puede considerar.

PERSONALIDAD
- Cercano, amable y un poco divertido, con español natural de Colombia/Latinoamérica.
- Usa la metáfora de "desenredar" el problema. Puedes usar 🐿️ y 🌰 con moderación.
- Nunca suenes corporativo ni como "abogado robot". Habla como una persona que
  sabe del tema y sabe explicarlo fácil.

REGLAS DE RESPONSABILIDAD (MUY IMPORTANTES)
- NUNCA inventes leyes, artículos, números de norma ni sentencias. Si no estás
  seguro de una norma exacta, dilo con honestidad y habla en términos generales.
- No presentes una suposición como si fuera un hecho jurídico definitivo.
- Si te falta información para orientar bien, DILO y pide los datos que necesitas.
- No pidas datos sensibles que no sean necesarios (documentos de identidad,
  números de cuenta, etc.).
- Deja SIEMPRE claro que eres una orientación inicial y que NO reemplazas a un
  abogado ni das asesoría profesional definitiva.

FORMATO DE RESPUESTA
Responde en español, en Markdown, y cuando el usuario ya te haya contado su caso,
organiza la respuesta así (omite secciones que no apliquen todavía):

**Lo que entendí**
Un resumen corto y en lenguaje claro de la situación de la persona.

**Qué podría aplicar**
Los derechos, principios o tipos de normas que PODRÍAN aplicar (en términos
generales, sin inventar artículos específicos).

**Qué puedes hacer**
Pasos concretos y accionables, en orden, fáciles de seguir.

**Qué me ayudaría saber**
Preguntas para afinar la orientación si falta información.

Sé conciso. Si el usuario apenas está saludando o su mensaje es muy corto,
NO uses todo el formato: responde de forma cálida e invítalo a contarte qué le pasó.
`.trim();

// Aviso legal que el frontend también muestra de forma visible.
export const LEGAL_DISCLAIMER =
  'Lardi te da una orientación inicial en lenguaje sencillo y no reemplaza la asesoría de un abogado. Para decisiones importantes, consulta con un profesional.';

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada en el .env');
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

/**
 * Envía el historial de la conversación + el mensaje nuevo a Gemini y devuelve
 * la respuesta de Lardi como texto en Markdown.
 *
 * @param history Turnos previos de la conversación (sin el mensaje nuevo).
 * @param message El mensaje/caso nuevo del usuario.
 */
export async function askLardi(history: ChatTurn[], message: string): Promise<string> {
  const ai = getClient();

  // Gemini exige que el historial empiece con un turno 'user'. Descartamos
  // cualquier turno 'model' que quede al inicio (p.ej. el saludo de bienvenida).
  const safeHistory = [...history];
  while (safeHistory.length > 0 && safeHistory[0].role !== 'user') {
    safeHistory.shift();
  }

  // Construir el arreglo de contenidos con roles para dar contexto multi-turno.
  const contents = [
    ...safeHistory.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    {
      role: 'user' as const,
      parts: [{ text: message }],
    },
  ];

  const config = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.4,
  };

  let lastError: any;

  // Recorremos los modelos; para cada uno reintentamos ante errores temporales
  // (503 UNAVAILABLE / 429 sobrecarga) con una pequeña espera creciente.
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await ai.models.generateContent({ model, contents, config });
        const text = response.text;
        if (text && text.trim()) {
          return text;
        }
        lastError = new Error('La IA no devolvió una respuesta');
      } catch (err: any) {
        lastError = err;
        const status = err?.status ?? err?.code;
        const msg = String(err?.message || '');
        const isTransient =
          status === 503 ||
          status === 429 ||
          /UNAVAILABLE|overloaded|high demand|RESOURCE_EXHAUSTED/i.test(msg);

        // Si el error NO es temporal (p.ej. modelo inexistente, auth), pasar al
        // siguiente modelo sin reintentar este.
        if (!isTransient) break;

        // Espera creciente antes de reintentar: 500ms, 1000ms, 1500ms.
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('La IA no devolvió una respuesta');
}
