import React from "react";
import { Squirrel, Scale, FileText, ShieldCheck } from "lucide-react";

export function AuthHero() {
  return (
    <div className="hidden lg:flex w-1/2 bg-[#0A140B] relative flex-col justify-end p-16 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/eafitRegistro.jpeg" 
          alt="Fondo" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A140B] via-[#0A140B]/80 to-[#0A140B]/40"></div>
      </div>

      {/* Abstract Graphic Area (Lardi Legal) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-10 flex items-center justify-center">
          {/* Soft glow effect */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-moss-500/15 blur-[90px] rounded-full mix-blend-screen"></div>
          
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Floating Legal Elements */}
            <div className="absolute top-10 left-10 text-amber-400/50 animate-pulse"><Scale className="w-12 h-12" /></div>
            <div className="absolute bottom-20 right-10 text-moss-400/40 animate-pulse delay-700"><FileText className="w-14 h-14" /></div>
            <div className="absolute top-14 right-14 text-moss-300/30 animate-pulse delay-300"><ShieldCheck className="w-10 h-10" /></div>
            
            {/* Central figure - Stylized "Lardi" */}
            <div className="relative z-20 flex flex-col items-center drop-shadow-[0_0_20px_rgba(74,103,65,0.6)]">
              <Scale className="w-20 h-20 text-amber-400 mb-2" />
              <Squirrel className="w-32 h-32 text-[#F9F6F0]" />
            </div>
          </div>
      </div>

      {/* Motivation Text */}
      <div className="relative z-20 max-w-lg mt-auto border-l-4 border-amber-500 pl-6">
        <h1 className="text-5xl font-sans font-bold text-[#F9F6F0] mb-4 tracking-tight">
          Del enredo a la claridad.
        </h1>
        <p className="text-[#F9F6F0]/80 text-lg leading-relaxed">
          Tus trámites, documentos y requisitos organizados en un solo lugar. Continúa donde lo dejaste y avanza con tranquilidad. 🐿️⚖️
        </p>
      </div>
    </div>
  );
}
