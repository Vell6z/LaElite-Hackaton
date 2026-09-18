import React from "react";
import { ChevronRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TypewriterEffect } from "./TypewriterEffect";

export function HeroSection() {
  return (
    <main className="relative z-10 max-w-7xl w-full mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32 flex-1 flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Column - Text & CTA */}
        <div className="flex flex-col items-start space-y-8">



          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-moss-600 leading-[1.1] tracking-tight">
            Tu ardilla <br />
            <span className="text-acorn-500 relative inline-block">
              JURÍDICA
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/30 -rotate-1 rounded-full" />
            </span> de confianza
          </h1>

          <div className="space-y-4 max-w-lg">
            <p className="text-xl md:text-2xl font-sans font-bold text-moss-700 leading-snug">
              Tú disfruta tus nueces. Lardi se encarga del papeleo. 🌰
            </p>

            <p className="text-base md:text-lg text-acorn-600/90 leading-relaxed font-body">
              ¿Un documento que no entiendes? ¿Un trámite que parece no tener ni pies ni cabeza? Tranqui, para eso está Lardi. Te ayudamos a desenredar la situación, organizar tus papeles y encontrar los pasos que puedes seguir, sin rodeos ni letra chiquita.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Link
              to="/signup"
              className="group bg-moss-500 hover:bg-moss-600 text-white text-lg font-medium px-8 py-4 rounded-2xl shadow-lg shadow-moss-500/20 transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3"
            >
              Cuéntale a Lardi 🐿️
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#historia"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cream-200 hover:bg-cream-200/50 text-acorn-600 font-medium transition-colors border border-transparent hover:border-acorn-500/20"
            >
              <Play className="w-5 h-5 fill-current" />
              Conoce la historia
            </a>
          </div>
        </div>

        {/* Right Column - Illustration Mock */}
        <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0 lg:max-w-none">
          {/* The "Tree Base / Madriguera" */}
          <div className="absolute inset-0 bg-gradient-to-br from-acorn-400/20 to-moss-500/10 rounded-[3rem] rotate-3 shadow-2xl backdrop-blur-sm border border-white/40" />

          {/* Main Illustration Container */}
          <div className="absolute inset-0 bg-white/40 rounded-[3rem] shadow-inner backdrop-blur-md border border-white/60 overflow-hidden flex items-end justify-center p-8">

            {/* Lardi Placeholder Image */}
            <div className="relative w-full h-full flex flex-col items-center justify-end z-10">
              {/* Holographic Screen */}
              <div className="w-[80%] h-48 bg-cream-100/80 backdrop-blur-md rounded-2xl border border-white shadow-xl mb-8 p-4 relative transform -rotate-2 -translate-y-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-acorn-400/10 pb-2">
                  <div className="flex items-center gap-2 text-moss-600 text-sm font-semibold font-sans">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span>Lardi IA Está En Eso... 🐿️</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-acorn-400/40" />
                    <div className="w-2 h-2 rounded-full bg-acorn-400/40" />
                    <div className="w-2 h-2 rounded-full bg-acorn-400/40" />
                  </div>
                </div>
                <div className="flex-1">
                  <TypewriterEffect />
                </div>
                {/* Floating Acorns */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-yellow-400/30 backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.5)] flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="absolute top-1/2 -left-6 w-6 h-6 rounded-full bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center animate-bounce delay-100">
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                </div>
              </div>

              {/* Squirrel Image */}
              <img
                src="/LardiAbogado.jpeg"
                alt="Lardi la ardilla jurídica"
                className="w-64 h-64 object-cover object-center rounded-full shadow-2xl border-4 border-cream-100 z-10 transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
