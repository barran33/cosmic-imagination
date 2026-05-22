"use client";

import React, { useEffect, useRef, useState } from 'react';


interface Particle {
  x: number; y: number; vx: number; vy: number; energy: number;
}
interface Nova { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; }

interface HologramText { text: string; x: number; y: number; life: number; }
interface MysteryData { title: string; content: string; }

const SCIENTIFIC_QUOTES: MysteryData[] = [
  {
    title: "Nikola Tesla",
    content: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration."
  },
  {
    title: "Max Planck",
    content: "When you change the way you look at things, the things you look at change. Science cannot solve the ultimate mystery of nature."
  },
  {
    title: "Albert Einstein",
    content: "The human mind is not capable of grasping the universe. We are like a little child entering a huge library."
  },
  {
    title: "Niels Bohr",
    content: "Everything we call real is made of things that cannot be regarded as real. If quantum mechanics hasn't profoundly shocked you, you haven't understood it yet."
  }
];

export default function DivineFlowPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [accentColor, setAccentColor] = useState('#00f3ff');
  const [currentMode, setCurrentMode] = useState('Normal');
  const [activeMystery, setActiveMystery] = useState<MysteryData | null>(null);

  // Referencias mutables para evitar re-montar el bucle de renderizado por cambios de estado
  const currentModeRef = useRef(currentMode);
  const isActiveRef = useRef(isActive);
  const activeMysteryRef = useRef(activeMystery);
  const accentColorRef = useRef(accentColor);

  // Sincronización limpia de referencias
  useEffect(() => { currentModeRef.current = currentMode; }, [currentMode]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { activeMysteryRef.current = activeMystery; }, [activeMystery]);
  useEffect(() => { accentColorRef.current = accentColor; }, [accentColor]);

  const mousePos = useRef({ x: 0, y: 0 });
  const smoothedStar = useRef({ x: 0, y: 0 });
  const starRotation = useRef(0);
  const resonanceTick = useRef(0);
  
  const particles = useRef<Particle[]>([]);
  const novas = useRef<Nova[]>([]);
  const sparks = useRef<Spark[]>([]);
  const burstActiveTick = useRef(0);

  const holograms = useRef<HologramText[]>([]);
  const activePhysicsMode = useRef<string>("NONE");
  const physicsModeTick = useRef<number>(0);

  const holdStartTime = useRef<number>(0);
  const isHoldTriggered = useRef<boolean>(false);

  // Computación reactiva fluida calculada bajo demanda en el render
  const isFlashActive = physicsModeTick.current > 0 && activePhysicsMode.current !== "NONE" && physicsModeTick.current % 10 > 5;
  const activeColor = isActive ? '#ff00ff' : (isFlashActive ? '#ffffff' : accentColor);

  const getSubTitle = () => {
    if (activePhysicsMode.current !== "NONE") return `QUANTUM MUTATION: ${activePhysicsMode.current}`;
    if (isActive) return "QUANTUM SINGULARITY BREACHED (HOLD 3S FOR THE ORACLE)";
    if (currentMode === 'Normal') return "NEURAL OBSERVATION ACTIVE";
    if (currentMode === 'Entanglement') return "STARKNET PROTOCOL: CONNECTING NODES";
    if (currentMode === 'Resonance') return "SACRED GEOMETRY: MANDALA MODE";
    return "NEBULA ENGINE: STANDBY";
  };

  // Reseed optimizado con limpieza de velocidades residuales
  const reseedParticles = (mode: string) => {
    setCurrentMode(mode);
    if (typeof window !== 'undefined' && particles.current.length > 0) {
      particles.current.forEach(p => {
        p.x = Math.random() * window.innerWidth;
        p.y = Math.random() * window.innerHeight;
        p.vx = (Math.random() - 0.5) * 1.5;
        p.vy = (Math.random() - 0.5) * 1.5;
      });
    }
  };

  const cosmicBurst = async () => {
    burstActiveTick.current = 120;
    
    if (novas.current.length < 3) {
      novas.current.push({
        x: smoothedStar.current.x, y: smoothedStar.current.y, 
        vx: 0, vy: 0, life: 1.5, color: '#ffffff', size: 300 
      });
    }

    particles.current.forEach(p => {
      const angle = Math.random() * Math.PI * 2;
      const force = 15 + Math.random() * 20;
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;
    });

    // Definimos la constante base dinámicamente usando la variable de entorno
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cosmic-imagination.com';

    try {
      // 1. Cambiada la ruta a template literal con la base dinámica
      const response = await fetch(`${BASE_API_URL}/api/v1/cosmic-hologram`);
      if (response.ok) {
        const data = await response.json();
        if (holograms.current.length < 5) {
          holograms.current.push({
            text: data.text, x: smoothedStar.current.x, y: smoothedStar.current.y, life: 1.0
          });
        }
        activePhysicsMode.current = data.physics_mode;
        physicsModeTick.current = data.duration;
      }
    } catch (e) {
      if (holograms.current.length < 2) {
        holograms.current.push({
          text: "E = mc²", x: smoothedStar.current.x, y: smoothedStar.current.y, life: 1.0
        });
      }
    }
  };

  const triggerDeepMystery = async () => {
    // Definimos la constante base aquí también para asegurar el alcance global en la función
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cosmic-imagination.com';

    try {
      // 2. Cambiada la ruta del misterio cósmico para usar la variable de entorno
      const response = await fetch(`${BASE_API_URL}/api/v1/cosmic-mystery`);
      if (response.ok) {
        const data = await response.json();
        setActiveMystery(data);
        return;
      }
    } catch (e) {
      console.log("Using local scientific matrix fallback.");
    }
    const randomQuote = SCIENTIFIC_QUOTES[Math.floor(Math.random() * SCIENTIFIC_QUOTES.length)];
    setActiveMystery(randomQuote);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      smoothedStar.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
  }, []);

  // Loop de renderizado con dependencias estáticas (Renderizado Líquido sin interrupciones)
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    if (particles.current.length === 0) {
      for (let i = 0; i < 200; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
          energy: Math.random() * 2.5 + 1.0 
        });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') { 
        e.preventDefault(); 
        if (!activeMysteryRef.current) cosmicBurst(); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let animationFrameId: number;
    
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      // Lecturas estables mediante referencias continuas
      const mode = currentModeRef.current;
      const active = isActiveRef.current;
      const mystery = activeMysteryRef.current;
      const accent = accentColorRef.current;
      const currentActiveColor = active ? '#ff00ff' : (isFlashActive ? '#ffffff' : accent);

      if (activePhysicsMode.current === "GRAVITATIONAL_COLLAPSE" && physicsModeTick.current > 0) {
        ctx.fillStyle = 'rgba(0, 0, 2, 0.5)';
      } else {
        ctx.fillStyle = active ? 'rgba(0, 2, 12, 0.3)' : 'rgba(0, 4, 15, 0.25)';
      }
      ctx.fillRect(0, 0, w, h);

      if (active && !isHoldTriggered.current && Date.now() - holdStartTime.current >= 3000) {
        isHoldTriggered.current = true;
        setIsActive(false);
        triggerDeepMystery();
      }

      if (!mystery) {
        starRotation.current += active ? 0.15 : 0.02;
        resonanceTick.current += 0.015;
        smoothedStar.current.x += (mousePos.current.x - smoothedStar.current.x) * 0.08;
        smoothedStar.current.y += (mousePos.current.y - smoothedStar.current.y) * 0.08;
      }

      // 1. SPARKS
      if (active && Math.random() > 0.7 && !mystery && sparks.current.length < 30) {
        sparks.current.push({
          x: smoothedStar.current.x, y: smoothedStar.current.y,
          vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12, life: 1.0
        });
      }
      for (let i = sparks.current.length - 1; i >= 0; i--) {
        const s = sparks.current[i];
        s.x += s.vx; s.y += s.vy; s.life -= 0.04;
        if (s.life <= 0) {
          sparks.current.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }

      const pList = particles.current;
      const range = mode === 'Resonance' ? 130 : (mode === 'Entanglement' ? 220 : 90);
      const rangeSq = range * range;
      
      const step = mode === 'Resonance' ? 8 : 14; 
      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];
        for (let j = i + 1; j < pList.length; j += step) {
            const p2 = pList[j];
            if (activePhysicsMode.current === "QUANTUM_MIRROR" && physicsModeTick.current > 0) {
              p2.x = w - p.x; p2.y = p.y;
            }

            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const d2 = dx*dx + dy*dy;
            
            if (d2 < rangeSq) {
              const alpha = (1 - d2 / rangeSq);
              ctx.strokeStyle = currentActiveColor;
              ctx.globalAlpha = alpha * (mode === 'Resonance' ? 0.7 : 0.35);
              ctx.lineWidth = mode === 'Resonance' ? 2.0 : 1.2; 
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        }
      }
      ctx.globalAlpha = 1;

      // 2. PARTICLES UPDATE
      pList.forEach((p, i) => {
        if (!mystery) {
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.08;

          if (activePhysicsMode.current === "EXPANSION_FORCE" && physicsModeTick.current > 0) {
            const dx = p.x - smoothedStar.current.x; const dy = p.y - smoothedStar.current.y;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            p.vx += (dx / dist) * 1.5; p.vy += (dy / dist) * 1.5;
          }
          else if (activePhysicsMode.current === "GRAVITATIONAL_COLLAPSE" && physicsModeTick.current > 0) {
            const dx = smoothedStar.current.x - p.x; const dy = smoothedStar.current.y - p.y;
            p.vx += dx * 0.012; p.vy += dy * 0.012;
          }
          else if (activePhysicsMode.current === "CHAOS_DRIFT" && physicsModeTick.current > 0) {
            p.vx += (Math.random() - 0.5) * 2.5; p.vy += (Math.random() - 0.5) * 2.5;
          }

          if (mode === 'Gravity') {
            p.vx += (w/2 - p.x) * 0.0008; p.vy += (h/2 - p.y) * 0.0008;
          } else if (mode === 'Resonance') {
            const numPetals = 6; const pIndex = i % numPetals; const layer = Math.floor(i / 35); 
            const baseAngle = (pIndex * (Math.PI * 2) / numPetals) + resonanceTick.current * 0.15;
            const pulse = Math.sin(resonanceTick.current + (layer * 0.4)) * 35;
            const radius = (layer * 45) + 90 + pulse; 
            const tx = smoothedStar.current.x + Math.cos(baseAngle) * radius;
            const ty = smoothedStar.current.y + Math.sin(baseAngle) * radius;
            p.vx += (tx - p.x) * 0.1; p.vy += (ty - p.y) * 0.1;
            p.vx *= 0.9; p.vy *= 0.9;
          }

          if (burstActiveTick.current <= 0 && activePhysicsMode.current !== "GRAVITATIONAL_COLLAPSE") {
              const dx = smoothedStar.current.x - p.x; const dy = smoothedStar.current.y - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const pull = active ? 0.08 : 0.004;
              if (dist < 500) {
                p.vx += dx * pull * (1 - dist/500); p.vy += dy * pull * (1 - dist/500);
              }
          }

          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.93; p.vy *= 0.93; 
        }

        if (p.x < -30) p.x = w + 30; if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30; if (p.y > h + 30) p.y = -30;

        ctx.fillStyle = currentActiveColor;
        ctx.beginPath();
        const s = active ? p.energy * 2.2 : p.energy * 1.3;
        ctx.arc(p.x, p.y, s, 0, Math.PI*2);
        ctx.fill();
      });

      if (burstActiveTick.current > 0) burstActiveTick.current--;

      if (physicsModeTick.current > 0) {
        physicsModeTick.current--;
        if (physicsModeTick.current === 0) activePhysicsMode.current = "NONE";
      }

      // 3. NOVAS
      for (let i = novas.current.length - 1; i >= 0; i--) {
        const n = novas.current[i];
        n.life -= 0.02;
        if (n.life <= 0) {
          novas.current.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = "rgba(255, 255, 255, " + n.life + ")"; 
        ctx.lineWidth = 2 * n.life;
        ctx.beginPath(); ctx.arc(n.x, n.y, (1.5 - n.life) * n.size, 0, Math.PI * 2); ctx.stroke();
      }

      // 4. HOLOGRAMS
      for (let i = holograms.current.length - 1; i >= 0; i--) {
        const h = holograms.current[i];
        h.life -= 0.01; 
        if (h.life <= 0) {
          holograms.current.splice(i, 1);
          continue;
        }
        
        ctx.save(); ctx.font = "bold 10px monospace";
        ctx.fillStyle = `rgba(255, 255, 255, ${h.life * 0.75})`;
        ctx.shadowBlur = 8; ctx.shadowColor = accent;
        
        const words = h.text.split(" "); let currentRadius = (1.0 - h.life) * 200;
        words.forEach((word, wIdx) => {
          const angle = wIdx * 0.4 + starRotation.current * 0.4;
          const tx = h.x + Math.cos(angle) * (currentRadius + wIdx * 6);
          const ty = h.y + Math.sin(angle) * (currentRadius + wIdx * 6);
          ctx.save(); ctx.translate(tx, ty); ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(word, 0, 0); ctx.restore();
        });
        ctx.restore();
      }

      const drawStar = (cx:number, cy:number, spikes:number, out:number, inn:number) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(starRotation.current);
        ctx.beginPath(); let rot = Math.PI/2*3; let step = Math.PI/spikes;
        ctx.moveTo(0, -out);
        for(let i=0; i<spikes; i++){
          ctx.lineTo(Math.cos(rot)*out, Math.sin(rot)*out); rot+=step;
          ctx.lineTo(Math.cos(rot)*inn, Math.sin(rot)*inn); rot+=step;
        }
        ctx.closePath(); ctx.fillStyle = currentActiveColor;
        ctx.shadowBlur = 25; ctx.shadowColor = currentActiveColor;
        ctx.fill(); ctx.restore();
      };

      const starSizeBonus = active ? (Date.now() - holdStartTime.current) * 0.004 : 0;
      drawStar(smoothedStar.current.x, smoothedStar.current.y, 5, active?28+starSizeBonus:20, active?14+starSizeBonus/2:9);

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array de dependencias vacío asegurando una sola ejecución nativa permanente

  const handlePressStart = (clientX: number, clientY: number) => {
    if (activeMystery) return; 
    setIsActive(true);
    isHoldTriggered.current = false;
    holdStartTime.current = Date.now();
    mousePos.current = { x: clientX, y: clientY };
  };

  const handlePressEnd = () => {
    if (activeMystery) return;
    setIsActive(false);

    const duration = Date.now() - holdStartTime.current;
    if (duration < 3000 && !isHoldTriggered.current) {
      cosmicBurst();
    }
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-[#00020a] overflow-hidden select-none md:cursor-none">
      
      {/* Top Status Indicators */}
      <div className="absolute top-[40px] md:top-[120px] left-6 md:left-10 z-20 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-black tracking-[0.4em] text-white uppercase transition-all duration-700"
            style={{ textShadow: `0 0 30px ${activeColor}` }}>
          DIVINE FLOW: <span style={{ color: activeColor }}>
            {isActive ? 'SINGULARITY' : currentMode.toUpperCase()}
          </span>
        </h1>
        <p className="text-white/30 text-[9px] md:text-[10px] mt-2 tracking-[0.5em] md:tracking-[0.6em] uppercase font-bold">
          {getSubTitle()}
        </p>
        
        <p className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-neutral-500 uppercase mt-4 max-w-[280px] md:max-w-none leading-relaxed animate-pulse">
          // Press <span className="text-white border border-neutral-700 px-1.5 rounded text-[7px] bg-neutral-900">SPACE</span> or <span className="text-cyan-400">TAP</span> for text spiral. <span className="text-purple-400">HOLD 3 SECONDS</span> to unlock cosmic wisdom transmissions.
        </p>
      </div>

      {/* Intelligent Unified Canvas */}
      <canvas 
        ref={canvasRef} 
        onMouseDown={(e) => handlePressStart(e.clientX, e.clientY)} 
        onMouseUp={handlePressEnd} 
        onMouseMove={(e) => { if(!activeMystery) mousePos.current = { x: e.clientX, y: e.clientY } }}
        onTouchStart={(e) => { if (e.touches[0]) handlePressStart(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={(e) => { if (e.touches[0] && !activeMystery) mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={handlePressEnd}
        className="w-full h-full block touch-none" 
      />

      {/* THE ORACLE MODAL */}
      {activeMystery && (
        <div 
          className="absolute inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-6 transition-all duration-300"
          onMouseDown={(e) => e.stopPropagation()} 
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="bg-neutral-950 border border-white/10 p-8 rounded-[2rem] max-w-md w-full text-center shadow-[0_0_80px_rgba(0,243,255,0.12)] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            
            <span className="text-[8px] font-mono tracking-[0.4em] text-cyan-400 uppercase">// Intellectual Frequency Transmission</span>
            <h2 className="text-xl font-black text-white tracking-widest uppercase mt-3 mb-4">
              {activeMystery.title}
            </h2>
            <p className="text-neutral-300 text-xs font-mono leading-relaxed text-center italic mb-6 bg-neutral-900/40 p-5 rounded-xl border border-white/5">
              "{activeMystery.content}"
            </p>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveMystery(null);
              }}
              className="w-full py-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[9px] font-bold text-cyan-400 tracking-widest uppercase hover:bg-cyan-500 hover:text-black transition-all cursor-pointer dynamic-click-target"
            >
              Terminate Frequency Link
            </button>
          </div>
        </div>
      )}

      {/* Mode Control Panel */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-black/80 backdrop-blur-3xl border border-white/10 p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,1)] transition-all max-w-[90%] md:max-w-none">
        <div className="grid grid-cols-2 sm:flex gap-2 md:gap-4 w-full md:w-auto">
          {['Normal', 'Entanglement', 'Gravity', 'Resonance'].map((m) => (
            <button key={m} onClick={() => reseedParticles(m)}
              className={`px-4 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                currentMode === m ? 'bg-white/20 text-white border-2' : 'text-white/30 hover:text-white'
              }`}
              style={{ borderColor: currentMode === m ? (isActive ? '#ff00ff' : accentColor) : 'transparent' }}>
              {m}
            </button>
          ))}
        </div>
        <div className="hidden md:block h-10 w-[1px] bg-white/20" />
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-[8px] font-mono text-neutral-500 uppercase md:hidden">// Accent:</span>
          <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} 
                 className="w-8 h-8 md:w-10 md:h-10 bg-transparent cursor-pointer rounded-full border-none p-0 overflow-hidden" />
        </div>
      </div>
    </main>
  );
}