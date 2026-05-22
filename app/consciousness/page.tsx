"use client";
import React, { useState } from 'react';
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
  X 
} from 'lucide-react';

export default function ConsciousnessPage() {
  const [matrixSynced, setMatrixSynced] = useState(false);
  const [neuralLog, setNeuralLog] = useState("NEURAL_CORE: AWAITING_SYNCHRONIZATION // INTENTION_IDLE");

  // Función para activar el dinamismo del Cerebro Cuántico
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
    <div className="min-h-screen bg-[#000205] text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center px-6 py-24 md:py-32">
      
      {/* Fondo inmersivo: Nebulosa de Fondo Estática en tonalidad Cian Oscuro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#001120_0%,#000000_75%)] pointer-events-none z-0" />
      
      {/* --- SISTEMA DE PARTÍCULAS CUÁNTICAS Y ENLACES --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Grid Cuántico de Ingeniería */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#021d30_1px,transparent_1px),linear-gradient(to_bottom,#021d30_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)] opacity-30" />
        
        {/* Órbita de Fondo Estelar */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-120px] w-80 h-80 rounded-full border border-cyan-500/10 bg-gradient-to-tr from-cyan-950/10 via-transparent to-black blur-[1px] hidden lg:block"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-2 border-t border-cyan-500/10 rounded-full transform rotate-45" />
        </motion.div>

        {/* Partículas de Luz y Consciencia Cuántica (Blanco y Cian) */}
        {[...Array(30)].map((_, idx) => (
          <motion.div
            key={`quantum-particle-${idx}`}
            className={`absolute rounded-full ${idx % 2 === 0 ? 'bg-cyan-400 shadow-[0_0_8px_#00f3ff]' : 'bg-white'}`}
            style={{
              width: idx % 2 === 0 ? '2px' : '1.5px',
              height: idx % 2 === 0 ? '2px' : '1.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={matrixSynced ? {
              y: [0, Math.random() * -200 - 50],
              x: [0, (Math.random() - 0.5) * 150],
              scale: [1, Math.random() * 2 + 1, 1],
              opacity: [0.3, 0.9, 0.3]
            } : {
              y: [0, Math.random() * -30 - 15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: matrixSynced ? Math.random() * 2.5 + 1 : Math.random() * 7 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-20">
        
        {/* Header con énfasis en el propósito */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-cyan-500/20 rounded-full select-none">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin duration-3000" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// EVOLUTIONARY CORE</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extralight uppercase tracking-tighter leading-tight">
            Conscious <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-200 font-bold drop-shadow-[0_0_20px_rgba(0,243,255,0.35)]">Development</span>
          </h2>

          <p className="text-cyan-300/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light font-sans">
            Technology is not an end in itself, it's a catalyst. We design digital ecosystems where operational efficiency converges with human ethics.
          </p>
        </motion.div>

        {/* --- NUEVO: CEREBRO CONFIGURANDO (NEURAL MATRIX REACTOR) --- */}
        <div className="border border-white/5 bg-[#01060f]/40 rounded-[2rem] p-6 md:p-8 font-mono text-xs backdrop-blur-md relative overflow-hidden transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-[11px]">NEURAL CONFIGURATION CHAMBER</div>
                <div className="text-neutral-500 text-[9px] mt-0.5">{neuralLog}</div>
              </div>
            </div>
            
            {!matrixSynced && (
              <button
                onClick={handleNeuralSync}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-black uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,243,255,0.35)]"
              >
                <Cpu className="w-3.5 h-3.5 text-black" /> Align Consciousness Matrix
              </button>
            )}
          </div>

          {/* Grid de Estado de Configuración de la Mente */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">THOUGHT_ALIGNMENT</span>
              <span className="text-cyan-400 font-bold block mt-1">Sychronized (100 Hz)</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">EMOTION_FREQUENCY</span>
              <span className="text-white font-bold block mt-1">High-Cohesion Flow</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">ETHICAL_VALIDATION</span>
              <span className="text-cyan-400 font-bold block mt-1">Integrity Layer Active</span>
            </div>
            <div className="bg-black/40 border border-white/[0.02] p-3 rounded-xl">
              <span className="text-neutral-500 block">MANIFESTATION_DENSITY</span>
              <span className={`font-bold block mt-1 transition-colors ${matrixSynced ? 'text-cyan-400 animate-pulse' : 'text-neutral-400'}`}>
                {matrixSynced ? 'MATERIALIZING_BIT_FLOW' : 'AWAITING_INPUT'}
              </span>
            </div>
          </div>
        </div>

        {/* Pilares de Consciencia con Efectos de Movimiento Cuántico */}
        <div className="space-y-8  text-white relative z-20">
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
              title: "User-centered design",
              text: "We build interfaces that respect the user's attention. Less friction, more purpose; tools designed to enhance the human experience, not distract from it."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ x: 6, borderColor: 'rgba(0,243,255,0.2)' }}
              className="flex flex-col md:flex-row gap-8 items-start p-8 border-l border-neutral-900 bg-gradient-to-r from-[#01050d]/40 to-transparent hover:from-[#010914]/60 rounded-r-3xl transition-all duration-300 group"
            >
              <div className="p-4 bg-neutral-950 rounded-2xl border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                <item.icon className="w-8 h-8 text-cyan-400 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-neon-glow-css group-hover:text-cyan-400 transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-white leading-relaxed max-w-2xl font-light font-sans">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre de Consciencia */}
        <div className="mt-24 text-center border-t border-neutral-900 pt-16">
          <Zap className="w-10 h-10 text-cyan-500 mx-auto mb-6 animate-pulse" />
          <p className="text-neutral-400 font-mono text-sm tracking-widest uppercase select-none">
            // Development with intention. Engineering with impact.
          </p>
        </div>
      </div>

      {/* --- DETONACIÓN MAGA: MODAL INTERACTIVO DEL PROCESO MENTAL --- */}
      <AnimatePresence>
        {matrixSynced && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={handleCloseSync}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="bg-[#01040a] border border-cyan-500/30 p-8 rounded-[2.5rem] max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)] font-mono text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Línea de energía superior blanca/cian */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-cyan-400" />
              
              <button 
                onClick={handleCloseSync}
                className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-400 hover:text-cyan-400 text-neutral-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Contenedor Visual del Cerebro Cuántico en Configuración */}
              <div className="relative w-32 h-32 mx-auto mb-6 bg-neutral-950 border border-white/10 rounded-full flex items-center justify-center overflow-hidden group shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]">
                {/* Órbitas rotando tras el núcleo mental */}
                <motion.div 
                  animate={{ rotate: -360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-5 border border-white/10 rounded-full"
                />
                
                {/* Iconografía central */}
                <motion.div 
                  animate={{ y: [0, -3, 0], scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center justify-center text-cyan-400"
                >
                  <Atom className="w-12 h-12 text-cyan-400 animate-spin duration-5000" />
                  <div className="flex gap-2.5 mt-1">
                    <span className="w-2 h-1.5 bg-white rounded-full animate-ping" />
                    <span className="w-2 h-1.5 bg-white rounded-full animate-ping delay-200" />
                  </div>
                </motion.div>

                {/* Chispas cuánticas ascendentes */}
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute bottom-0 w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                    style={{ left: `${20 * (i + 1)}%` }}
                    animate={{ y: [0, -140], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeIn" }}
                  />
                ))}
              </div>

              <span className="text-[9px] px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-md text-cyan-400 tracking-widest uppercase">
                // NEURAL FLOW ENGAGED
              </span>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4 mb-3">
                Conscious Manifestation Active
              </h3>
              
              <div className="space-y-3 text-left bg-black border border-white/5 p-4 rounded-xl text-neutral-400 text-[11px] leading-relaxed">
                <div className="text-cyan-400 font-bold">// SECURE MATRIX LOG:</div>
                <p>1. Operational efficiency matched with human digital ethics.</p>
                <p>2. Lightweight sustainable footprint injected successfully into nodes.</p>
                <p>3. Attention-respectful UX interfaces aligned at 0ms latency.</p>
              </div>

              <button
                onClick={handleCloseSync}
                className="w-full mt-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]"
              >
                Stabilize Intention Link
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}