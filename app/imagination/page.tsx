"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Brain, Cpu, Layers, Workflow } from 'lucide-react';

export default function ImaginationPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center px-6 py-24">
      
      {/* Fondo inmersivo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />
      
      {/* MAGIA Y VIDA ADICIONAL: Red de partículas cuánticas flotantes y Grid de Ingeniería */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Cyberpunk Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        
        {/* Glow Rings (Anillos de resonancia energética en Cyan) */}
        <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full" />

        {/* Partículas Estelares / Nodos de Consciencia Autogenerados */}
        {[...Array(20)].map((_, idx) => (
          <motion.div
            key={`particle-${idx}`}
            className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.2,
            }}
            animate={{
              y: [0, Math.random() * -60 - 20],
              opacity: [0, 0.8, 0],
              scale: [0.8, Math.random() * 2.5 + 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Líneas de datos verticales sutiles flotando (Frecuencias de ejecución) */}
        {[...Array(3)].map((_, idx) => (
          <motion.div
            key={`stream-${idx}`}
            className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            style={{
              left: `${25 * (idx + 1)}%`,
              top: `-150px`,
            }}
            animate={{
              y: ['0vh', '120vh'],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              ease: "linear",
              delay: idx * 3,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Header con más impacto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1 bg-cyan-950/30 border border-cyan-800 rounded-full mb-4"
          >
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">
              // NEURAL CREATIVE LAB
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-extralight text-white uppercase tracking-tighter">
            The <span className="text-cyan-400 font-normal drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">Imagination</span> Engine
          </h2>
          <p className="text-cyan-300 text-neon-glow-css3 max-w-xl mx-auto text-lg leading-relaxed">
            Where ideas are translated into high-performance digital architecture. We are the execution lab where business logic materializes into robust, scalable systems ready for operational deployment.
          </p>
        </motion.div>

        {/* Grid de Capacidades con interactividad mejorada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Rocket, title: "Quantum Prototyping", desc: "We translate volatile thinking into high-fidelity wireframes. A synthesis process where digital architecture unfolds with imperceptible latency, transforming ideas into functional environments." },
            { icon: Brain, title: "Architecture of Ideas ", desc: "We model business logic as a living organism: scalable, resilient, and self-managing." },
            { icon: Cpu, title: "Algorithmic Synchronization", desc: "We design ecosystems where the interface and backend vibrate at a single execution frequency." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, borderColor: 'rgba(6,182,212,0.5)' }}
              className="p-8 border border-neutral-800 bg-neutral-950/50 rounded-3xl backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="mb-6 p-3 bg-neutral-900 w-fit rounded-xl group-hover:bg-cyan-950/30 transition-colors">
                <item.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white text-neon-glow-css text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Sección de Manifiesto Visual Inferior */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 p-12 border border-neutral-900 rounded-3xl bg-gradient-to-b from-neutral-900/20 to-transparent text-center relative overflow-hidden group"
        >
          {/* Destello de fondo dinámico para el manifiesto */}
          <div className="absolute inset-0 bg-radial-gradient from-cyan-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <Sparkles className="w-12 h-12 text-cyan-500 mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-light mb-6 uppercase tracking-widest text-white">
            The Flow of Conscious Design</h3>
          <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            We don't design pixels. We design impactful nodes. Every button, every animation, and every transition is a strategic decision designed to guide the user's awareness toward the ultimate conversion.
          </p>
        </motion.div>

      </div>
    </div>
  );
}