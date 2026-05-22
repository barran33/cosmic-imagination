"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Atom, Eye, Sparkles, Terminal, Code, Cpu } from 'lucide-react';

export default function CosmovisionPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- MOTOR DE CONSTELACIONES Y PARTÍCULAS CUÁNTICAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      speedX: number; 
      speedY: number; 
      alpha: number; 
      decay: number;
      glow: boolean;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Densidad controlada pero con alta presencia visual
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 15)); 
      
      for (let i = 0; i < particleCount; i++) {
        const sizeRand = Math.random();
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Tres niveles de profundidad bien definidos
          size: sizeRand > 0.85 ? Math.random() * 2.5 + 2 : sizeRand > 0.5 ? Math.random() * 1.2 + 1 : Math.random() * 0.6 + 0.4,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,
          alpha: Math.random() * 0.7 + 0.3,
          decay: (Math.random() * 0.008) + 0.003,
          glow: sizeRand > 0.75 // Solo las partículas grandes/medianas emiten destello pesado
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const length = particles.length;

      // 1. Dibujar conexiones de red cuántica entre nodos cercanos primero
      for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          // Rango de entrelazamiento de nodos
          if (distance < 90) {
            const alphaConnection = (1 - distance / 90) * 0.13;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alphaConnection})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // 2. Dibujar y actualizar partículas
      for (let i = 0; i < length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Simulación de pulsación/flicker dinámico
        p.alpha += p.decay;
        if (p.alpha > 0.95 || p.alpha < 0.25) {
          p.decay = -p.decay;
        }

        // Límites de pantalla infinitos
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Renderizado del core de la partícula con glow selectivo
        if (p.glow) {
          ctx.shadowBlur = p.size * 5;
          ctx.shadowColor = "#22d3ee";
          ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha * 0.7})`;
        }
        
        ctx.fill();
      }

      ctx.shadowBlur = 0; // Optimización de pipeline gráfico
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 py-24 md:py-32">
      
      {/* CANVAS BACKDROP: Red de constelaciones hiper-vivas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 transform-gpu"
      />

      {/* PLANETA CUÁNTICO FLOTANTE */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -top-16 -right-16 md:top-12 md:right-12 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none z-0 transform-gpu"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #03343d 0%, #01161c 45%, #000000 85%)',
          boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.95), inset 15px 15px 40px rgba(34,211,238,0.2), 0 0 100px rgba(6,182,212,0.08)'
        }}
      >
        {/* Anillo orbital translúcido */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent rotate-[-12deg] blur-[0.5px]" />
      </motion.div>

      {/* Resplandor Cósmico de Fondo Avanzado */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-950/25 to-purple-950/10 rounded-full blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none transform-gpu" />

      {/* Rejilla sutil tecnológica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
        
        {/* Etiqueta de Telemetría Neón */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 bg-neutral-950 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <span className="text-cyan-400 font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
            // CORE MANIFESTO: HIGH-FREQUENCY SYSTEMS
          </span>
        </motion.div>
        
        {/* Título Principal */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl text-neon-glow-css  font-extralight tracking-tight text-white uppercase leading-none"
          >
            ENGINEERING THE <br className="hidden sm:inline" />
            <span className="text-cyan-400 font-normal  text-neon-glow-css drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">FUTURE ARCHITECTURE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-neon-glow-css  font-mono text-xs uppercase tracking-[0.25em]"
          >
            Where Absolute Technical Precision Meets Universal Purpose
          </motion.p>
        </div>
        
        {/* Manifiesto Central */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 text-neutral-300 max-w-4xl mx-auto text-justify sm:text-center text-base md:text-lg leading-relaxed tracking-wide"
        >
          <p>
            At <span className="font-semibold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Cosmic Imagination</span>, reject generic software and prefabricated templates. We don't accumulate empty lines of code; we structure **conscious digital infrastructures**, surgically designed to dominate the digital environment under principles of high fidelity, extreme scalability, and disruptive design.
          </p>

          {/* Bloque Destacado de Tesla */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="my-10 p-6 md:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-900 shadow-[0_0_30px_rgba(0,255,255,0.03)] relative overflow-hidden group select-none relative z-10"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-colors" />
            <p className="text-sm md:text-base italic  text-neon-glow-css text-cyan-300 font-mono font-medium tracking-wide drop-shadow-[0_0_4px_rgba(34,211,238,0.2)]">
              "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration."
            </p>
            <p className="text-xs font-mono text-neon-glow-css text-white uppercase tracking-widest mt-3">
              — Nikola Tesla • Inspiration from Our Algorithmic Core
            </p>
          </motion.div>

          <p>
           Our worldview is the point of convergence where the mathematical rigidity of quantum physics and cybersecurity are intertwined in perfect harmony with sacred geometry. We translate abstract visions into robust systems that flow without resistance, optimizing every conversion process and guaranteeing a high-frequency impact on the market.
          </p>
        </motion.div>

        {/* Bloques de la Tríada */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6"
        >
          {/* Tarjeta 1 */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.4)', boxShadow: '0 10px 30px rgba(6,182,212,0.05)' }}
            className="p-8 rounded-xl bg-neutral-950/70 border border-neutral-900 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col h-full transform-gpu relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-950/40 border border-cyan-500/20 rounded-lg">
                <Atom className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]" />
              </div>
              <h4 className="text-xs font-mono text-neon-glow-css text-cyan-400 tracking-[0.2em] uppercase">
                QUANTUM ORDER
              </h4>
            </div>
            <p className="text-sm text-white text-neon-glow-css leading-relaxed flex-grow">
              Advanced engineering and a robust backend. We build clean, high-speed systems based on real-time data interleaving and architectures immune to critical failures.
            </p>
          </motion.div>

          {/* Tarjeta 2 */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.4)', boxShadow: '0 10px 30px rgba(6,182,212,0.05)' }}
            className="p-8 rounded-xl bg-neutral-950/70 border border-neutral-900 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col h-full transform-gpu relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-950/40 border border-cyan-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]" />
              </div>
              <h4 className="text-xs text-neon-glow-css font-mono text-cyan-400 tracking-[0.2em] uppercase">
                GOLDEN AESTHETIC
              </h4>
            </div>
            <p className="text-sm text-white text-neon-glow-css  leading-relaxed flex-grow">
             Interactive interfaces designed according to the mathematical proportions of nature. Harmonious structures that eliminate user friction, maximizing retention and intuitive experience. 
            </p>
          </motion.div>

          {/* Tarjeta 3 */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.4)', boxShadow: '0 10px 30px rgba(6,182,212,0.05)' }}
            className="p-8 rounded-xl bg-neutral-950/70 border border-neutral-900 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col h-full transform-gpu relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-950/40 border border-cyan-400/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]" />
              </div>
              <h4 className="text-xs text-neon-glow-css  font-mono text-cyan-400 tracking-[0.2em] uppercase">
                EVOLUTIONARY PURPOSE
              </h4>
            </div>
            <p className="text-sm text-white text-neon-glow-css  leading-relaxed flex-grow">
              We don't create ordinary technology; we materialize complex commercial and strategic intentions into high-impact digital tools that drive real ecosystem growth.
            </p>
          </motion.div>
        </motion.div>

        {/* Sección de Métricas */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-neutral-900 pt-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center font-mono relative z-10"
        >
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white text-neon-glow-css tracking-tight flex justify-center items-center gap-1">
              <Terminal className="w-4 h-4 text-cyan-500" /> 100%
            </p>
            <p className="text-[10px] text-white uppercase  tracking-widest mt-1">Clean & Raw Code</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white text-neon-glow-css tracking-tight flex justify-center items-center gap-1">
              <Code className="w-4 h-4 text-cyan-500 " /> 369Hz
            </p>
            <p className="text-[10px] text-white uppercase tracking-widest mt-1">Design Resonance</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white text-neon-glow-css  tracking-tight flex justify-center items-center gap-1">
              <Cpu className="w-4 h-4 text-cyan-500" /> &lt;120ms
            </p>
            <p className="text-[10px] text-white uppercase    tracking-widest mt-1">Quantum Latency</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-tight text-neon-glow-css flex justify-center items-center gap-1">
              <Atom className="w-4 h-4 text-cyan-500" /> SEC
            </p>
            <p className="text-[10px] text-white uppercase tracking-widest mt-1">Audited Systems</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}