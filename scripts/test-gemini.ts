import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

async function main() {
  const key = process.env.GEMINI_API_KEY;
  console.log('KEY present:', !!key, 'starts:', key?.slice(0, 6));
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const res = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: 'hola, responde en una frase',
      config: { systemInstruction: 'Eres un asistente breve.' },
    });
    console.log('OK RESPONSE:', res.text);
  } catch (e: any) {
    console.log('SDK ERROR NAME:', e?.name);
    console.log('SDK ERROR MESSAGE:', e?.message);
    console.log('SDK ERROR STATUS:', e?.status);
  }
}

main();
