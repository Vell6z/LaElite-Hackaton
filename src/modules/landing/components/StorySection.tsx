import React from "react";
import { Scale, Sparkles } from "lucide-react";

export function StorySection() {
  return (
    <section id="historia" className="relative z-10 max-w-5xl w-full mx-auto px-6 pb-32 scroll-mt-24">
      <div className="relative group">
        {/* Decorative background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-moss-500/5 to-acorn-400/5 rounded-[2.5rem] rotate-1 group-hover:rotate-2 transition-transform duration-500" />
        <div className="absolute inset-0 bg-white/40 rounded-[2.5rem] shadow-sm -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />

        {/* Content Container */}
        <div className="relative bg-cream-100 rounded-[2.5rem] p-10 md:p-16 shadow-xl shadow-acorn-500/5 border border-acorn-400/10 flex flex-col md:flex-row gap-12 items-center">

          {/* Left side: Icon/Avatar representation */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
              <img
                src="/LardiFoto.jpeg"
                alt="Lardi la ardilla"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 bg-moss-500 text-white p-3 rounded-full shadow-lg z-20">
                <Scale className="w-6 h-6" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-sans font-bold text-moss-600 text-xl">Lardi</h3>
              <p className="text-acorn-500 text-sm font-medium">PhD de derechos de las ardillas</p>
            </div>
          </div>

          {/* Right side: Story Text */}
          <div className="w-full md:w-2/3 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 text-yellow-600 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Nuestra Historia</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-bold text-moss-600 leading-tight">
              Una ardilla con una misión bastante seria
            </h2>

            <div className="space-y-4 text-acorn-600/90 leading-relaxed font-body">
              <p>
                Lardi no es una ardilla cualquiera. Después de pasar demasiado tiempo viendo a personas enfrentarse a documentos, requisitos y trámites que parecen escritos en otro idioma, decidió que ya era hora de hacer algo al respecto.
              </p>
              <p>
                Porque seamos sinceros: entender un trámite legal no debería requerir un doctorado en leer letra pequeña.
              </p>
              <p>
                Así nació Lardi, una herramienta pensada para ayudarte a entender qué está pasando con tu situación, organizar la información importante, revisar tus documentos y encontrar los pasos que puedes seguir.
              </p>
              <p className="font-medium text-moss-700">
                Tú cuéntale qué pasa; Lardi se encarga de desenredarlo. 🐿️
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
