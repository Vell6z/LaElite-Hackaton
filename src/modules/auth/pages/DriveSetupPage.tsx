import React, { useState } from "react";
import { Squirrel, Cloud, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export function DriveSetupPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive.file',
    // El flujo auth-code (popup) solicita acceso offline por defecto; el backend
    // canjea el 'code' por access_token + refresh_token.
    onSuccess: async ({ code }) => {
      setIsConnecting(true);
      setError("");
      try {
        const response = await fetch('http://localhost:5000/api/drive/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code })
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Error al vincular Drive');
        }

        // Éxito, redirigir al dashboard
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'A Lardi se le enredó la conexión. Intentémoslo otra vez. 🐿️');
        setIsConnecting(false);
      }
    },
    onError: () => {
      setError("La conexión con Google se canceló o falló. Cuando quieras, lo volvemos a intentar.");
      setIsConnecting(false);
    }
  });

  return (
    <div className="min-h-screen bg-[#F9F6F0] font-body text-[#112613] flex flex-col relative overflow-hidden selection:bg-moss-200">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-moss-200/20 blur-3xl mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-acorn-200/20 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[30%] left-[20%] opacity-[0.03] scale-150">
          <Squirrel className="w-[500px] h-[500px]" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/50 relative overflow-hidden text-center flex flex-col gap-6"
        >
          <div className="mx-auto w-20 h-20 bg-moss-100 rounded-3xl flex items-center justify-center rotate-12 shadow-inner border border-moss-200/50">
            <Cloud className="w-10 h-10 text-moss-600 -rotate-12" />
          </div>

          <div>
            <h1 className="text-3xl font-sans font-bold text-[#112613] tracking-tight mb-3">
              Prepara el nido para tus documentos 🐿️
            </h1>
            <p className="text-acorn-600 font-medium">
              Lardi guarda tus documentos, requisitos y todo el papeleo de tus trámites en tu propio Google Drive.
              Así todo queda ordenado en un solo lugar, seguro y bajo tu control.
            </p>
          </div>

          <div className="bg-acorn-50/50 border border-acorn-100 rounded-2xl p-5 text-left flex flex-col gap-3 my-2">
             <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-moss-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-acorn-700">Lardi solo entra a la carpeta <span className="font-bold">"LaPaginaDeLardi"</span> que crea para ti. El resto de tus archivos ni los mira.</p>
             </div>
             <div className="flex items-start gap-3">
                <Cloud className="w-5 h-5 text-moss-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-acorn-700">Tus documentos viven en tu propio Drive, así que tú siempre tienes la última palabra sobre ellos.</p>
             </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          <button 
            onClick={() => handleGoogleLogin()}
            disabled={isConnecting}
            className="w-full mt-2 bg-[#112613] hover:bg-moss-900 disabled:bg-acorn-300 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-moss-900/20 flex items-center justify-center gap-3"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                Lardi está armando el nido... 🐿️ <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              </span>
            ) : (
              <>
                <Cloud className="w-5 h-5" />
                Conectar mi Google Drive
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          
          <p className="text-xs text-acorn-400 font-medium mt-2">
            Al continuar, le das permiso a Lardi para crear su carpeta y guardar ahí tu papeleo. 🌰
          </p>
        </motion.div>
      </div>
    </div>
  );
}
