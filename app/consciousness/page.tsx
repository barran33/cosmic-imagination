"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Brain, 
  Atom, 
  Orbit, 
  Cpu, 
  X,
  Binary,
  Sparkles,
  Activity,
  Infinity as InfinityIcon
} from 'lucide-react';

// ========================================================
// COMPONENTE INTERACTIVO: CEREBRO BIFURCADO (ASSET RENDER 3D)
// ========================================================
const BifurcatedQuantumBrain = ({ isSynced }: { isSynced: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Manejo de Parallax 3D Suave basado en el cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordenadas relativas desde el centro del contenedor
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Inclinación máxima controlada para un comportamiento fluido
    setRotateX((mouseY / height) * -22);
    setRotateY((mouseX / width) * 22);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="w-full flex justify-center items-center py-12 relative select-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={handleMouseLeave}
        animate={{ 
          y: isSynced ? [0, -6, 0] : [0, -12, 0],
          rotateX: rotateX,
          rotateY: rotateY
        }}
        transition={{ 
          y: { repeat: Infinity, duration: isSynced ? 2.5 : 5, ease: "easeInOut" },
          rotateX: { type: "spring", stiffness: 130, damping: 22 },
          rotateY: { type: "spring", stiffness: 130, damping: 22 }
        }}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] relative cursor-grab active:cursor-grabbing flex items-center justify-center bg-[#030712]/30 rounded-full border border-white/[0.02] shadow-[0_0_50px_rgba(0,0,0,0.6)] group"
      >
        {/* Anillos de Resonancia de Fondo (Geometría de Campo) */}
        <div className="absolute inset-4 border border-dashed border-cyan-500/10 rounded-full animate-vortex-slow pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
        <div className="absolute inset-12 border border-purple-500/5 rounded-full animate-vortex-reverse pointer-events-none" />

        {/* Halo Lumínico Central Dinámico (Efecto Neon Expandible) */}
        <motion.div 
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.75 : 0.35
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute w-44 h-44 rounded-full blur-[75px] mix-blend-screen pointer-events-none transform-gpu transition-all duration-700 ${
            isSynced ? 'bg-gradient-to-r from-cyan-400 via-white to-purple-500' : 'bg-cyan-500/30'
          }`} 
        />

        {/* CONTENEDOR DEL ASSET CON PROFUNDIDAD REAL */}
        <motion.div
          style={{ transform: "translateZ(40px)", willChange: "filter" }}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="w-[82%] h-[82%] relative z-10 flex items-center justify-center"
        >
          {/* Render del Cerebro con Proyección de Sombra Neon Inteligente */}
          <img 
            src="cosmic-universe/assets/floating-brain.png" 
            alt="Quantum Bifurcated Brain"
            className={`w-full h-full object-contain transition-all duration-500 transform-gpu ${
              isHovered 
                ? 'filter drop-shadow-[0_0_30px_rgba(0,243,255,0.55)] drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] scale-102' 
                : 'filter drop-shadow-[0_0_15px_rgba(0,243,255,0.15)] opacity-90'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const placeholder = parent.querySelector('.brain-fallback');
                if (placeholder) placeholder.classList.remove('hidden');
              }
            }}
          />

          {/* Fallback elegante si la imagen se está cargando o no se encuentra */}
          <div className="brain-fallback hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 border border-dashed border-cyan-500/20 bg-black/60 rounded-full animate-pulse">
            <Brain className="w-8 h-8 text-cyan-500/40 mb-1" />
            <span className="text-[9px] font-mono text-cyan-400/60 tracking-wider">// ASSET_LOADING</span>
          </div>
        </motion.div>

        {/* Partículas Binarias Flotantes a la Izquierda */}
        <div className="absolute left-4 top-1/4 bottom-1/4 w-12 pointer-events-none font-mono text-[8px] text-cyan-500/40 flex flex-col justify-between items-start select-none transition-opacity duration-300 group-hover:opacity-80">
          <motion.span animate={isSynced ? { opacity: [0.2, 1, 0.2] } : {}} transition={{ repeat: Infinity, duration: 1.5 }}>01101</motion.span>
          <motion.span animate={isSynced ? { opacity: [0.8, 0.1, 0.8] } : {}} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>0x7F</motion.span>
          <motion.span animate={isSynced ? { opacity: [0.1, 0.9, 0.1] } : {}} transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}>SYNC</motion.span>
        </div>

        {/* Destellos de Luz Mística a la Derecha */}
        <div className="absolute right-4 top-1/4 bottom-1/4 w-12 pointer-events-none text-purple-400/40 flex flex-col justify-between items-end select-none transition-opacity duration-300 group-hover:opacity-80">
          <Sparkles className="w-3 h-3 text-purple-400/30 animate-pulse" />
          <InfinityIcon className="w-3 h-3 text-white/20 animate-spin duration-10000" />
          <Heart className="w-2.5 h-2.5 text-purple-400/40 animate-ping" />
        </div>
      </motion.div>
    </div>
  );
};

