"use client";
import { motion } from 'framer-motion';
import { Sparkles, Code, Activity, Atom } from 'lucide-react'; 
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; 

// ========================================================
// HOOK PARA DETECTAR DISPOSITIVOS MÓVILES (EVITA RE-RENDERS)
// ========================================================
const useDevicePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const isMobileDevice = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
      setIsLowPerformance(isMobileDevice);
    };
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  return isLowPerformance;
};

// ========================================================
// WIDGET INTERACTIVO DEL ASTRONAUTA (NAVEGANTE DEL VACÍO)
// ========================================================
const AstronautWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useDevicePerformance();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-auto cursor-pointer group"
      style={{ willChange: 'transform' }}
    >
      <div className="relative w-20 h-28 md:w-32 md:h-44 flex flex-col items-center justify-center animate-float-supreme">
        
        {/* Aura de energía cuántica trasera */}
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
            
            {/* Visor Neón */}
            <ellipse cx="50" cy="38" rx="13" ry="10" fill="url(#visor-gradient)" stroke="#22D3EE" strokeWidth="1.5" />
            
            {/* Detalle de Brillo en el Visor */}
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
            
            {/* Tronco y Brazos */}
            <motion.path 
              d="M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z" 
              fill="#ffffff" 
              animate={isMobile ? {} : { d: ["M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z", "M36 54 Q50 51 64 54 L61 80 Q50 83 39 80 Z", "M36 55 Q50 52 64 55 L60 80 Q50 82 40 80 Z"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Brazo Izquierdo con Saludo Mágico */}
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
                  "M15 42 14 28", 
                  "M36 56 Q20 40 18 26"  
                ],
                rotate: [0, -4, 6, 0] 
              } : { 
                d: "M36 56 Q24 60 26 70",
                rotate: 0 
              }}
              transition={isHovered ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            />
            
            {/* Brazo Derecho */}
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

          {/* Botas */}
          <rect x="33" y="96" width="10" height="5" rx="2" fill="#080808" stroke="#22D3EE" strokeWidth="1" />
          <rect x="57" y="96" width="10" height="5" rx="2" fill="#080808" stroke="#22D3EE" strokeWidth="1" />

          {/* HOVERBOARD */}
          <g transform="translate(0, 102)">
            <ellipse cx="50" cy="3" rx="32" ry="4" fill="#0a0a0a" stroke="#22D3EE" strokeWidth="2" />
            <path d="M18 3 L14 -1 M82 3 L86 -1" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            
            {/* Propulsores de Éter */}
            <motion.path 
              d="M38 7 L50 16 L62 7" 
              fill="url(#flame-gradient)" 
              stroke="#22D3EE" 
              strokeWidth="1"
              opacity="0.8"
              animate={isHovered 
                ? { d: ["M38 7 L50 18 L62 7", "M38 7 L50 14 L62 7", "M38 7 L50 18 L62 7"], opacity: [0.7, 1, 0.7] }
                : { d: ["M38 7 L50 16 L62 7", "M38 7 L50 12 L62 7", "M38 7 L50 16 L62 7"], opacity: [0.5, 0.8, 0.5] }
              }
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
            />
          </g>
        </svg>

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
    transition={{ duration: 0.8 }}
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
      <p className="text-center text-lg uppercase tracking-widest text-cyan-400 text-neon-glow-css mb-2">
        Galantic Portfolio
      </p>
      <h2 className="text-4xl md:text-5xl font-extralight text-cyan-100 text-center mb-16 uppercase tracking-tight">
        High-Frequency <span className="text-cyan-400 font-normal drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectData.map((project, index) => {
          const Icon = project.icon;
          return (
            <Link href={project.href} key={project.title} className="block group"> 
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -6,
                  borderColor: 'rgba(18, 210, 239, 0.67)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.15), inset 0 0 15px rgba(6, 182, 212, 0.05)' 
                }}
                className="relative overflow-hidden bg-neutral-950/20 backdrop-blur-xl border border-neutral-900/80 p-8 rounded-[2rem] transition-all duration-500 cursor-pointer flex flex-col items-start h-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                style={{ willChange: 'transform, border-color' }}
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none opacity-70" />
                
                <div className="relative mb-6 p-4 bg-neutral-900/40 rounded-2xl border border-neutral-800/60 group-hover:border-cyan-500/30 group-hover:bg-neutral-900/80 transition-all duration-500 shadow-inner">
                  <Icon className="w-6 h-6 text-cyan-400/90 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight text-neon-glow-css">
                  {project.title}
                </h3>
                
                <p className="text-neutral-400 italic text-sm mb-8 flex-grow leading-relaxed font-light">
                  {project.tagline}
                </p>
                
                <div className="w-full h-[1px] bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-transparent mb-4" />
                
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 group-hover:bg-cyan-400" />
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
  const isMobile = useDevicePerformance();

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
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -10px, 0); }
      }
      
      .animate-vortex-supreme {
        animation: cosmic-vortex-supreme 60s linear infinite;
        will-change: transform;
      }
      .animate-float-supreme {
        animation: cosmic-float-supreme 7s ease-in-out infinite;
        will-change: transform;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-vortex-supreme, .animate-float-supreme {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleOpenPortal = () => {
    window.dispatchEvent(new CustomEvent('open-cosmic-portal'));
  };

  // Optimización Cuántica: Reducir y memorizar el arreglo de partículas según rendimiento del dispositivo
  const particles = useMemo(() => {
    if (!mounted) return [];
    const count = isMobile ? 35 : 120; // Reduce drásticamente el peso de pintado en móviles
    return [...Array(count)].map((_, idx) => ({
      id: idx,
      isLarge: idx % 12 === 0,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 5,
      yTravel: Math.random() * -80 - 40
    }));
  }, [mounted, isMobile]);

  return (
    <div className="min-h-screen relative bg-black text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 antialiased">
      
      <AstronautWidget />

      {/* Capa de fondo fija de degradados */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-black to-black pointer-events-none z-0" />
      
      {/* CAPA DE PARTICULAS CUÁNTICAS OPTIMIZADA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-cyan-500/5 blur-[120px] rounded-full" />

        {particles.map((p) => (
          <motion.div
            key={`space-p-${p.id}`}
            className="absolute rounded-full bg-cyan-200"
            style={{
              top: p.top,
              left: p.left,
              width: p.isLarge ? '5px' : '2px',
              height: p.isLarge ? '5px' : '2px',
              boxShadow: p.isLarge ? '0 0 10px #22d3ee' : '0 0 5px #22d3ee',
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, p.yTravel],
              opacity: [0, 0.8, 0.8, 0], 
              scale: [0, 1.1, 1.1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
              times: [0, 0.2, 0.8, 1]
            }}
          />
        ))}
      </div>

      {/* HERO SECTION (PORTAL DIMENSIONAL) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden z-10">
        <div className="relative flex flex-col items-center max-w-4xl mx-auto pt-4">
          
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 mb-8 flex items-center justify-center animate-float-supreme" style={{ willChange: 'transform' }}>
            <div className="absolute w-44 h-44 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
            
            <svg viewBox="0 0 200 200" className="w-full h-full transform-gpu">
              {/* Grupo del vórtice sincronizado en CSS Nativo con los 6 bucles geométricos sagrados intactos */}
              <g className="animate-vortex-supreme" style={{ transformOrigin: 'center' }}>
                {[...Array(6)].map((_, i) => (
                  <path
                    key={i}
                    d="M100 100 C 100 20, 20 100, 100 180 C 180 100, 100 20, 100 100"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                    opacity="0.5"
                    transform={`rotate(${i * 60} 100 100)`}
                  />
                ))}
              </g>

              <g className="animate-vortex-supreme" style={{ animationDuration: '35s', transformOrigin: 'center' }}>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
              </g>

              <circle cx="100" cy="100" r="15" fill="#000000" stroke="#22D3EE" strokeWidth="1" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#22D3EE" strokeWidth="2" opacity="0.4">
                <animate attributeName="r" values="15;21;15" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <NeonTitle text="Co§mic Imagination!" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-neutral-200 text-neon-glow-css text-lg md:text-2xl max-w-2xl mx-auto px-4 font-light tracking-wide"
          >
            "We unify scientific and spiritual knowledge to improve the well-being of the Cosmos."
          </motion.p>
          
          <NeonButton onClick={handleOpenPortal} />
        </div>
      </section>

      {/* CONTENIDO INTEGRADO EN EL VACÍO CÓSMICO */}
      <div className="relative z-10 bg-transparent"> 
        <FeaturedProjects />
        
        <div className="w-full max-w-7xl mx-auto mt-8 mb-20 px-6 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-950/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 space-y-10 max-w-5xl mx-auto">
            <div className="inline-block px-4 py-1 bg-cyan-950/20 border border-cyan-900/30 rounded-full">
              <h3 className="text-cyan-400 font-mono text-[10px] tracking-[0.35em] uppercase">
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
              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm font-mono text-neon-glow-css text-cyan-400 tracking-widest uppercase mb-3">
                    📜 Cosmic Architect
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The pure transmutation of the word. Through this quantum engine, you can **discover the hidden geometric pattern behind words**, revealing the mathematical signature and metaphysical element that governs your thoughts.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm font-mono text-cyan-400 text-neon-glow-css tracking-widest uppercase mb-3">
                    ⚛️ Cosmic Symphony
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The ancient art of **cymatics** made code. Here you interact directly with elemental vibration, injecting acoustic frequencies to **give visual form to sound** in real time, tuning your brainwaves to states of focus, relaxation, or orbital sleep.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl transition-colors hover:border-cyan-500/30">
                <h4 className="text-sm text-neon-glow-css font-mono text-cyan-400 tracking-widest uppercase mb-3">
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