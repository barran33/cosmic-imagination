"use client";
import { motion } from 'framer-motion';
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
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-auto cursor-pointer group"
    >
      {/* Contenedor responsivo optimizado para móviles y escritorio */}
      <div className="relative w-24 h-32 md:w-36 md:h-48 flex flex-col items-center justify-center animate-float-supreme">
        
        {/* Aura de energía cuántica trasera */}
        <div className="absolute inset-0 bg-cyan-500/0 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-700" />
        
        {/* Resplandor Cian de la Hoverboard trasera */}
        <div className="absolute bottom-4 md:bottom-6 w-12 h-12 md:w-16 md:h-16 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-700" />
        
        {/* SVG Reconstruido con la Geometría Original */}
        <svg 
          viewBox="0 0 120 150" 
          className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-500"
        >
          <defs>
            <linearGradient id="visor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a192f" />
              <stop offset="40%" stopColor="#0f172a" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
            </linearGradient>
            <filter id="neon-glow-widget">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grupo de Animación de Respiración / Flotación Interna */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            {/* Mochila Espacial */}
            <rect x="34" y="52" width="12" height="32" rx="4" fill="#0f172a" stroke="#06B6D4" strokeWidth="1.5" />
            <rect x="74" y="52" width="12" height="32" rx="4" fill="#0f172a" stroke="#06B6D4" strokeWidth="1.5" />
            <rect x="40" y="48" width="40" height="38" rx="6" fill="#1e293b" stroke="#06B6D4" strokeWidth="1.5" />

            {/* Piernas y Botas */}
            <g fill="#ffffff" stroke="#06B6D4" strokeWidth="1.5">
              <path d="M46 84 L40 112 L52 114 L54 84 Z" fill="#ffffff" />
              <path d="M74 84 L80 112 L68 114 L66 84 Z" fill="#ffffff" />
              {/* Detalles de las botas */}
              <rect x="36" y="110" width="18" height="6" rx="2" fill="#0f172a" stroke="#22D3EE" strokeWidth="1" />
              <rect x="66" y="110" width="18" height="6" rx="2" fill="#0f172a" stroke="#22D3EE" strokeWidth="1" />
            </g>

            {/* Cuerpo / Traje Principal */}
            <path d="M40 50 C40 50 36 85 46 86 C56 87 64 87 74 86 C84 85 80 50 80 50 Z" fill="#ffffff" stroke="#06B6D4" strokeWidth="1.5" />
            
            {/* Rayas horizontales del traje (Estilo original) */}
            <path d="M43 62 L77 62 M44 70 L76 70 M45 78 L75 78" stroke="#06B6D4" strokeWidth="1" opacity="0.7" />

            {/* Brazo Izquierdo (Mantiene la curvatura y postura original) */}
            <motion.path 
              d="M41 52 C26 50 20 66 28 72 C32 74 38 68 38 68" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="7" 
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transformOrigin: "41px 52px", willChange: "transform" }}
              animate={isHovered ? { rotate: [0, -6, 4, 0] } : { rotate: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Mano Izquierda */}
            <circle cx="27" cy="73" r="4" fill="#0f172a" stroke="#22D3EE" strokeWidth="1" />

            {/* Brazo Derecho Elevado con Saludo Natural Organizado por Grupo (ORIGINAL RESTAURADO) */}
            <motion.g
              style={{ transformOrigin: "79px 52px", willChange: "transform" }}
              animate={isHovered ? { rotate: [0, -8, 4, -8, 0] } : { rotate: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Trayecto del brazo original sin desprendimiento estructural */}
              <path 
                d="M79 52 C94 48 102 34 100 24 C96 18 88 24 86 30" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="7" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Mano Derecha Abierta fija en su posición geométrica de origen */}
              <path d="M100 20 Q104 14 106 20 Q104 24 98 25" fill="#0f172a" stroke="#22D3EE" strokeWidth="1" />
            </motion.g>

            {/* Casco */}
            <circle cx="60" cy="36" r="22" fill="#1e293b" stroke="#06B6D4" strokeWidth="1.5" />
            <circle cx="60" cy="36" r="20" fill="#0f172a" />
            
            {/* Visor Grande Neón */}
            <path 
              d="M45 34 C45 22 75 22 75 34 C75 44 45 44 45 34 Z" 
              fill="url(#visor-gradient)" 
              stroke="#22D3EE" 
              strokeWidth="1.5" 
              style={{ filter: 'url(#neon-glow-widget)' }} 
            />
            
            {/* Reflejo del Visor */}
            <path d="M49 30 Q60 25 71 30" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          </motion.g>

          {/* HOVERBOARD (Proporciones exactas basadas en los propulsores inferiores) */}
          <g transform="translate(0, 114)">
            {/* Cuerpo de la Tabla */}
            <path 
              d="M20 6 L10 2 L25 0 L95 0 L110 2 L100 6 Z" 
              fill="#0f172a" 
              stroke="#22D3EE" 
              strokeWidth="2" 
              style={{ filter: 'url(#neon-glow-widget)' }} 
            />
            <ellipse cx="60" cy="3" rx="42" ry="3" fill="#1e293b" opacity="0.7" />
            
            {/* Propulsores Dobles Izquierda y Derecha de la Imagen */}
            <g id="thrusters" stroke="#22D3EE" strokeWidth="1">
              {/* Propulsor Izquierdo */}
              <rect x="32" y="4" width="10" height="8" fill="#0f172a" />
              <motion.path 
                d="M30 12 L37 28 L44 12 Z" 
                fill="url(#flame-gradient)" 
                style={{ willChange: "d" }}
                animate={{ d: ["M30 12 L37 32 L44 12 Z", "M30 12 L37 24 L44 12 Z", "M30 12 L37 32 L44 12 Z"] }}
                transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Propulsor Derecho */}
              <rect x="78" y="4" width="10" height="8" fill="#0f172a" />
              <motion.path 
                d="M76 12 L83 28 L90 12 Z" 
                fill="url(#flame-gradient)" 
                style={{ willChange: "d" }}
                animate={{ d: ["M76 12 L83 26 L90 12 Z", "M76 12 L83 34 L90 12 Z", "M76 12 L83 26 L90 12 Z"] }}
                transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
              />
            </g>
          </g>
        </svg>

        {/* Tag de Telemetría Responsivo */}
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
    style={{ willChange: "transform, opacity" }}
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
      style={{ willChange: "transform, box-shadow" }}
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
        style={{ willChange: "transform, opacity" }}
        className="text-center text-lg uppercase tracking-widest text-cyan-400 text-neon-glow-css mb-2"
      >
        Galantic Portfolio
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
        style={{ willChange: "transform, opacity" }}
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
                style={{ willChange: "transform, opacity, box-shadow" }}
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
      
      {/* CAPA DE DESTELLOS Y PARTICULAS FLOTANTES CUÁNTICAS (OPTIMIZADO PARA MÓVILES) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full" />

        {/* REDUCIDO DE 200 a 45 PARTICULAS PARA RENDIMIENTO FLUIDO EN MÓVILES */}
        {mounted && [...Array(45)].map((_, idx) => {
          const isLarge = idx % 8 === 0; 
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
                willChange: "transform, opacity", // ACELERACIÓN POR HARDWARE
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
            style={{ willChange: "transform, opacity" }}
            className="mt-6 text-neutral-200 text-neon-glow-css text-xl md:text-2xl max-w-2xl mx-auto px-4 font-light tracking-wide"
          >
            "We unify scientific and spiritual knowledge to improve the well-being of the Cosmos."
          </motion.p>
          
          <NeonButton onClick={handleOpenPortal} />
        </div>
      </section>

      {/* Hero Content Section */}
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