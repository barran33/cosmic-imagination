"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Activity, Atom } from 'lucide-react'; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 

// ========================================================
// WIDGET INTERACTIVO DEL ASTRONAUTA (NAVEGANTE DEL VACÍO)
// ========================================================
const AstronautWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-auto cursor-pointer group"
    >
      {/* CORRECCIÓN DE ESCALA: Contenedor compacto en móviles (w-20 h-28) y completo en escritorio (md:w-32 md:h-44) */}
      <div className="relative w-20 h-28 md:w-32 md:h-44 flex flex-col items-center justify-center animate-float-supreme">
        
        {/* Aura de energía cuántica trasera (Se expande en Hover) */}
        <div className="absolute inset-0 bg-cyan-500/0 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-700" />
        
        {/* Resplandor Cian de la Hoverboard trasera */}
        <div className="absolute bottom-4 md:bottom-6 w-10 h-10 md:w-16 md:h-16 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-700" />
        
        {/* SVG del Astronauta Cuántico */}
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-500">
          <defs>
            <linearGradient id="visor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="50%" stopColor="#000000" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Cuerpo / Traje Espacial */}
          <g fill="#FFFFFF" stroke="#06B6D4" strokeWidth="1">
            {/* Casco */}
            <circle cx="50" cy="40" r="18" fill="#0d0d0d" strokeWidth="1.5" />
            
            {/* Visor Neón (Portal de Reflejos) */}
            <ellipse cx="50" cy="38" rx="13" ry="10" fill="url(#visor-gradient)" stroke="#22D3EE" strokeWidth="1.5" style={{ filter: 'url(#neon-glow)' }} />
            
            {/* Detalle de Brillo en el Visor (Animado en Hover) */}
            <motion.path 
              d="M42 33 Q46 30 52 31" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="1.5" 
              animate={{ opacity: isHovered ? [0.7, 1, 0.7] : 0.7, pathLength: isHovered ? [0.8, 1, 0.8] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Mochila de Soporte Vital */}
            <rect x="26" y="50" width="12" height="28" rx="4" fill="#141414" stroke="#06B6D4" />
            <rect x="62" y="50" width="12" height="28" rx="4" fill="#141414" stroke="#06B6D4" />
            
            {/* Tronco y Brazos (Animación de respiración habitual) */}
            <motion.path 
              d="M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z" 
              fill="#ffffff" 
              animate={{ d: ["M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z", "M36 54 Q50 51 64 54 L61 80 Q50 83 39 80 Z", "M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* MEJORA: Brazo Izquierdo con Saludo Mágico Completo Elevado */}
            <motion.path 
              d="M36 56 Q24 60 26 70" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="7" 
              strokeLinecap="round"
              style={{ transformOrigin: "36px 56px" }}
              animate={isHovered ? { 
                d: [
                  "M36 56 Q20 40 18 26", 
                  "M36 56 Q25 38 24 24", 
                  "M36 56 Q15 42 14 28", 
                  "M36 56 Q20 40 18 26"  
                ],
                rotate: [0, -4, 6, 0] 
              } : { 
                d: "M36 56 Q24 60 26 70",
                rotate: 0 
              }}
              transition={isHovered ? { 
                duration: 1.4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              } : { duration: 0.4 }}
            />
            
            {/* Brazo Derecho (Mantiene equilibrio dinámico en hover) */}
            <motion.path 
              d="M64 56 Q74 64 70 74" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="7" 
              strokeLinecap="round"
              style={{ transformOrigin: "64px 56px" }}
              animate={isHovered ? { rotate: [0, 5, -3, 0] } : { rotate: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Piernas */}
            <path d="M42 80 L38 98" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            <path d="M58 80 L62 98" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* Botas de Estabilización */}
          <rect x="33" y="96" width="10" height="5" rx="2" fill="#080808" stroke="#22D3EE" strokeWidth="1" />
          <rect x="57" y="96" width="10" height="5" rx="2" fill="#080808" stroke="#22D3EE" strokeWidth="1" />

          {/* HOVERBOARD (Plataforma de Frecuencias) */}
          <g transform="translate(0, 102)">
            <ellipse cx="50" cy="3" rx="32" ry="4" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="2" style={{ filter: 'url(#neon-glow)' }} />
            <path d="M18 3 L14 -1 M82 3 L86 -1" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            
            {/* Propulsores de Éter (Tamaño reducido y elegante) */}
            <motion.path 
              d="M38 7 L50 16 L62 7" 
              fill="url(#flame-gradient)" 
              stroke="#22D3EE" 
              strokeWidth="1"
              opacity="0.8"
              style={{ filter: 'url(#neon-glow)' }}
              animate={isHovered 
                ? { d: ["M38 7 L50 18 L62 7", "M38 7 L50 14 L62 7", "M38 7 L50 18 L62 7"], opacity: [0.7, 1, 0.7] }
                : { d: ["M38 7 L50 16 L62 7", "M38 7 L50 12 L62 7", "M38 7 L50 16 L62 7"], opacity: [0.5, 0.8, 0.5] }
              }
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            />
          </g>
        </svg>

        {/* CORRECCIÓN DE DESBORDAMIENTO: Tag de Telemetría oculto en móviles (`hidden md:inline-block`) */}
        <span className="hidden md:inline-block absolute -bottom-4 font-mono text-[9px] tracking-[0.2em] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase whitespace-nowrap bg-black/80 px-3 py-1 border border-cyan-500/30 rounded backdrop-blur-md">
          SYSTEM_RIDER // ACTIVE
        </span>
      </div>
    </motion.div>
  );
};

// ========================================================
// COMPONENTES DE ESTRUCTURA HOME
// ========================================================
const NeonTitle = ({ text }: { text: string }) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-center font-extrabold text-cyan-300 text-neon-glow-css whitespace-nowrap 
               text-4xl sm:text-5xl md:text-6xl lg:text-7xl select-none" 
  >
    {text}
  </motion.h1>
);

const NeonButton = ({ onClick }: { onClick: () => void }) => (
  <div className="block max-w-max mx-auto" onClick={onClick}> 
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 12px #00FFFF, 0 0 35px rgba(0, 255, 255, 0.5)' }} 
      whileTap={{ scale: 0.95 }}
      className="mt-8 px-8 py-3 bg-neutral-950/60 text-cyan-300 font-bold uppercase border border-cyan-400/80 rounded-full tracking-widest cursor-pointer transition-all duration-300 shadow-neon-light text-neon-glow-css backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 animate-pulse" />
        Cosmic Portal
      </div>
    </motion.div>
  </div>
);

const projectData = [
  { title: "Cosmic Architect", tagline: "Space to Think", href: "/geometry", icon: Activity, tech: "React Native, Python ML" },
  { title: "Cosmic Symphony", tagline: "Visual Sound Analysis", href: "/resonance", icon: Atom, tech: "Next.js, FastAPI, Big Data" },
  { title: "Divine Flow", tagline: "Quantum Projects System", href: "/DivineFlow", icon: Code, tech: "React, WebSockets, QA" },
];

const FeaturedProjects = () => (
  <section className="py-20 md:py-32 bg-transparent"> 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center text-lg uppercase tracking-widest text-cyan-400 text-neon-glow-css mb-2"
      >
        Galantic Portfolio
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-5xl font-extralight text-cyan-100 text-center mb-16 uppercase tracking-tight"
      >
        High-Frequency <span className="text-cyan-400 font-normal drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectData.map((project, index) => {
          const Icon = project.icon;
          return (
            <Link href={project.href} key={project.title} className="block group"> 
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ 
                  y: -6,
                  borderColor: 'rgba(18, 210, 239, 0.67)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.15), inset 0 0 15px rgba(6, 182, 212, 0.05)' 
                }}
                className="relative overflow-hidden bg-neutral-950/20 backdrop-blur-xl border border-neutral-900/80 p-8 rounded-[2rem] transition-all duration-500 cursor-pointer flex flex-col items-start h-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-cyan-500/10 opacity-70" />
                
                <div className="relative mb-6 p-4 bg-neutral-900/40 rounded-2xl border border-neutral-800/60 group-hover:border-cyan-500/30 group-hover:bg-neutral-900/80 transition-all duration-500 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors duration-500" />
                  <Icon className="w-6 h-6 text-cyan-400/90 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-500 filter group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white text-neon-glow-css group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-neutral-400 italic text-sm mb-8 flex-grow leading-relaxed font-light group-hover:text-neutral-300 transition-colors duration-300">
                  {project.tagline}
                </p>
                
                <div className="w-full h-[1px] bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-transparent mb-4" />
                
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse group-hover:bg-cyan-400" />
                  <p className="text-cyan-500/70 font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 group-hover:text-cyan-400/90">
                    {project.tech}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
    
    const style = document.createElement('style');
    style.textContent = `
      .text-neon-glow-css {
        text-shadow: 0 0 6px #00FFFF, 0 0 15px rgba(0, 255, 255, 0.5);
      }
      .shadow-neon-light {
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3);
      }
      
      @keyframes cosmic-vortex-supreme {
        0% { transform: translate3d(0,0,0) rotate(0deg); }
        100% { transform: translate3d(0,0,0) rotate(360deg); }
      }
      @keyframes cosmic-float-supreme {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(0, -12px, 0) scale(1.02); }
      }
      
      .animate-vortex-supreme {
        animation: cosmic-vortex-supreme 55s linear infinite;
        will-change: transform;
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
      .animate-float-supreme {
        animation: cosmic-float-supreme 9s ease-in-out infinite;
        will-change: transform;
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleOpenPortal = () => {
    const event = new CustomEvent('open-cosmic-portal');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen relative bg-black text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* RENDERIZADO DEL ASTRONAUTA INTERACTIVO NATIVO */}
      <AstronautWidget />

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-black to-black pointer-events-none z-0" />
      
      {/* CAPA DE DESTELLOS Y PARTICULAS FLOTANTES CUÁNTICAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full" />

        {mounted && [...Array(200)].map((_, idx) => {
          const isLarge = idx % 10 === 0; 
          return (
            <motion.div
              key={`space-particle-${idx}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: isLarge ? '6px' : '3px',
                height: isLarge ? '4px' : '2px',
                backgroundColor: '#a5f3fc',
                boxShadow: isLarge 
                  ? '0 0 12px 3px #22d3ee, 0 0 24px 6px rgba(6, 182, 212, 0.6)' 
                  : '0 0 8px 2px #22d3ee',
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0, 0.9, 0.9, 0], 
                scale: [0, 1.2, 1.2, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
                times: [0, 0.2, 0.8, 1] 
              }}
            />
          );
        })}
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden z-10">
        <div className="relative flex flex-col items-center max-w-4xl mx-auto pt-8">
          
          <div className="relative w-64 h-64 mb-10 flex items-center justify-center animate-float-supreme">
            <div className="absolute w-44 h-44 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <svg viewBox="0 0 200 200" className="w-70 h-70">
              <defs>
                <filter id="neon-glow-portal" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g className="animate-vortex-supreme" style={{ transformOrigin: 'center' }}>
                {[...Array(6)].map((_, i) => (
                  <path
                    key={i}
                    d="M100 100 C 100 20, 20 100, 100 180 C 180 100, 100 20, 100 100"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                    opacity="0.6"
                    transform={`rotate(${i * 60} 100 100)`}
                    style={{ filter: 'url(#neon-glow-portal)' }}
                  />
                ))}
              </g>

              <g className="animate-vortex-supreme" style={{ animationDuration: '40s', transformOrigin: 'center' }}>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.8" style={{ filter: 'url(#neon-glow-portal)' }} />
                <circle cx="100" cy="100" r="50" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
              </g>

              <g className="animate-vortex-supreme" style={{ animationDuration: '15s', animationDirection: 'reverse', transformOrigin: 'center' }}>
                <path d="M100 30 A 70 70 0 1 0 100 170 A 70 70 0 1 0 100 30" fill="none" stroke="#22D3EE" strokeWidth="3" style={{ filter: 'url(#neon-glow-portal)' }} />
                {[0, 120, 240].map((angle) => (
                  <circle key={angle} cx={100 + 70 * Math.cos(angle * Math.PI / 180)} cy={100 + 70 * Math.sin(angle * Math.PI / 180)} r="6" fill="#FFFFFF" style={{ filter: 'url(#neon-glow-portal)' }} />
                ))}
              </g>

              <circle cx="100" cy="100" r="15" fill="#000000" stroke="#22D3EE" strokeWidth="1" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#22D3EE" strokeWidth="3" opacity="0.4" style={{ filter: 'url(#neon-glow-portal)' }}>
                <animate attributeName="r" values="15;22;15" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="100" r="8" fill="#FFFFFF" style={{ filter: 'url(#neon-glow-portal)' }}>
                <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <NeonTitle text="Co§mic Imagination!" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-6 text-neutral-200 text-neon-glow-css text-xl md:text-2xl max-w-2xl mx-auto px-4 font-light tracking-wide"
          >
            "We unify scientific and spiritual knowledge to improve the well-being of the Cosmos."
          </motion.p>
          
          <NeonButton onClick={handleOpenPortal} />
        </div>
      </section>

      {/* CONTENIDO INTEGRADO EN EL VACÍO CÓSMICO */}
      <div className="relative z-10 bg-transparent"> 
        <FeaturedProjects />
        
        <div className="w-full max-w-7xl mx-auto mt-16 mb-20 px-6 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-950/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 space-y-10 max-w-5xl mx-auto">
            <div className="inline-block px-4 py-1 bg-cyan-950/20 border border-cyan-900/30 rounded-full">
              <h3 className="text-cyan-400 font-mono text-[10px] tracking-[0.35em] uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                // QUANTUM METAPHYSICS ARCHIVE
              </h3>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-neon-glow-css font-extralight tracking-wider text-white uppercase">
              Explore our <span className="text-cyan-400 font-normal drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">galaxy of projects</span>
            </h2>
            
            <p className="text-base md:text-lg text-white font-sans leading-relaxed tracking-wide text-justify sm:text-center max-w-4xl mx-auto font-light">
              This ecosystem is the point of convergence where **science and spirituality** unify, intertwining **quantum physics**, **modern alchemy**, **sacred geometry**, and **cymatics**. Through universal patterns and conscious software development, we structure interactive interfaces with the purpose of elevating the human experience and making this world a better place to live. We don't create ordinary technology; we design digital transformation tools that tune frequencies, optimize flows, and materialize intentions into highly resonant visual architectures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left">
              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)] transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm font-mono text-neon-glow-css text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    📜 Cosmic Architect
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The pure transmutation of the word. Through this quantum engine, you can **discover the hidden geometric pattern behind words**, revealing the mathematical signature and metaphysical element that governs your thoughts.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)] transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm font-mono text-cyan-400 text-neon-glow-css tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    ⚛️ Cosmic Symphony
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The ancient art of **cymatics** made code. Here you interact directly with elemental vibration, injecting acoustic frequencies to **give visual form to sound** in real time, tuning your brainwaves to states of focus, relaxation, or orbital sleep.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)] transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm text-neon-glow-css font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    ⭐ Divine Flow
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    Visualizing the cosmic order. Using the sacred structure of the star, this system allows you to map and **observe the different types of divine and universal flows**, translating quantum entanglement and the interconnectedness of everything into harmonic visual currents.
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3 pt-12">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cyan-950/60" />
              <span className="text-[9px] font-mono text-cyan-700 tracking-[0.4em] uppercase animate-pulse">
                // CORE SYSTEM ACTIVE //
              </span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-cyan-950/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}