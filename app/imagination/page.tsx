"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Sparkles, 
  Brain, 
  Cpu, 
  Atom, 
  FlaskConical, 
  Orbit, 
  Zap, 
  X
} from 'lucide-react';

export default function ImaginationPage() {
  const [reactionTriggered, setReactionTriggered] = useState(false);
  const [reactionLog, setReactionLog] = useState("REACTOR_STATUS: STABLE // IDEATION_CHAMBER_IDLE");

  const triggerChemicalReaction = () => {
    setReactionTriggered(true);
    setReactionLog("CATALYST_INJECTED: Molecular bonding accelerating. Gravity threshold inverted.");
    
    setTimeout(() => {
      setReactionLog("REACTION_SUCCESS: Transmutation complete. Ideas crystallized into microservices.");
    }, 3000);
  };

  const handleCloseReaction = () => {
    setReactionTriggered(false);
    setReactionLog("REACTOR_STATUS: STABLE // IDEATION_CHAMBER_IDLE");
  };

  return (
    <div className="min-h-screen bg-[#000205] text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center px-6 py-24 md:py-32">
      
      {/* Fondo inmersivo: Nebulosa de Fondo Estática en tonalidad Cian Oscuro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#001120_0%,#000000_75%)] pointer-events-none z-0" />
      
      {/* --- SISTEMA DE ESTRELLAS, PLANETAS Y REACCIONES QUÍMICAS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Grid Cuántico de Ingeniería */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#021d30_1px,transparent_1px),linear-gradient(to_bottom,#021d30_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)] opacity-30" />
        
        {/* Planeta 1: Gigante de Cian (Resonador) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[-100px] w-72 h-72 rounded-full border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-transparent to-black blur-[2px] hidden lg:block"
        >
          <div className="absolute top-10 left-12 w-6 h-6 rounded-full bg-cyan-400/30 blur-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-4 border-t border-b border-cyan-500/20 rounded-full transform -rotate-12" />
        </motion.div>

        {/* Planeta 2: Micro-Nodo Orbital Blanco/Cian */}
        <div className="absolute top-[65%] left-[8%] w-24 h-24 rounded-full border border-cyan-500/10 bg-gradient-to-bl from-cyan-950/10 to-black hidden md:block">
          <motion.div 
            animate={{ x: [0, 80, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#00f3ff]"
          />
        </div>

        {/* Partículas Estelares / Átomos Reaccionando en Cadena */}
        {[...Array(35)].map((_, idx) => (
          <motion.div
            key={`atom-${idx}`}
            className={`absolute rounded-full ${idx % 2 === 0 ? 'bg-cyan-400 shadow-[0_0_8px_#00f3ff]' : 'bg-white'}`}
            style={{
              width: idx % 2 === 0 ? '2px' : '1.5px',
              height: idx % 2 === 0 ? '2px' : '1.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
            animate={reactionTriggered ? {
              y: [0, Math.random() * -300 - 100],
              x: [0, (Math.random() - 0.5) * 200],
              scale: [1, Math.random() * 2.5 + 1.5, 1],
              opacity: [0.2, 0.9, 0.2]
            } : {
              y: [0, Math.random() * -40 - 20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: reactionTriggered ? Math.random() * 2 + 1 : Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Enlaces de Reacción Química (Líneas Dinámicas en Cian) */}
        {[...Array(4)].map((_, idx) => (
          <motion.div
            key={`bond-${idx}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"
            style={{
              width: '200px',
              left: `${15 * (idx + 1)}%`,
              top: `${20 * (idx + 1)}%`,
              transform: `rotate(${idx * 45}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-20">
        
        {/* Header Principal Táctico con tu Manifiesto de Autor */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-cyan-500/20 rounded-full select-none">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin duration-3000" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// QUANTUM IDEATION COMPLEX</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extralight text-white uppercase tracking-tighter leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-200 font-bold drop-shadow-[0_0_20px_rgba(0,243,255,0.35)]">Imagination</span> Engine
          </h2>

          {/* TU FRASE COMO FILOSOFÍA CENTRAL DE LA AGENCIA */}
          <p className="max-w-3xl mx-auto text-neutral-300 text-base md:text-xl leading-relaxed font-light font-sans tracking-wide">
            "In the process of creation, from computers, airplanes, to rockets... anything that human beings have invented, before being conceived in the material world", <span className="text-cyan-400 font-normal underline decoration-cyan-500/30 underline-offset-4">first it goes through the world of ideas</span> Thanks to the ingenuity of his imagination."
          </p>
          
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest pt-2">
            — Jorge Barrantes, Founder & C.E.O
          </div>
        </motion.div>

        {/* --- PANEL DEL REACTOR QUÍMICO --- */}
        <div className="border border-white/5 bg-[#01060f]/40 rounded-[2rem] p-6 md:p-8 font-mono text-xs backdrop-blur-md relative overflow-hidden transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-cyan-400 animate-bounce" />
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-[11px]">CHEMICAL SYNTHESIS LABORATORY</div>
                <div className="text-neutral-500 text-[9px] mt-0.5">{reactionLog}</div>
              </div>
            </div>
            
            {!reactionTriggered && (
              <button
                onClick={triggerChemicalReaction}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-black uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,243,255,0.35)]"
              >
                <Zap className="w-3.5 h-3.5 text-black fill-black" /> Inject Alchemical Catalyst
              </button>
            )}
          </div>

          {/* Grid de Estado Molecular */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">CREATIVE_ENTHALPY</span>
              <span className="text-cyan-400 font-bold block mt-1">ΔH: -425 kJ/mol (Exothermic)</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">MANIFESTATION_BASE</span>
              <span className="text-white font-bold block mt-1">Thought + Word + Emotion</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-cyan-400 font-bold block mt-1">100% Resonance Spikes</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">QUANTUM_SPARK_DENSITY</span>
              <span className={`font-bold block mt-1 transition-colors ${reactionTriggered ? 'text-cyan-400 animate-pulse' : 'text-neutral-400'}`}>
                {reactionTriggered ? 'CRITICAL_MAX_HIGH' : 'STABLE_STEADY'}
              </span>
            </div>
          </div>
        </div>

        {/* Grid de Capacidades Químico-Digitales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {[
            { 
              icon: Rocket, 
              title: "Molecular Prototyping", 
              desc: "Every design is born in the mind, but it is immortalized in architecture. We shape scalable software by aligning your concepts with precision engineering, creating a perfect bridge where mental abstraction becomes an indestructible digital ecosystem." 
            },
            { 
              icon: Brain, 
              title: "Enzymatic Architecture", 
              desc: "We model your business logic as a living, self-sustaining organism. We inject performance catalysts that accelerate backend computing speed, reducing system entropy." 
            },
            { 
              icon: Cpu, 
              title: "Resonant Synchronization", 
              desc: "We design ecosystems where the visual interface and the data cores vibrate at precisely the same execution frequency. Absolute synchronization based on perfect molecular symmetries." 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: 'rgba(0,243,255,0.3)' }}
              className="p-8 border border-white/5 bg-[#01040a]/90 rounded-[2rem] relative overflow-hidden transition-all duration-300 group transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_50%_50%,rgba(0,243,255,0.04),transparent_60%)] transition-opacity duration-300 pointer-events-none" />
              
              <div className="mb-6 p-4 bg-neutral-900/40 w-fit rounded-2xl border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                <item.icon className="w-7 h-7 text-cyan-400 transition-transform duration-500 group-hover:rotate-[360deg]" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Manifiesto Visual Inferior con la P.D de tu frase */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="p-10 md:p-12 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-[#010a14]/40 to-transparent text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_50%,rgba(0,243,255,0.03),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-light mb-4 uppercase tracking-widest text-white">
            The Law of Manifestation
          </h3>
          <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white max-w-2xl mx-auto leading-relaxed font-sans font-light italic">
            "El Pensamiento, la Palabra y la Emoción. Son la Base de Toda Manifestación…"
          </p>
          <div className="text-[10px] font-mono text-neon-glow-css  uppercase tracking-[0.4em] mt-6 select-none">
            ⚛️ · 🧘🏻‍♂️ · 🕉️ · 🧠 · 👁️ · 👤 · ✨ = ♾️
          </div>
        </motion.div>

      </div>

      {/* --- MODAL DEL ALIEN CON ESTÉTICA CIAN/BLANCO --- */}
      <AnimatePresence>
        {reactionTriggered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={handleCloseReaction}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="bg-[#01040a] border border-cyan-500/30 p-8 rounded-[2.5rem] max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)] font-mono text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-cyan-400" />
              
              <button 
                onClick={handleCloseReaction}
                className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-400 hover:text-cyan-400 text-neutral-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-32 h-32 mx-auto mb-6 bg-neutral-950 border border-white/10 rounded-full flex items-center justify-center overflow-hidden group shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]">
                <motion.div 
                  animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-5 border border-white/10 rounded-full"
                />
                
                <motion.div 
                  animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center justify-center text-cyan-400"
                >
                  <Atom className="w-12 h-12 text-cyan-400 animate-spin duration-5000" />
                  <div className="flex gap-2.5 mt-1">
                    <span className="w-2 h-1.5 bg-white rounded-full animate-ping" />
                    <span className="w-2 h-1.5 bg-white rounded-full animate-ping delay-300" />
                  </div>
                </motion.div>

                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute bottom-0 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                    style={{ left: `${20 * (i + 1)}%` }}
                    animate={{ y: [0, -140], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeIn" }}
                  />
                ))}
              </div>

              <span className="text-[9px] px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-md text-cyan-400 tracking-widest uppercase">
                // CRITICAL ALCHEMICAL COHESION
              </span>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4 mb-3">
                Xenomorph Ideation Successful
              </h3>
              
              <div className="space-y-3 text-left bg-black border border-white/5 p-4 rounded-xl text-neutral-400 text-[11px] leading-relaxed">
                <div className="text-cyan-400 font-bold">// SECURE LOG TRANSCRIPTION:</div>
                <p>1. Transmutation field successfully deployed in Alajuela node.</p>
                <p>2. Abstract models passed static chemical binding. No volatile components detected.</p>
                <p>3. Dynamic stars and geometric planetary rings synchronized at 0.8ms latency thresholds.</p>
              </div>

              <button
                onClick={handleCloseReaction}
                className="w-full mt-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]"
              >
                Stabilize Matrix Link
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}