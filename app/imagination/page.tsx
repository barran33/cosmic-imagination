"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Rocket, Sparkles, Brain, Cpu, Atom, FlaskConical, Orbit, Zap, X
} from 'lucide-react';

// ─────────────────────────────────────────────
// QUANTUM PARTICLE ENGINE — optimizado 60 FPS
// sin shadowBlur en el loop, sin filter CSS pesados
// ─────────────────────────────────────────────
interface QParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  color: string; life: number; maxLife: number;
  type: 'smoke' | 'spark' | 'wave';
}

interface Star { x: number; y: number; r: number; twinkle: number; speed: number; }

// Interfaz para las nuevas partículas flotantes de ambiente
interface AmbientParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; baseAlpha: number;
  phase: number; phaseSpeed: number;
  color: string;
}

const COLORS = ['#00FFFF','#a855f7','#ec4899','#f59e0b','#22c55e','#ffffff','#6366f1'];

function useQuantumCanvas(triggered: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const stateRef  = useRef({
    particles: [] as QParticle[],
    stars: [] as Star[],
    ambientParticles: [] as AmbientParticle[], // Guardará las partículas del aire
    collisionX: 0, collisionY: 0,
    frame: 0,
    beamProgress: 0,   // 0→1 partículas viajando hacia el centro
    exploded: false,
  });

  // Construir sprites offscreen para evitar shadowBlur en el loop
  const spriteCache = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const getSprite = useCallback((color: string, r: number) => {
    const key = `${color}-${r}`;
    if (spriteCache.current.has(key)) return spriteCache.current.get(key)!;
    const size = (r + 6) * 2;
    const off = document.createElement('canvas');
    off.width = size; off.height = size;
    const octx = off.getContext('2d')!;
    const cx = size / 2;
    octx.shadowBlur = 8;
    octx.shadowColor = color;
    octx.fillStyle = color;
    octx.beginPath(); octx.arc(cx, cx, r, 0, Math.PI * 2); octx.fill();
    spriteCache.current.set(key, off);
    return off;
  }, []);

// Inicializar estrellas y partículas ambientales (¡UPGRADED!)
 useEffect(() => {
  const canvas = canvasRef.current; if (!canvas) return;
  const W = canvas.offsetWidth || window.innerWidth;
  const H = canvas.offsetHeight || window.innerHeight;
    
    // 1. Estrellas de fondo fijas
    stateRef.current.stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.05,
    }));

    // 2. Partículas ambientales en suspensión (Ahora sí se van a ver)
    stateRef.current.ambientParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,           // Deriva horizontal un pelo más dinámica
      vy: -(Math.random() * 0.4 + 0.2),           // Velocidad de ascenso
      r: Math.random() * 3.7 + 2.5,               // CAMBIO: Más grandes (de 1.2px a 3.7px)
      baseAlpha: Math.random() * 0.35 + 0.3,      // CAMBIO: Más opacas (30% a 65% base)
      phase: Math.random() * Math.PI * 2,         
      phaseSpeed: Math.random() * 1.02 + 1.01,    // Oscilación un poco más viva
      // CAMBIO: Filtrado estricto de colores para que hagan match real con el branding
      color: ['#00FFFF', '#a855f7', '#ffffff'][Math.floor(Math.random() * 3)],
    }));

    stateRef.current.collisionX = W / 2;
    stateRef.current.collisionY = H / 2;
  }, []);

  // Spawn de partícula individual (reacción/explosión)
  const spawnParticle = useCallback((
    x: number, y: number, type: QParticle['type'],
    speedMult = 1, color?: string
  ) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 3 + 1) * speedMult;
    const c = color ?? COLORS[Math.floor(Math.random() * COLORS.length)];
    const life = type === 'smoke' ? 80 : type === 'wave' ? 50 : 40;
    stateRef.current.particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (type === 'smoke' ? 1.2 : 0),
      r: type === 'smoke' ? Math.random() * 6 + 3 : Math.random() * 3 + 1,
      alpha: 1, color: c, life, maxLife: life, type,
    });
  }, []);

  // Detonar colisión
  const detonate = useCallback((x: number, y: number) => {
    for (let i = 0; i < 60; i++) spawnParticle(x, y, 'spark',  2.5);
    for (let i = 0; i < 40; i++) spawnParticle(x, y, 'smoke',  1.2);
    for (let i = 0; i < 20; i++) spawnParticle(x, y, 'wave',   3.5);
  }, [spawnParticle]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const s   = stateRef.current;
      const W   = canvas.width, H = canvas.height;
      s.frame++;

      // ── FONDO ──
      ctx.fillStyle = 'rgba(0,2,5,0.18)';
      ctx.fillRect(0, 0, W, H);

      // ── ESTRELLAS ──
      for (const star of s.stars) {
        star.twinkle += 0.03;
        star.x -= star.speed;
        if (star.x < 0) { star.x = W; star.y = Math.random() * H; }
        const a = 0.4 + 0.3 * Math.sin(star.twinkle);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill();
      }

      // ── RENDEREAR PARTÍCULAS FLOTANDO EN EL AIRE ──
      ctx.save();
      for (const p of s.ambientParticles) {
        p.phase += p.phaseSpeed;
        
        // Simula la flotación agregando ondas sinusoidales a las posiciones
        p.x += p.vx + Math.sin(p.phase) * 0.18;
        p.y += p.vy;

        // Comportamiento infinito: Si salen por arriba o por los lados vuelven a entrar
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        // Modula la opacidad dinámicamente para dar efecto de profundidad tridimensional
        const dynamicAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore(); // Limpiar alpha global para el resto del motor gráfico

      // ── BEAM de partículas viajando (pre-colisión) ──
      if (triggered && !s.exploded) {
        s.beamProgress = Math.min(1, s.beamProgress + 0.012);

        // Beam izquierdo → centro
        const lx = s.beamProgress * s.collisionX;
        const ly = s.collisionY + Math.sin(s.frame * 0.15) * 18;
        // Beam derecho → centro
        const rx = W - s.beamProgress * (W - s.collisionX);
        const ry = s.collisionY + Math.sin(s.frame * 0.15 + Math.PI) * 18;

        // Dibujar beam como línea pulsante (sin shadowBlur)
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(lx, ly); ctx.stroke();
        ctx.strokeStyle = '#a855f7';
        ctx.beginPath(); ctx.moveTo(W, ry); ctx.lineTo(rx, ry); ctx.stroke();
        ctx.restore();

        // Estela de chispas en la punta de cada beam
        if (s.frame % 3 === 0) {
          spawnParticle(lx, ly, 'spark', 0.6, '#00FFFF');
          spawnParticle(rx, ry, 'spark', 0.6, '#a855f7');
        }

        // Colisión cuando ambas puntas se encuentran
        if (s.beamProgress >= 1 && !s.exploded) {
          s.exploded = true;
          detonate(s.collisionX, s.collisionY);
        }
      }

      // ── ONDAS DE CHOQUE circular post-explosión ──
      if (s.exploded) {
        if (s.frame % 120 === 0) {
          // re-detonación periódica suave
          for (let i = 0; i < 12; i++) spawnParticle(s.collisionX, s.collisionY, 'spark', 1.5);
        }
      }

      // ── PARTÍCULAS DINÁMICAS (Explosiones / Reacciones) ──
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x  += p.vx; p.y += p.vy;
        p.life--;
        p.alpha = p.life / p.maxLife;

        if (p.type === 'smoke') {
          p.r  += 0.15;
          p.vx *= 0.97;
          p.vy *= 0.97;
        } else if (p.type === 'wave') {
          p.vx *= 0.94;
          p.vy *= 0.94;
        }

        if (p.life <= 0) { s.particles.splice(i, 1); continue; }

        // Usar sprite precalculado (sin shadowBlur en el loop)
        const sprite = getSprite(p.color, Math.max(1, Math.round(p.r)));
        ctx.save();
        ctx.globalAlpha = p.alpha * (p.type === 'smoke' ? 0.35 : 0.9);
        ctx.drawImage(sprite, p.x - sprite.width / 2, p.y - sprite.height / 2);
        ctx.restore();
      }

      // ── ANILLO DE ENERGÍA en el punto de colisión ──
      if (s.exploded) {
        const ringPhase = (s.frame * 0.04) % (Math.PI * 2);
        const ringR = 30 + Math.sin(ringPhase) * 12;
        ctx.save();
        ctx.globalAlpha = 0.25 + 0.15 * Math.sin(ringPhase);
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(s.collisionX, s.collisionY, ringR, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = '#a855f7';
        ctx.beginPath(); ctx.arc(s.collisionX, s.collisionY, ringR * 0.6, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [triggered, getSprite, spawnParticle, detonate]);

  // Reset cuando se desactiva
  useEffect(() => {
    if (!triggered) {
      stateRef.current.particles     = [];
      stateRef.current.beamProgress  = 0;
      stateRef.current.exploded      = false;
    }
  }, [triggered]);

  return canvasRef;
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function ImaginationPage() {
  const [reactionTriggered, setReactionTriggered] = useState(false);
  const [reactionLog, setReactionLog] = useState("REACTOR_STATUS: STABLE // IDEATION_CHAMBER_IDLE");
  const [hasEntered, setHasEntered] = useState(false);

  const canvasRef = useQuantumCanvas(reactionTriggered);

  // Cursor parallax suave (spring para no sobrecargar)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], ['-8px', '8px']);
  const bgY = useTransform(springY, [-1, 1], ['-8px', '8px']);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { innerWidth: W, innerHeight: H } = window;
    mx.set((e.clientX / W) * 2 - 1);
    my.set((e.clientY / H) * 2 - 1);
  }, [mx, my]);

  // Entrada épica — solo la primera vez
  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 200);
    return () => clearTimeout(t);
  }, []);

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
   <div
    className="min-h-screen bg-[#000205] text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center px-6 py-24 md:py-32"
    onMouseMove={handleMouseMove}
  >
    {/* 1. NEBULOSA DE FONDO (Z-0 Base) */}
    <motion.div
      style={{ x: bgX, y: bgY }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#001120_0%,#000000_75%)]" />
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] bg-pink-900/8 rounded-full blur-[80px]" />
    </motion.div>

    {/* 2. GRID CUÁNTICO (Z-0) */}
    <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#021d30_1px,transparent_1px),linear-gradient(to_bottom,#021d30_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)] opacity-20" />

    {/* 3. CANVAS CUÁNTICO (Subido a z-10 para estar sobre el fondo y el grid) */}
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />

    {/* 4. PLANETA ORBITAL (Z-10) */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="fixed top-[10%] right-[-80px] w-64 h-64 rounded-full border border-cyan-500/15 hidden lg:block pointer-events-none z-10"
      style={{ background: 'radial-gradient(circle at 40% 35%, #001830, #000)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-3 border-t border-cyan-500/15 rounded-full -rotate-12" />
    </motion.div>
    
      {/* ── CONTENIDO ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={hasEntered ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950/80 border border-cyan-500/20 rounded-full select-none backdrop-blur-sm"
          >
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">
              // QUANTUM IDEATION COMPLEX
            </span>
          </motion.div>

          {/* Título con entrada letra a letra */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={hasEntered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-extralight text-white text-neon-glow-css uppercase tracking-tighter leading-tight"
            >
              The{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-200 font-bold"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto', WebkitBackgroundClip: 'text' }}
              >
                Imagination
              </motion.span>{' '}
              Engine
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-3xl mx-auto text-white text-neon-glow-css text-base md:text-xl leading-relaxed font-light tracking-wide"
          >
            "In the process of creation, from computers, airplanes, to rockets... anything that human beings have invented, before being conceived in the material world,"{' '}
            <span className="text-cyan-400 font-normal underline decoration-cyan-500/30 underline-offset-4">
              first it goes through the world of ideas
            </span>
            {' '}Thanks to the ingenuity of his imagination."
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={hasEntered ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-xs font-mono text-cyan-100 text-neon-glow-css uppercase tracking-widest pt-2"
          >
            — Jorge Barrantes, Founder &amp; C.E.O
          </motion.div>
        </motion.div>

        {/* ── REACTOR PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="border border-white/5 bg-[#01060f]/60 rounded-[2rem] p-6 md:p-8 font-mono text-xs backdrop-blur-md relative overflow-hidden"
        >
          {/* Línea superior animada */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #00FFFF, #a855f7, transparent)' }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={reactionTriggered ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FlaskConical className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-[11px]">
                  CHEMICAL SYNTHESIS LABORATORY
                </div>
                <div className="text-neutral-500 text-[9px] mt-0.5">{reactionLog}</div>
              </div>
            </div>

            {!reactionTriggered && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={triggerChemicalReaction}
                className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 20px rgba(0,243,255,0.3)' }}
              >
                <Zap className="w-3.5 h-3.5 fill-black" /> Inject Alchemical Catalyst
              </motion.button>
            )}

            {reactionTriggered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 font-mono text-[10px] text-cyan-400"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                REACTION ACTIVE
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
            {[
              { label: 'CREATIVE_ENTHALPY', val: 'ΔH: -425 kJ/mol (Exothermic)', color: 'text-cyan-400' },
              { label: 'MANIFESTATION_BASE', val: 'Thought + Word + Emotion', color: 'text-white' },
              { label: 'COSMIC_RESONANCE', val: '100% Resonance Spikes', color: 'text-cyan-400' },
              { label: 'QUANTUM_SPARK_DENSITY', val: reactionTriggered ? 'CRITICAL_MAX_HIGH' : 'STABLE_STEADY', color: reactionTriggered ? 'text-cyan-400' : 'text-neutral-400' },
            ].map((item, i) => (
              <motion.div
                key={i}
                animate={reactionTriggered && i === 3 ? { borderColor: ['rgba(255,255,255,0.02)', 'rgba(0,255,255,0.2)', 'rgba(255,255,255,0.02)'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-black/40 border border-white/[0.02] p-3 rounded-xl"
              >
                <span className="text-neutral-500 block">{item.label}</span>
                <span className={`${item.color} font-bold block mt-1 ${reactionTriggered && i === 3 ? 'animate-pulse' : ''}`}>
                  {item.val}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── GRID DE CAPACIDADES ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {[
            {
              icon: Rocket, title: "Molecular Prototyping",
              desc: "Every design is born in the mind, but it is immortalized in architecture. We shape scalable software by aligning your concepts with precision engineering, creating a perfect bridge where mental abstraction becomes an indestructible digital ecosystem.",
              accent: '#00FFFF',
            },
            {
              icon: Brain, title: "Enzymatic Architecture",
              desc: "We model your business logic as a living, self-sustaining organism. We inject performance catalysts that accelerate backend computing speed, reducing system entropy.",
              accent: '#a855f7',
            },
            {
              icon: Cpu, title: "Resonant Synchronization",
              desc: "We design ecosystems where the visual interface and the data cores vibrate at precisely the same execution frequency. Absolute synchronization based on perfect molecular symmetries.",
              accent: '#ec4899',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="p-8 border border-white/5 bg-[#01040a]/90 rounded-[2rem] relative overflow-hidden transition-colors duration-300 group"
              style={{ '--accent': item.accent } as React.CSSProperties}
            >
              {/* Hover glow (opacity transition, no blur en el loop) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                style={{ background: `radial-gradient(400px circle at 50% 50%, ${item.accent}08, transparent 60%)` }}
              />
              {/* Borde top coloreado */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)` }}
              />

              <div className="mb-6 p-4 bg-neutral-900/40 w-fit rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                <item.icon
                  className="w-7 h-7 transition-transform duration-500 group-hover:rotate-[360deg]"
                  style={{ color: item.accent }}
                />
              </div>
             <h3 className="text-xl font-semibold tracking-tight text-white mb-3 transition-colors duration-300">
                {item.title} {/* <-- Corregido con llaves */}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── MANIFIESTO INFERIOR ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="p-10 md:p-12 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-[#010a14]/60 to-transparent text-center relative overflow-hidden group backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_50%,rgba(0,243,255,0.03),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
          </motion.div>

          <h3 className="text-2xl font-light mb-4 uppercase tracking-widest text-white">
            The Law of Manifestation
          </h3>

          <p className="text-xl md:text-2xl text-neon-glow-css text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white max-w-2xl mx-auto leading-relaxed font-sans font-light italic">
            "Thought, Word, and Action. They are the Base of All Manifestation…"
          </p>

          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mt-6 select-none">
            ⚛️ · 🧘🏻‍♂️ · 🕉️ · 🧠 · 👁️ · 👤 · ✨ = ♾️
          </div>
        </motion.div>

      </div>

      {/* ── MODAL REACCIÓN ── */}
      <AnimatePresence>
        {reactionTriggered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={handleCloseReaction}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-[#01040a] border border-cyan-500/30 p-8 rounded-[2.5rem] max-w-lg w-full text-center relative overflow-hidden font-mono text-xs"
              style={{ boxShadow: '0 0 60px rgba(0,243,255,0.18)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra top animada */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ background: 'linear-gradient(90deg, transparent, #fff, #00FFFF, transparent)', backgroundSize: '200% auto' }}
              />

              <button
                onClick={handleCloseReaction}
                className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-400 hover:text-cyan-400 text-neutral-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Ícono orbital */}
              <div className="relative w-32 h-32 mx-auto mb-6 bg-neutral-950 border border-white/10 rounded-full flex items-center justify-center overflow-hidden"
                style={{ boxShadow: 'inset 0 0 20px rgba(0,243,255,0.15)' }}
              >
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full"
                />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-5 border border-white/10 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10 text-cyan-400"
                >
                  <Atom className="w-12 h-12 text-cyan-400" style={{ animation: 'spin 5s linear infinite' }} />
                </motion.div>
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

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleCloseReaction}
                className="w-full mt-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all"
                style={{ boxShadow: '0 0 20px rgba(0,243,255,0.25)' }}
              >
                Stabilize Matrix Link
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}