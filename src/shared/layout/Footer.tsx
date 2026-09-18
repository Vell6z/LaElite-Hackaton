import { Squirrel, Scale, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-[#112613] text-[#F9F6F0] pt-16 pb-8 px-6 border-t border-[#F9F6F0]/10 font-body">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          
          {/* Columna 1: Marca y Misión (6 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 font-sans font-bold text-xl tracking-tight mb-4 text-[#F9F6F0] group">
              <div className="w-8 h-8 rounded-lg bg-moss-500/20 border border-moss-500/30 flex items-center justify-center text-moss-300">
                <Squirrel className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span>BetterCall Lardy</span>
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
            </Link>
            <p className="text-[#F9F6F0]/80 leading-relaxed max-w-sm text-sm mb-4">
              Tu asesor legal de bolsillo. Desenredamos trámites y papeleo enredado para que tomes el control de tu situación con claridad.
            </p>
            <p className="text-amber-300/90 text-xs font-mono font-medium">
              “Tú disfruta tus nueces. Lardi trabaja... 🐿️🌰”
            </p>
          </div>

          {/* Columna 2: Navegación (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="font-sans font-semibold text-base mb-4 text-[#F9F6F0] tracking-wide">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#F9F6F0]/70">
              <li>
                <a href="#camino" className="hover:text-[#F2F4EB] hover:underline underline-offset-4 transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-[#F2F4EB] hover:underline underline-offset-4 transition-colors">
                  Nuestra historia
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F2F4EB] hover:underline underline-offset-4 transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F2F4EB] hover:underline underline-offset-4 transition-colors">
                  Madriguera jurídica
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Aviso Legal & Privacidad (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="font-sans font-semibold text-base mb-4 text-[#F9F6F0] tracking-wide">
              Aviso Importante
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-[#F9F6F0]/10 text-xs text-[#F9F6F0]/70 leading-relaxed space-y-2">
              <p>
                ⚖️ <strong className="text-[#F9F6F0]/90">Lardi es una herramienta de orientación inicial informativa.</strong> No sustituye la asesoría, concepto ni representación de un abogado profesional.
              </p>
              <p>
                Consultamos corpus normativos reales para brindarte información fundamentada y pasos accionables.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#F9F6F0]/10 text-xs text-[#F9F6F0]/50">
          <p>© 2026 BetterCall Lardy. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-3">
            <span>Hecho con ☕ y nueces en Medellín. 🌰</span>
            <a 
              href="https://github.com/Vell6z/LaElite-Hackaton" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#F9F6F0]/70 hover:text-[#F9F6F0] transition-colors p-1" 
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
