import { Router, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { protect, AuthRequest } from '../../../core/middlewares/auth.middleware.js';
import { askLardi, LEGAL_DISCLAIMER, ChatTurn } from '../../../core/services/legal-ai.service.js';

const router = Router();

// Limitar el uso de la IA para evitar abuso / costos inesperados.
const consultaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 60, // hasta 60 mensajes por ventana por IP
  message: { message: 'Le diste mucho trabajo a Lardi 🐿️. Espera un momento e intenta de nuevo.' },
});

router.use(protect);
router.use(consultaLimiter);

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;

/**
 * POST /api/consultas
 * Recibe el mensaje del usuario (su caso) y el historial previo, y devuelve
 * la respuesta de Lardi generada por Gemini.
 *
 * body: { message: string, history?: { role: 'user' | 'model', text: string }[] }
 */
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body as {
      message?: unknown;
      history?: unknown;
    };

    if (typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ message: 'Cuéntale a Lardi qué pasó para poder ayudarte.' });
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({ message: 'El mensaje es demasiado largo. Intenta resumirlo un poco.' });
      return;
    }

    // Validar y normalizar el historial recibido del cliente.
    let safeHistory: ChatTurn[] = [];
    if (Array.isArray(history)) {
      safeHistory = history
        .filter(
          (t: any) =>
            t &&
            (t.role === 'user' || t.role === 'model') &&
            typeof t.text === 'string' &&
            t.text.trim().length > 0
        )
        .slice(-MAX_HISTORY_TURNS)
        .map((t: any) => ({ role: t.role, text: String(t.text).slice(0, MAX_MESSAGE_LENGTH) }));
    }

    const reply = await askLardi(safeHistory, message.trim());

    res.json({ reply, disclaimer: LEGAL_DISCLAIMER });
  } catch (error: any) {
    // Log detallado para diagnóstico (nombre, mensaje y status del error de Gemini).
    console.error('Error en consulta legal:', {
      name: error?.name,
      message: error?.message,
      status: error?.status,
      stack: error?.stack?.split('\n').slice(0, 3).join(' | '),
    });

    // Si falta la API key, dar un mensaje claro para configurarla.
    if (typeof error?.message === 'string' && error.message.includes('GEMINI_API_KEY')) {
      res.status(503).json({
        message: 'La IA de Lardi no está configurada todavía. Falta la GEMINI_API_KEY en el servidor.',
      });
      return;
    }

    res.status(500).json({
      message: 'A Lardi se le enredó el análisis. Intenta de nuevo en un momento. 🐿️',
    });
  }
});

export default router;
