"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number; energy: number;
}
interface Nova { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; }

export default function DivineFlowPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [accentColor, setAccentColor] = useState('#00f3ff');
  const [currentMode, setCurrentMode] = useState('Normal');
  
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothedStar = useRef({ x: 0, y: 0 });
  const starRotation = useRef(0);
  const resonanceTick = useRef(0);
  
  const particles = useRef<Particle[]>([]);
  const novas = useRef<Nova[]>([]);
  const sparks = useRef<Spark[]>([]);
  const burstActiveTick = useRef(0);

  const getSubTitle = () => {
    if (isActive) return "QUANTUM SINGULARITY BREACHED";
    if (currentMode === 'Normal') return "NEURAL OBSERVATION ACTIVE";
    if (currentMode === 'Entanglement') return "STARKNET PROTOCOL: CONNECTING NODES";
    if (currentMode === 'Resonance') return "SACRED GEOMETRY: MANDALA MODE";
    return "NEBULA ENGINE: STANDBY";
  };

  const cosmicBurst = () => {
    burstActiveTick.current = 120;
    novas.current.push({
      x: smoothedStar.current.x, y: smoothedStar.current.y, 
      vx: 0, vy: 0, life: 1.5, color: '#ffffff', size: 300 
    });

    particles.current.forEach(p => {
      const angle = Math.random() * Math.PI * 2;
      const force = 25 + Math.random() * 35; 
      p.vx = Math.cos(angle) * force;
      p.vy = Math.sin(angle) * force;
    });
  };

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
      for (let i = 0; i < 250; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
          energy: Math.random() * 3 + 1.2 
        });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); cosmicBurst(); }
    };
    window.addEventListener('keydown', handleKeyDown);

    let animationFrameId: number;
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = isActive ? 'rgba(0, 2, 12, 0.3)' : 'rgba(0, 4, 15, 0.25)';
      ctx.fillRect(0, 0, w, h);

      starRotation.current += isActive ? 0.1 : 0.02;
      resonanceTick.current += 0.015;
      smoothedStar.current.x += (mousePos.current.x - smoothedStar.current.x) * 0.1;
      smoothedStar.current.y += (mousePos.current.y - smoothedStar.current.y) * 0.1;

      // Chispas Blancas
      if (isActive && Math.random() > 0.7) {
        sparks.current.push({
          x: smoothedStar.current.x, y: smoothedStar.current.y,
          vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15, life: 1.0
        });
      }
      sparks.current.forEach((s, i) => {
        s.x += s.vx; s.y += s.vy; s.life -= 0.03;
        if (s.life <= 0) sparks.current.splice(i, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2); ctx.fill();
      });

      const activeColor = isActive ? '#ff00ff' : accentColor;
      const pList = particles.current;

      // --- DIBUJO DE CONEXIONES 
      const range = currentMode === 'Resonance' ? 150 : (currentMode === 'Entanglement' ? 250 : 100);
      
      pList.forEach((p, i) => {
        
        const step = currentMode === 'Resonance' ? 6 : 12; 
        for (let j = i + 1; j < pList.length; j += step) {
            const p2 = pList[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const d2 = dx*dx + dy*dy;
            
            if (d2 < range * range) {
              const alpha = (1 - Math.sqrt(d2) / range);
              ctx.strokeStyle = activeColor;
              ctx.globalAlpha = alpha * (currentMode === 'Resonance' ? 0.9 : 0.4);
              ctx.lineWidth = currentMode === 'Resonance' ? 2.5 : 1.8; 
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
              ctx.globalAlpha = 1;
            }
        }
      });

      pList.forEach((p, i) => {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;

        if (currentMode === 'Gravity') {
          p.vx += (w/2 - p.x) * 0.001;
          p.vy += (h/2 - p.y) * 0.001;
        } else if (currentMode === 'Resonance') {
  // --- LÓGICA DE GEOMETRÍA SAGRADA (MANDALA / FLOR DE LA VIDA) ---
  
  //  Definimos la estructura: 6 pétalos principales (geometría de 60°)
          const numPetals = 6; 
          const pIndex = i % numPetals; 
          const layer = Math.floor(i / 40); 
          
          // Cálculo del ángulo con rotación constante
          const baseAngle = (pIndex * (Math.PI * 2) / numPetals) + resonanceTick.current * 0.2;
          
         
          const pulse = Math.sin(resonanceTick.current + (layer * 0.5)) * 40;
          const radius = (layer * 50) + 100 + pulse; 
          
          const tx = smoothedStar.current.x + Math.cos(baseAngle) * radius;
          const ty = smoothedStar.current.y + Math.sin(baseAngle) * radius;
          
         
          p.vx += (tx - p.x) * 0.12; 
          p.vy += (ty - p.y) * 0.12;
          
          
          p.vx *= 0.92;
          p.vy *= 0.92;
        }

        if (burstActiveTick.current <= 0) {
            const dx = smoothedStar.current.x - p.x;
            const dy = smoothedStar.current.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const pull = isActive ? 0.08 : 0.005; 
            if (dist < 600) {
              p.vx += dx * pull * (1 - dist/600);
              p.vy += dy * pull * (1 - dist/600);
            }
        }

        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94; 

        if (p.x < -50) p.x = w + 50; if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50; if (p.y > h + 50) p.y = -50;

        ctx.fillStyle = activeColor;
        ctx.beginPath();
        const s = isActive ? p.energy * 2.2 : p.energy * 1.5;
        ctx.arc(p.x, p.y, s, 0, Math.PI*2);
        ctx.fill();
      });

      if (burstActiveTick.current > 0) burstActiveTick.current--;

      novas.current.forEach((n, i) => {
        n.life -= 0.015;
        if(n.life <= 0) novas.current.splice(i, 1);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3 * n.life;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (1.5 - n.life) * n.size, 0, Math.PI * 2);
        ctx.stroke();
      });

      const drawStar = (cx:number, cy:number, spikes:number, out:number, inn:number) => {
        ctx.save();
        ctx.translate(cx, cy); ctx.rotate(starRotation.current);
        ctx.beginPath();
        let rot = Math.PI/2*3; let step = Math.PI/spikes;
        ctx.moveTo(0, -out);
        for(let i=0; i<spikes; i++){
          ctx.lineTo(Math.cos(rot)*out, Math.sin(rot)*out); rot+=step;
          ctx.lineTo(Math.cos(rot)*inn, Math.sin(rot)*inn); rot+=step;
        }
        ctx.closePath(); ctx.fillStyle = activeColor;
        ctx.shadowBlur = 30; ctx.shadowColor = activeColor;
        ctx.fill(); ctx.restore();
      };
      drawStar(smoothedStar.current.x, smoothedStar.current.y, 5, isActive?30:22, isActive?15:10);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, accentColor, currentMode]);

  return (
    <main className="fixed inset-0 w-full h-full bg-[#00020a] overflow-hidden select-none cursor-none">
      <div className="absolute top-[120px] left-10 z-20 pointer-events-none">
        <h1 className="text-2xl font-black tracking-[0.4em] text-white uppercase transition-all duration-700"
            style={{ textShadow: `0 0 30px ${isActive ? '#ff00ff' : accentColor}` }}>
          DIVINE FLOW: <span style={{ color: isActive ? '#ff00ff' : accentColor }}>
            {isActive ? 'SINGULARITY' : currentMode.toUpperCase()}
          </span>
        </h1>
        <p className="text-white/30 text-[10px] mt-2 tracking-[0.6em] uppercase font-bold">
          {getSubTitle()}
        </p>
      </div>

      <canvas 
        ref={canvasRef} 
        onMouseDown={() => setIsActive(true)} 
        onMouseUp={() => setIsActive(false)}
        onMouseMove={(e) => mousePos.current = { x: e.clientX, y: e.clientY }}
        className="w-full h-full block" 
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 bg-black/80 backdrop-blur-3xl border border-white/10 p-6 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,1)] transition-all hover:scale-105">
        <div className="flex gap-4">
          {['Normal', 'Entanglement', 'Gravity', 'Resonance'].map((m) => (
            <button key={m} onClick={() => setCurrentMode(m)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                currentMode === m ? 'bg-white/20 text-white border-2' : 'text-white/30 hover:text-white'
              }`}
              style={{ borderColor: currentMode === m ? (isActive ? '#ff00ff' : accentColor) : 'transparent' }}>
              {m}
            </button>
          ))}
        </div>
        <div className="h-10 w-[1px] bg-white/20" />
        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} 
               className="w-10 h-10 bg-transparent cursor-pointer rounded-full border-none p-0 overflow-hidden" />
      </div>
    </main>
  );
}

