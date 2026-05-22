'use client'; 

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react'; 
import { ChevronRight, Zap, X, Orbit, Sparkles } from 'lucide-react';

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
  const [showForm, setShowForm] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Listener para interceptar el portal global
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsPortalOpen(true);
      setShowForm(false);
    };

    window.addEventListener('open-cosmic-portal', handleExternalOpen);
    return () => {
      window.removeEventListener('open-cosmic-portal', handleExternalOpen);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Interceptamos la URL base usando la variable de entorno o un fallback dinámico
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cosmic-imagination.com';

    try {
      // Modificado para usar la URL dinámica con un template string sin romper la ruta original
      const response = await fetch(`${BASE_API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'No registrado',
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('¡Transmisión Sincronizada! El brief ha cruzado el portal de forma segura.');
        setIsPortalOpen(false);
        setShowForm(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(`Interferencia detectada: ${data.detail || 'Error al procesar la transmission.'}`);
      }
    } catch (error) {
      console.error('Fallo crítico al conectar con el backend:', error);
      alert('Error de conexión cósmica.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white text-neon-glow-css  border-b border-cyan-400/20 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.9)]"> 
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

            {/* CTA Desktop */}
            <div className="hidden md:flex items-center"> 
              <motion.button
                onClick={() => { setIsPortalOpen(true); setShowForm(false); }}
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
                {/* Micro texto mono */}
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 group-hover:text-cyan-400 transition-colors uppercase">
                  {isOpen ? '// Close' : '// Menu'}
                </span>
                
                {/* Estrella de 4 puntas Mutante */}
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
            {/* Efecto de fondo místico interno */}
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

              {/* Botón de Acción en Móvil */}
              <motion.div variants={linkVariants} className="pt-8 border-t border-neutral-900">
                <button
                  onClick={() => { setIsOpen(false); setIsPortalOpen(true); setShowForm(false); }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-sans font-black rounded-xl text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                >
                  LAUNCH COSMIC PORTAL
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PORTAL MÍSTICO INTERACTIVO --- */}
      <AnimatePresence>
        {isPortalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transform-gpu">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => !isSubmitting && setIsPortalOpen(false)}
              className="absolute inset-0 bg-black/90 will-change-transform"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }} 
              style={{ willChange: "transform, opacity" }}
              className="relative w-full max-w-5xl bg-neutral-950 border border-cyan-400/20 p-6 md:p-10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)]"
            >
              <button 
                disabled={isSubmitting} onClick={() => setIsPortalOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-cyan-400 hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-neutral-900/60 z-50"
              >
                <X className="h-6 w-6 drop-shadow-[0_0_8px_#00FFFF]" />
              </button>

              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full items-center relative z-10 gap-10">
                <div className="hidden md:flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-[260px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-cyan-400/5 animate-[spin_80s_linear_infinite]" />
                    <motion.div 
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 2.0, repeat: Infinity, ease: "linear" }}
                      className="w-40 h-56 relative flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(0,240,253,0.25)] transform-gpu"
                    >
                      <svg viewBox="0 0 200 260" className="w-full h-full text-white">
                        <circle cx="60" cy="150" r="10" fill="none" stroke="#00FFFF" strokeWidth="1" className="opacity-40 animate-pulse" />
                        <circle cx="140" cy="150" r="10" fill="none" stroke="#00FFFF" strokeWidth="1" className="opacity-40 animate-pulse" />
                        <path d="M70,110 L130,110 L140,185 L60,185 Z" fill="#080808" stroke="#00f0fd" strokeWidth="2.5" />
                        <circle cx="100" cy="142" r="10" fill="#000" stroke="#9333ea" strokeWidth="1.5" />
                        <polygon points="100,138 104,145 96,145" fill="#00FFFF" />
                        <path d="M55,120 L34,145 L44,152" fill="none" stroke="#00f0fd" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M145,120 L166,145 L156,152" fill="none" stroke="#00f0fd" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M75,185 L72,225 L82,230" fill="none" stroke="#00f0fd" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M125,185 L128,225 L118,230" fill="none" stroke="#00f0fd" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="100" cy="70" r="34" fill="#030303" stroke="#00f0fd" strokeWidth="3.5" />
                        <path d="M70,70 Q100,48 130,70 Q100,92 70,70" fill="url(#portalGlowOptimized)" stroke="#00FFFF" strokeWidth="1" />
                        <defs>
                          <radialGradient id="portalGlowOptimized" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>
                </div>

                <div className="relative min-h-[420px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {!showForm ? (
                      <motion.div
                        key="manifesto" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.15 }}
                        className="space-y-5"
                      >
                        <div className="flex items-center space-x-3">
                          <Zap className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-neutral-500 font-mono text-[9px] tracking-[0.4em]">// DIRECT NEURAL LINK //</h3>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider leading-none">
                          Join the Conscious<br/>Impact <span className="text-cyan-400">Ecosystem</span>
                        </h2>
                        <div className="h-[2px] w-20 bg-gradient-to-r from-purple-500 to-transparent" />
                        <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                          Has activado el núcleo de **Cosmic Imagination**. Fusionamos algoritmos avanzados y arquitectura limpia para materializar soluciones digitales de alto impacto técnico y estratégico.
                        </p>
                        <p className="text-neutral-500 text-xs border-l border-neutral-800 pl-4 font-sans">
                          No hacemos software genérico. Estructuramos portales de alta fidelidad blindados para potenciar flujos auténticos de conversión y control.
                        </p>
                        <div className="pt-4">
                          <motion.button
                            onClick={() => setShowForm(true)}
                            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(6,182,212,0.6)' }} whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-sans font-extrabold rounded-full text-xs tracking-widest uppercase transition-all duration-200"
                          >
                            Sincronizar Consciencia ✨
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="contact-form" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.15 }}
                        onSubmit={handleFormSubmit} className="space-y-3.5"
                      >
                        <div>
                          <h3 className="text-cyan-400 font-mono text-xs tracking-wider uppercase">// TRANSMIT MISSION BRIEF</h3>
                          <p className="text-neutral-400 text-xs font-sans">Ingresa tus coordenadas para iniciar la sincronización técnica.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" name="name" required disabled={isSubmitting} placeholder="Full name" value={formData.name} onChange={handleInputChange}
                            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-cyan-400/70 rounded-xl px-4 py-2.5 text-xs text-white font-sans outline-none transition-colors disabled:opacity-40"
                          />
                          <input 
                            type="email" name="email" required disabled={isSubmitting} placeholder="Email address" value={formData.email} onChange={handleInputChange}
                            className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-cyan-400/70 rounded-xl px-4 py-2.5 text-xs text-white font-sans outline-none transition-colors disabled:opacity-40"
                          />
                        </div>

                        <input 
                          type="text" name="phone" disabled={isSubmitting} placeholder="Phone Number" value={formData.phone} onChange={handleInputChange}
                          className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-cyan-400/70 rounded-xl px-4 py-2.5 text-xs text-white font-sans outline-none transition-colors disabled:opacity-40"
                        />
                        <input 
                          type="text" name="subject" required disabled={isSubmitting} placeholder="Subject" value={formData.subject} onChange={handleInputChange}
                          className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-cyan-400/70 rounded-xl px-4 py-2.5 text-xs text-white font-sans outline-none transition-colors disabled:opacity-40"
                        />
                        <textarea 
                          name="message" required disabled={isSubmitting} rows={3} placeholder="Tell us about your project..." value={formData.message} onChange={handleInputChange}
                          className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-cyan-400/70 rounded-xl px-4 py-2.5 text-xs text-white font-sans outline-none transition-colors resize-none disabled:opacity-40"
                        />

                        <div className="pt-2 flex items-center justify-between gap-4">
                          <button 
                            type="button" disabled={isSubmitting} onClick={() => setShowForm(false)}
                            className="text-neutral-500 hover:text-neutral-300 font-mono text-[10px] tracking-wider uppercase transition-colors"
                          >
                            ← Volver
                          </button>
                          <motion.button
                            type="submit" disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 20px rgba(6,182,212,0.6)' } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            className="px-8 py-3 bg-cyan-400 text-black font-sans font-extrabold rounded-full text-xs tracking-widest uppercase transition-all duration-200 disabled:bg-neutral-800"
                          >
                            {isSubmitting ? 'TRANSMITTING...' : 'SEND BRIEF'}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}