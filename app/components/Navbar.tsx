'use client'; 

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react'; 
import { X } from 'lucide-react';
// Importamos el nuevo portal modularizado desde la raíz de componentes
import CosmicPortal from '@/app/components/CosmicPortal';

const NavLinks = [
  { name: 'Cosmovision', href: '/cosmovision' },
  { name: 'Services', href: '/services' },
  { name: 'Imagination', href: '/imagination' },
  { name: 'Consciousness', href: '/consciousness' }, 
];

// Variantes corregidas con tipado estricto para evitar conflictos en el compilador de Next.js
const menuVariants = {
  closed: { 
    opacity: 0, 
    y: "-100%", 
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    } 
  },
  open: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15, 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    } 
  }
} as const;

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
} as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isPortalOpen, setIsPortalOpen] = useState(false); 

  // Listener para interceptar la apertura del portal de forma global (ej. desde el zoom del Home)
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsPortalOpen(true);
    };

    window.addEventListener('open-cosmic-portal', handleExternalOpen);
    return () => {
      window.removeEventListener('open-cosmic-portal', handleExternalOpen);
    };
  }, []);

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.textContent = 'Co§mic Imagination';
      parent.className = "text-xl font-bold text-cyan-400 tracking-wider text-neon-glow-css transition-all duration-300";
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white text-neon-glow-css border-b border-cyan-400/20 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.9)]"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 relative z-50">
              <a href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
                <img
                  src="https://i.ibb.co/5xX2BghC/logo33.jpg"
                  alt="Co§mic Imagination Logo"
                  className="h-12 w-auto drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  onError={handleLogoError}
                />
              </a>
            </div>

            {/* Enlaces Desktop */}
            <nav className="hidden md:flex space-x-6 lg:space-x-10"> 
              {NavLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative group">
                  <a href={link.href} className="text-white font-sans text-base font-semibold tracking-[0.1em] transition-colors duration-300 group-hover:text-cyan-400 block py-2">
                    {link.name}
                  </a>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full drop-shadow-[0_0_6px_#00FFFF]" />
                </motion.div>
              ))}
            </nav>

            {/* CTA Desktop - Llama al componente modularizado */}
            <div className="hidden md:flex items-center"> 
              <motion.button
                onClick={() => setIsPortalOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6,182,212,0.9)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-cyan-400 text-black font-sans font-bold rounded-full text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:bg-cyan-300"
              >
                Cosmic Portal
              </motion.button>
            </div>

            {/* Hamburguesa Cósmica Artística Móvil */}
            <div className="flex items-center md:hidden relative z-50">
              <motion.button 
                onClick={() => setIsOpen(!isOpen)} 
                type="button" 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-neutral-900/50 hover:bg-neutral-900/80 transition-all focus:outline-none group select-none"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 group-hover:text-cyan-400 transition-colors uppercase">
                  {isOpen ? '// Close' : '// Menu'}
                </span>
                
                <motion.div
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-5 h-5 flex items-center justify-center text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.7)]"
                >
                  {isOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7Z" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>

          </div>
        </div>
      </header>

      {/* --- MENÚ DESPLEGABLE RESPONSIVO CÓSMICO --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-x-0 top-0 h-screen bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center px-8 md:hidden border-b border-cyan-500/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.1),transparent_60%)] pointer-events-none" />

            <div className="space-y-8 relative z-10 max-w-sm mx-auto w-full">
              <div className="flex flex-col space-y-5">
                {NavLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <a 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-extralight tracking-tight text-neutral-300 hover:text-cyan-400 transition-colors block py-2 uppercase"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Botón de Acción en Móvil - También abre el nuevo portal */}
              <motion.div variants={linkVariants} className="pt-8 border-t border-neutral-900">
                <button
                  onClick={() => { setIsOpen(false); setIsPortalOpen(true); }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-sans font-black rounded-xl text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                >
                  LAUNCH COSMIC PORTAL
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          LLAMADO ÚNICO AL COMPONENTE MODULARIZADO COSMIC PORTAL
      ======================================================== */}
      <CosmicPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </>
  );
}