// ========================================================
// SUB-MÓDULO DE MONITOREO TÁCTICO COGNITIVO
// ========================================================
const CognitiveTelemetry = ({ synced }: { synced: boolean }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono">
      <div className="bg-black/50 border border-white/[0.03] p-4 rounded-xl shadow-inner transition-colors duration-300 hover:border-cyan-500/20">
        <div className="text-neutral-500 flex items-center gap-1.5 uppercase">
          <Binary className="w-3.5 h-3.5 text-cyan-400" /> Left Hemisphere
        </div>
        <span className="text-cyan-400 font-bold block mt-1.5">{synced ? "MATRIZ_LOGIC: 100% OK" : "COMPUTE_LOAD: IDLE"}</span>
      </div>
      <div className="bg-black/50 border border-white/[0.03] p-4 rounded-xl shadow-inner transition-colors duration-300 hover:border-purple-500/20">
        <div className="text-neutral-500 flex items-center gap-1.5 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Right Hemisphere
        </div>
        <span className="text-purple-400 font-bold block mt-1.5">{synced ? "COHESION: HARMONIC" : "FLOW_STATE: AWAITING"}</span>
      </div>
      <div className="bg-black/50 border border-white/[0.03] p-4 rounded-xl shadow-inner transition-colors duration-300 hover:border-white/10">
        <div className="text-neutral-500 flex items-center gap-1.5 uppercase">
          <Activity className="w-3.5 h-3.5 text-white" /> Tesla Resonator
        </div>
        <span className="text-white font-bold block mt-1.5">{synced ? "FREQUENCY: 369 Hz" : "STANDBY: 0 Hz"}</span>
      </div>
      <div className="bg-black/50 border border-white/[0.03] p-4 rounded-xl shadow-inner transition-colors duration-300 hover:border-cyan-500/20">
        <div className="text-neutral-500 flex items-center gap-1.5 uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Ethical Layer
        </div>
        <span className="text-cyan-500 font-bold block mt-1.5">INTEGRITY_BASE: TRUE</span>
      </div>
    </div>
  );
};

