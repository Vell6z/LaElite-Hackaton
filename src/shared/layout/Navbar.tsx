import { Menu, Squirrel, X, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream-100/90 backdrop-blur-md border-b border-acorn-400/10 shadow-[0_2px_10px_rgba(17,38,19,0.03)]">
      <nav className="max-w-7xl w-full mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 text-moss-600 font-sans font-bold tracking-tight group">
          <div className="w-10 h-10 rounded-xl bg-moss-500/10 border border-moss-500/20 flex items-center justify-center text-moss-600 shadow-sm group-hover:scale-105 transition-transform">
            <Squirrel className="w-6 h-6 text-moss-600" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl text-moss-700 leading-tight">BetterCall Lardy</span>
              <Scale className="w-3.5 h-3.5 text-acorn-500" />
            </div>
            <span className="text-[10px] font-mono tracking-wider text-acorn-600/80 font-semibold uppercase leading-none">
              Asesor Legal de Bolsillo
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-acorn-600">
          <a href="#camino" className="hover:text-moss-600 transition-colors">
            El camino
          </a>
          <a href="#historia" className="hover:text-moss-600 transition-colors">
            Nuestra historia
          </a>
          <a href="#faq" className="hover:text-moss-600 transition-colors">
            Preguntas
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3 text-sm font-medium">
          <Link 
            to="/login" 
            className="text-acorn-600 hover:text-moss-600 px-4 py-2 transition-colors rounded-full hover:bg-moss-500/5 font-semibold text-xs uppercase tracking-wider"
          >
            Entrar a la madriguera jurídica
          </Link>
          <Link 
            to="/signup" 
            className="bg-moss-500 hover:bg-moss-600 text-white px-5 py-2.5 rounded-full shadow-sm shadow-moss-500/20 transition-all hover:shadow-md hover:scale-[1.02]"
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-acorn-600 p-2 rounded-lg hover:bg-acorn-400/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-cream-100/98 backdrop-blur-lg border-b border-acorn-400/15 shadow-xl flex flex-col px-6 py-6 gap-3"
          >
            <a 
              href="#camino" 
              className="text-acorn-600 hover:text-moss-600 font-medium py-2 px-3 rounded-lg hover:bg-moss-500/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              El camino para desenredar
            </a>
            <a 
              href="#historia" 
              className="text-acorn-600 hover:text-moss-600 font-medium py-2 px-3 rounded-lg hover:bg-moss-500/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nuestra historia
            </a>
            <a 
              href="#faq" 
              className="text-acorn-600 hover:text-moss-600 font-medium py-2 px-3 rounded-lg hover:bg-moss-500/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Preguntas frecuentes
            </a>

            <div className="h-px bg-acorn-400/15 my-2" />

            <Link 
              to="/login" 
              className="text-acorn-600 font-semibold py-2 px-3 hover:bg-acorn-400/10 rounded-lg transition-colors w-full text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar a la madriguera jurídica
            </Link>
            <Link
              to="/signup"
              className="bg-moss-500 hover:bg-moss-600 text-white text-center font-medium py-3 rounded-xl shadow-md transition-all mt-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrarse
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
