"use client";
import { motion } from 'framer-motion';
import { Sparkles, Code, Activity, Atom } from 'lucide-react'; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // 🔥 Importación clave para SPA routing

// Componente para el título con efecto Neón
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

// Componente para el botón de la Auditoría
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

// Datos de los proyectos conceptuales
const projectData = [
  { 
    title: "Cosmic Architect", 
    tagline: "Space to Think",
    href: "/geometry", 
    icon: Activity,
    tech: "React Native, Python ML" 
  },
  { 
    title: "Cosmic Symphony", 
    tagline: "Visual Sound Analysis",
    href: "/resonance", 
    icon: Atom,
    tech: "Next.js, FastAPI, Big Data" 
  },
  { 
    title: "Divine Flow", 
    tagline: "Quantum Projects System",
    href: "/DivineFlow",
    icon: Code,
    tech: "React, WebSockets, QA" 
  },
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
            /* 🔥 Cambiado de <a> a <Link> para mantener vivos los estados de animación al retroceder */
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // 🔥 Estado para controlar consistencia de partículas en cliente

  useEffect(() => {
    setMounted(true); // Se marca como montado una vez esté en el cliente
    
    const style = document.createElement('style');
    style.textContent = `
      .text-neon-glow-css {
        text-shadow: 0 0 6px #00FFFF, 0 0 15px rgba(0, 255, 255, 0.5);
      }
      .shadow-neon-light {
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3);
      }
      @keyframes cosmic-vortex-supreme {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes cosmic-float-supreme {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-15px) scale(1.03); }
      }
      .animate-vortex-supreme {
        animation: cosmic-vortex-supreme 55s linear infinite;
        will-change: transform;
      }
      .animate-float-supreme {
        animation: cosmic-float-supreme 8s ease-in-out infinite;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleOpenPortal = () => {
    setIsModalOpen(true);
    const event = new CustomEvent('open-cosmic-portal');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen relative bg-black text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-black to-black pointer-events-none z-0" />
      
      {/* CAPA DE DESTELLOS Y PARTICULAS FLOTANTES CUÁNTICAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

        {/* 🔥 Aumentado de 35 a 60 para generar una densidad sutil y armoniosa en todo el home */}
        {mounted && [...Array(150)].map((_, idx) => (
          <motion.div
            key={`space-particle-${idx}`}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: idx % 5 === 0 ? '4.5px' : '2.5px',
              height: idx % 5 === 0 ? '4.5px' : '2.5px',
              opacity: Math.random() * 0.6 + 0.3,
              filter: idx % 5 === 0 ? 'drop-shadow(0 0 4px rgba(6,182,212,0.8))' : 'none'
            }}
            animate={{
              y: [0, Math.random() * -60 - 30],
              opacity: [0.2, Math.random() * 0.8 + 0.4, 0.2],
              scale: [0.9, Math.random() * 1.5 + 1.1, 0.9],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden z-10">
        <div className="relative flex flex-col items-center max-w-4xl mx-auto pt-8">
          
          <div className="relative w-64 h-64 mb-10 flex items-center justify-center animate-float-supreme">
            <div className="absolute w-44 h-44 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <svg 
              viewBox="0 0 200 200" 
              className="w-60 h-60 animate-vortex-supreme filter drop-shadow-[0_0_25px_rgba(6,182,212,0.85)] drop-shadow-[0_0_60px_rgba(6,182,212,0.5)]"
              style={{ mixBlendMode: 'screen' }}
            >
              <defs>
                <linearGradient id="spiral-grad-vibrant" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="15%" stopColor="#22D3EE" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#0891B2" stopOpacity="0.4" />
                  <stop offset="90%" stopColor="#155E75" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="spiral-grad-reverse" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#0891B2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="portal-center-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="20%" stopColor="#22D3EE" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="85%" stopColor="#0A2540" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* ANILLOS DE GEOMETRÍA SAGRADA Y CALIBRACIÓN PERIMETRAL EXTERNA */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="#06B6D4" strokeWidth="0.5" opacity="0.2" />
              <circle cx="100" cy="100" r="91" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 28" opacity="0.5" />
              <circle cx="100" cy="100" r="87" fill="none" stroke="#0891B2" strokeWidth="2.5" strokeDasharray="45 10 15 10" opacity="0.3" />
              <circle cx="100" cy="100" r="81" fill="none" stroke="#06B6D4" strokeWidth="0.75" strokeDasharray="2 6" opacity="0.4" />
              
              {/* VÓRTICE HIPER-COMPLEJO DE INTERFERENCIA CUÁNTICA CON 24 BRAZOS DE ALTA DENSIDAD */}
              {[...Array(12)].map((_, i) => (
                <g key={`portal-vortex-complex-arm-${i}`} transform={`rotate(${i * 30} 100 100)`}>
                  {/* Brazo A: Resplandor base expansivo */}
                  <path
                    d="M 100 100 C 120 75, 145 80, 150 115 C 155 150, 120 175, 85 160 C 45 140, 40 95, 80 60 C 125 20, 185 40, 195 100"
                    fill="none"
                    stroke="url(#spiral-grad-vibrant)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity={0.2}
                    style={{ filter: 'blur(5px)' }} 
                  />
                  {/* Brazo A: Filamento denso de alta frecuencia */}
                  <path
                    d="M 100 100 C 120 75, 145 80, 150 115 C 155 150, 120 175, 85 160 C 45 140, 40 95, 80 60 C 125 20, 185 40, 195 100"
                    fill="none"
                    stroke="url(#spiral-grad-vibrant)"
                    strokeWidth="2.8" 
                    strokeLinecap="round"
                    opacity={0.85}
                  />
                  
                  {/* Brazo B: Contra-vórtice cruzado para profundidad tridimensional */}
                  <path
                    d="M 100 100 C 80 125, 55 120, 50 85 C 45 50, 80 25, 115 40 C 155 60, 160 105, 120 140 C 75 180, 15 160, 5 100"
                    fill="none"
                    stroke="url(#spiral-grad-reverse)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity={0.4}
                  />

                  {/* Núcleo interno: Filamento fractal de aceleración geométrica */}
                  <path
                    d="M 100 100 C 108 88, 122 92, 125 108 C 128 124, 112 136, 92 130 C 72 122, 68 98, 90 78 C 112 58, 142 68, 148 98"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.2" 
                    strokeDasharray="8 4"
                    opacity={0.7}
                  />
                </g>
              ))}

              {/* ANILLOS INTERNOS DE ESTABILIZACIÓN ENERGÉTICA */}
              <circle cx="100" cy="100" r="42" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="12 4 2 4" opacity="0.5" />
              <circle cx="100" cy="100" r="38" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3" />
              
              {/* HORIZONTE DE SUCESOS CENTRAL (EVENT HORIZON LIQUID GLOW) */}
              <circle cx="100" cy="100" r="36" fill="url(#portal-center-glow)" opacity="0.75" style={{ mixBlendMode: 'color-dodge' }} />
              <circle cx="100" cy="100" r="19" fill="#000000" /> {/* Vacío gravitacional absoluto */}
              <circle cx="100" cy="100" r="17" fill="url(#portal-center-glow)" opacity="0.95" className="animate-pulse" />
              <circle cx="100" cy="100" r="4" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFFFFF)" />
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
            
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-white uppercase">
              Explore our <span className="text-cyan-400 font-normal drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">galaxy of projects</span>
            </h2>
            
            <p className="text-base md:text-lg text-white font-sans leading-relaxed tracking-wide text-justify sm:text-center max-w-4xl mx-auto font-light">
              This ecosystem is the point of convergence where **science and spirituality** unify, intertwining **quantum physics**, **modern alchemy**, **sacred geometry**, and **cymatics**. Through universal patterns and conscious software development, we structure interactive interfaces with the purpose of elevating the human experience and making this world a better place to live. We don't create ordinary technology; we design digital transformation tools that tune frequencies, optimize flows, and materialize intentions into highly resonant visual architectures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left">
              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    📜 Cosmic Architect
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The pure transmutation of the word. Through this quantum engine, you can **discover the hidden geometric pattern behind words**, revealing the mathematical signature and metaphysical element that governs your thoughts.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    ⚛️ Cosmic Symphony
                </h4>
                <p className="text-sm text-white leading-relaxed tracking-wide font-light">
                    The ancient art of **cymatics** made code. Here you interact directly with elemental vibration, injecting acoustic frequencies to **give visual form to sound** in real time, tuning your brainwaves to states of focus, relaxation, or orbital sleep.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-neutral-950/20 border border-neutral-900/80 backdrop-blur-xl shadow-[0_8px_32_rgba(0,0,0,0.5)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                    ⭐ Divine Flow
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed tracking-wide font-light">
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