// ========================================================
// CONTENEDOR PRINCIPAL DE LA PÁGINA
// ========================================================
export default function ConsciousnessPage() {
  const [matrixSynced, setMatrixSynced] = useState(false);
  const [neuralLog, setNeuralLog] = useState("NEURAL_CORE: AWAITING_SYNCHRONIZATION // INTENTION_IDLE");

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cosmic-vortex-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes cosmic-vortex-reverse {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      .animate-vortex-slow {
        animation: cosmic-vortex-slow 60s linear infinite;
        will-change: transform;
      }
      .animate-vortex-reverse {
        animation: cosmic-vortex-reverse 45s linear infinite;
        will-change: transform;
      }
      .text-neon-glow {
        text-shadow: 0 0 10px rgba(34, 211, 238, 0.4), 0 0 25px rgba(34, 211, 238, 0.15);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleNeuralSync = () => {
    setMatrixSynced(true);
    setNeuralLog("THOUGHT_WAVE_INJECTED: Aligning thought, word, and emotion thresholds.");
    
    setTimeout(() => {
      setNeuralLog("MANIFESTATION_SUCCESS: Consciousness matrix fully integrated with core engineering.");
    }, 3000);
  };

  const handleCloseSync = () => {
    setMatrixSynced(false);
    setNeuralLog("NEURAL_CORE: AWAITING_SYNCHRONIZATION // INTENTION_IDLE");
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 py-24 md:py-32">
      
      {/* Fondo inmersivo: Nebulosa Estática */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,#030e1c_0%,#000000_80%)] pointer-events-none z-0" />
      
      {/* GRID CUÁNTICO REFACTORIZADO PARA EVITAR LAG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#021626_1px,transparent_1px),linear-gradient(to_bottom,#021626_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)] opacity-25" />
        
        {/* Partículas de Consciencia con Recorridos Suaves */}
        {[...Array(20)].map((_, idx) => (
          <motion.div
            key={`quantum-p-${idx}`}
            className={`absolute rounded-full ${idx % 2 === 0 ? 'bg-cyan-400/40 shadow-[0_0_6px_#00f3ff]' : 'bg-purple-400/30'}`}
            style={{
              width: idx % 2 === 0 ? '2px' : '1.5px',
              height: idx % 2 === 0 ? '2px' : '1.5px',
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
            }}
            animate={matrixSynced ? {
              y: [0, -120],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            } : {
              y: [0, -30],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: matrixSynced ? Math.random() * 3 + 1.5 : Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-16">
        
        {/* Header Principal */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-cyan-500/20 rounded-full select-none">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin duration-3000" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// EVOLUTIONARY CORE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tighter leading-tight">
            Conscious <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 font-bold text-neon-glow">Development</span>
          </h2>

          <p className="text-cyan-200 text-neon-glow-css text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-sans">
            Technology is not an end in itself, it's a catalyst. We design digital ecosystems where operational efficiency converges gracefully with human ethics.
          </p>
        </motion.div>

        {/* PIEZA CENTRAL: EL CEREBRO BIFURCADO INTERACTIVO */}
        <BifurcatedQuantumBrain isSynced={matrixSynced} />

        {/* CONTENEDOR DE CONTROL Y TELEMETRÍA COGNITIVA */}
        <div className="border border-white/5 bg-[#030611]/60 rounded-[2.5rem] p-6 md:p-8 font-mono text-xs backdrop-blur-sm relative overflow-hidden transform-gpu shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neutral-950 rounded-xl border border-white/5">
                <Brain className={`w-5 h-5 text-cyan-400 ${matrixSynced ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-[11px]">NEURAL CONFIGURATION CHAMBER</div>
                <div className="text-neutral-500 text-[9px] mt-0.5 truncate max-w-[280px] sm:max-w-none">{neuralLog}</div>
              </div>
            </div>
            
            {!matrixSynced && (
              <button
                onClick={handleNeuralSync}
                className="w-full sm:w-auto px-5 py-3 bg-cyan-400 hover:bg-cyan-300 rounded-xl font-bold text-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-mono text-[11px] shadow-[0_0_20px_rgba(34,211,238,0.25)] active:scale-[0.98]"
              >
                <Cpu className="w-3.5 h-3.5 text-black" /> Align Consciousness Matrix
              </button>
            )}
          </div>

          {/* Módulo de Telemetría Aislado */}
          <CognitiveTelemetry synced={matrixSynced} />
        </div>

        {/* Pilares de Consciencia */}
        <div className="space-y-6 text-white relative z-20">
          {[
            {
              icon: ShieldCheck,
              title: "Digital Ethics by Design",
              text: "We implement integrity layers from the first commit. We prioritize data sovereignty and transparency in every information flow we manage."
            },
            {
              icon: Globe,
              title: "Sustainable Development",
              text: "We optimize the digital footprint of each system. We create lightweight architectures that consume fewer resources, maximizing the energy efficiency of the ecosystem."
            },
            {
              icon: Heart,
              title: "User-Centered Design",
              text: "We build interfaces that respect the user's attention. Less friction, more purpose; tools designed to enhance the human experience, not distract from it."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4, borderColor: 'rgba(34, 211, 238, 0.2)' }}
              className="flex flex-col md:flex-row gap-6 items-start p-6 border border-white/[0.02] bg-neutral-950/40 hover:bg-[#040814]/40 rounded-3xl transition-all duration-300 group"
            >
              <div className="p-4 bg-neutral-950 rounded-2xl border border-white/5 group-hover:border-cyan-500/20 transition-colors shadow-inner">
                <item.icon className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight uppercase font-mono text-neon-glow">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-sans font-light max-w-3xl">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Consciencia */}
        <div className="text-center pt-8 border-t border-white/[0.03]">
          <Atom className="w-6 h-6 text-cyan-500 mx-auto mb-4 animate-spin duration-5000 opacity-60" />
          <p className="text-cyan-200 text-neon-glow-css  font-mono text-[10px] tracking-[0.25em] uppercase select-none">
            // Development with intention. Engineering with impact.
          </p>
        </div>
      </div>

      {/* --- MODAL DETONANTE INTERACTIVO --- */}
      <AnimatePresence>
        {matrixSynced && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseSync}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.96, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#030307] border border-neutral-800 p-6 md:p-8 rounded-[2.5rem] max-w-md w-full text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] font-mono text-xs z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />
              
              <button 
                onClick={handleCloseSync}
                className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-400 hover:text-cyan-400 text-neutral-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-24 h-24 mx-auto mb-6 bg-neutral-950 border border-white/10 rounded-full flex items-center justify-center shadow-inner">
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 border border-dashed border-cyan-500/20 rounded-full"
                />
                <Brain className="w-10 h-10 text-cyan-400 animate-pulse relative z-10" />
              </div>

              <span className="text-[9px] px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-md text-cyan-400 tracking-widest uppercase">
                // NEURAL FLOW ENGAGED
              </span>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4 mb-3">
                Conscious Manifestation Active
              </h3>
              
              <div className="space-y-2.5 text-left bg-black border border-white/5 p-4 rounded-xl text-neutral-400 text-[11px] leading-relaxed">
                <div className="text-cyan-400 font-bold">// SECURE MATRIX LOG:</div>
                <p>1. Operational efficiency integrated with digital human ethics.</p>
                <p>2. Sustainable framework footprint injected into running clusters.</p>
                <p>3. Attention-respectful UX components stabilized seamlessly.</p>
              </div>

              <button
                onClick={handleCloseSync}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold uppercase tracking-widest rounded-xl hover:opacity-95 transition-all shadow-md text-[11px]"
              >
                Stabilize Intention Link
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}