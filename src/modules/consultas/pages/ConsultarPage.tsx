import { useState, useRef, useEffect } from "react";
import { Send, Squirrel, ShieldAlert, Scale } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "../../../shared/layout/Sidebar";
import { usePageTitle } from "../../../core/hooks/usePageTitle";

interface Message {
  role: "user" | "model";
  text: string;
}

const WELCOME: Message = {
  role: "model",
  text: "¡Hola! Soy Lardi 🐿️⚖️. Cuéntame qué te pasó o qué trámite no entiendes. No necesitas hablar en lenguaje jurídico, escríbelo con tus palabras y lo desenredamos juntos.",
};

const SUGGESTIONS = [
  "Mi arrendador quiere subirme el arriendo de un día para otro",
  "Me despidieron y no sé si me deben liquidación",
  "No entiendo un documento que me llegó",
  "Quiero poner un derecho de petición",
];

// Renderizador muy simple de Markdown -> HTML para las respuestas de Lardi.
// Soporta **negrita** y saltos de línea, que es lo que usa el prompt.
function renderMarkdown(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export function ConsultarPage() {
  usePageTitle("Cuéntale a Lardi");

  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setErrorMsg("");
    const userMessage: Message = { role: "user", text: trimmed };

    // Historial que se envía: todo menos el saludo inicial de bienvenida.
    const history = messages
      .filter((m) => m !== WELCOME)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "No se pudo obtener respuesta");
      }

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: any) {
      setErrorMsg(err.message || "A Lardi se le enredó la conexión. Intenta de nuevo. 🐿️");
      // Devolver el texto al input para que el usuario no lo pierda.
      setInputValue(trimmed);
      setMessages((prev) => prev.filter((m) => m !== userMessage));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F9F6F0] font-body text-[#112613]">
      <Sidebar />

      <main className="flex-1 h-full flex flex-col relative">
        {/* Header */}
        <header className="shrink-0 px-6 md:px-12 pt-8 pb-4 border-b border-acorn-400/20 bg-[#F9F6F0]">
          <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-moss-100 border border-moss-200/50 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6 text-moss-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-[#112613]">
                Cuéntale a Lardi 🐿️
              </h1>
              <p className="text-sm text-acorn-600 font-medium">
                Tú cuéntale qué pasó. Lardi te ayuda a entenderlo y a saber qué sigue.
              </p>
            </div>
          </div>
        </header>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-6">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                {msg.role === "model" && (
                  <div className="w-9 h-9 rounded-full bg-moss-100 border border-moss-200/50 flex items-center justify-center shrink-0 mt-1">
                    <Squirrel className="w-5 h-5 text-moss-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#112613] text-white rounded-tr-sm"
                      : "bg-white border border-acorn-400/15 text-acorn-800 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "model" ? (
                    <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start gap-3">
                <div className="w-9 h-9 rounded-full bg-moss-100 border border-moss-200/50 flex items-center justify-center shrink-0 mt-1">
                  <Squirrel className="w-5 h-5 text-moss-600" />
                </div>
                <div className="bg-white border border-acorn-400/15 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-acorn-500 font-medium">Lardi está peleando con el papeleo... 🐿️</span>
                </div>
              </div>
            )}

            {/* Sugerencias iniciales */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2 mt-2 pl-12"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-sm bg-white border border-acorn-400/25 hover:border-moss-500 hover:bg-moss-50 text-acorn-700 px-3.5 py-2 rounded-xl transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input + Disclaimer */}
        <div className="shrink-0 border-t border-acorn-400/20 bg-white px-6 md:px-12 pt-4 pb-3">
          <div className="max-w-3xl mx-auto w-full">
            {errorMsg && (
              <div className="mb-3 p-2.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Cuéntale a Lardi qué pasó…"
                className="flex-1 max-h-40 min-h-[48px] bg-acorn-50 border border-acorn-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-moss-500 focus:ring-2 focus:ring-moss-500/20 transition-all resize-none"
                rows={1}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-12 h-12 bg-moss-600 hover:bg-moss-700 disabled:bg-acorn-300 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-5 h-5 -ml-0.5" />
              </button>
            </form>

            <div className="flex items-start gap-2 mt-3 text-xs text-acorn-500">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
              <p>
                Lardi te da una orientación inicial en lenguaje sencillo y{" "}
                <span className="font-bold">no reemplaza a un abogado</span>. Para decisiones importantes,
                consulta con un profesional.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
