'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  Sparkles, Download, Loader2, Wand2, Volume2, VolumeX,
  Gauge, Activity, Flame, Droplets, Compass, Wind,
} from 'lucide-react';

/* ============================================================
   1. TIPOS
   ============================================================ */

interface GeometryPoint {
  x: number;
  y: number;
}

interface VibrationalEntry {
  freq: number;
  pol: 1 | -1;
  el: string;
}

type VibeCategory = 'DARK_EMOTION' | 'FUN_EMOTION' | 'HARMONIC_LIGHT' | 'CHAOTIC_VOID' | 'SACRED_GEOMETRY';
type GeometryType = 'fractal_starburst' | 'rose_of_grandi' | 'fermat_spiral' | 'chaotic_glitch' | 'merkaba_matrix';

interface TransmutationResult {
  frequency: number;
  nodes: GeometryPoint[];
  elements: string[];
  archetype: string;
  status: string;
  glowColor: string;
  secondaryColor: string;
}

/* ============================================================
   2. MOTOR DE TRANSMUTACIÓN (100% cliente, sin backend)
   ============================================================ */

const VIBRATIONAL_DICT: Record<string, VibrationalEntry> = {
  miedo: { freq: 174, pol: -1, el: 'tierra' },
  magia: { freq: 369, pol: -1, el: 'eter' },
  caos: { freq: 396, pol: -1, el: 'fuego' },
  bloqueo: { freq: 417, pol: -1, el: 'agua' },
  amor: { freq: 528, pol: 1, el: 'eter' },
  abundancia: { freq: 639, pol: 1, el: 'aire' },
  creacion: { freq: 741, pol: 1, el: 'fuego' },
  conciencia: { freq: 852, pol: 1, el: 'eter' },
  iluminacion: { freq: 963, pol: 1, el: 'eter' },
};

const ARCHETYPE_LABELS: Record<GeometryType, string> = {
  fractal_starburst: 'Estallido Fractal',
  rose_of_grandi: 'Rosa de Grandi',
  fermat_spiral: 'Espiral de Fermat',
  chaotic_glitch: 'Glitch Cuántico',
  merkaba_matrix: 'Matriz Merkaba',
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function hashText(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h += text.charCodeAt(i) * (i + 1);
  return h;
}

function generateGeometry(type: GeometryType, freq: number, nodesCount: number): GeometryPoint[] {
  const cx = 150, cy = 150, phi = (1 + Math.sqrt(5)) / 2;
  const baseRadius = 75 + (freq % 30);
  const pts: GeometryPoint[] = [];

  if (type === 'fractal_starburst') {
    for (let i = 0; i < nodesCount; i++) {
      const angle = (i * 2 * Math.PI) / nodesCount;
      const r = baseRadius * (i % 2 === 0 ? 1.2 : 0.45) * (1 + 0.12 * Math.sin(i * phi + freq));
      pts.push({ x: round2(cx + r * Math.cos(angle)), y: round2(cy + r * Math.sin(angle)) });
    }
  } else if (type === 'rose_of_grandi') {
    const k = Math.max(3, Math.floor((freq % 5) + 3));
    for (let i = 0; i < nodesCount; i++) {
      const angle = (i * 2 * Math.PI) / nodesCount;
      const r = baseRadius * (Math.cos(k * angle) * 0.85 + 0.45);
      pts.push({ x: round2(cx + r * Math.cos(angle)), y: round2(cy + r * Math.sin(angle)) });
    }
  } else if (type === 'fermat_spiral') {
    for (let i = 0; i < nodesCount; i++) {
      const theta = i * ((2 * Math.PI) / nodesCount) * phi;
      let r = Math.sqrt(i + 1) * (baseRadius / Math.sqrt(nodesCount)) * 1.3;
      r = r * (1 + 0.15 * Math.sin(i * 2.0 + freq));
      pts.push({ x: round2(cx + r * Math.cos(theta)), y: round2(cy + r * Math.sin(theta)) });
    }
  } else if (type === 'chaotic_glitch') {
    for (let i = 0; i < nodesCount; i++) {
      const angle = (i * 2 * Math.PI) / nodesCount + Math.cos(freq + i) * 0.25;
      const r = baseRadius * (0.55 + 0.65 * Math.cos(i * phi + freq * 0.05));
      pts.push({ x: round2(cx + r * Math.cos(angle)), y: round2(cy + r * Math.sin(angle)) });
    }
  } else if (type === 'merkaba_matrix') {
    const layers = [0.45, 0.75, 1.1];
    const nodesPerLayer = Math.max(Math.floor(nodesCount / layers.length), 4);
    layers.forEach((scale, lIdx) => {
      const currentRadius = baseRadius * scale;
      const offset = (lIdx * Math.PI / nodesPerLayer) * phi;
      for (let i = 0; i < nodesPerLayer; i++) {
        const angle = (i * 2 * Math.PI) / nodesPerLayer + offset;
        const r = currentRadius * (1 + 0.08 * Math.cos(i * phi + freq));
        pts.push({ x: round2(cx + r * Math.cos(angle)), y: round2(cy + r * Math.sin(angle)) });
      }
    });
  }
  return pts;
}

function hslToHex(h: number, s: number, l: number): string {
  const q = (p: number, qq: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (qq - p) * 6 * t;
    if (t < 1 / 2) return qq;
    if (t < 2 / 3) return p + (qq - p) * (2 / 3 - t) * 6;
    return p;
  };
  const _q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const _p = 2 * l - _q;
  const toHex = (v: number): string => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0');
  return `#${toHex(q(_p, _q, h + 1 / 3))}${toHex(q(_p, _q, h))}${toHex(q(_p, _q, h - 1 / 3))}`;
}

function colorProfile(text: string, vibe: VibeCategory): [string, string] {
  const hash = hashText(text.toLowerCase());
  let hue: number, sat: number, light: number;
  if (vibe === 'DARK_EMOTION') {
    hue = (hash % 20) + (hash % 2 === 0 ? 340 : 0);
    sat = 90 + (hash % 11); light = 40 + (hash % 15);
  } else if (vibe === 'FUN_EMOTION') {
    hue = hash % 2 === 0 ? (hash % 60) + 180 : (hash % 40) + 40;
    sat = 95 + (hash % 6); light = 50 + (hash % 10);
  } else if (vibe === 'CHAOTIC_VOID') {
    hue = (hash % 50) + 270; sat = 85 + (hash % 15); light = 45 + (hash % 10);
  } else if (vibe === 'HARMONIC_LIGHT') {
    hue = (hash % 30) + 45; sat = 80 + (hash % 21); light = 75 + (hash % 15);
  } else {
    hue = (hash % 50) + 160; sat = 90 + (hash % 11); light = 50 + (hash % 10);
  }
  const primary = hslToHex(hue / 360, sat / 100, light / 100);
  const secondary = hslToHex(((hue / 360) + 0.15) % 1, sat / 100, Math.max(0.3, light / 100 - 0.1));
  return [primary, secondary];
}

function transmuteEnergy(text: string): TransmutationResult {
  const lower = text.toLowerCase();
  let freq = 432, nodes = 12, matched = 0;
  const elements: string[] = [];

  Object.entries(VIBRATIONAL_DICT).forEach(([word, data]) => {
    if (lower.includes(word)) {
      matched++;
      if (data.pol === -1) { freq += data.freq * 0.5; nodes += 4; }
      else { freq += data.freq; nodes += 6; }
      if (!elements.includes(data.el)) elements.push(data.el);
    }
  });

  if (matched === 0) {
    const hash = hashText(lower);
    freq = 432 + (hash % 531);
    nodes = 12 + (hash % 12);
  }

  nodes = Math.min(Math.max(nodes, 12), 36);
  if (nodes % 2 !== 0) nodes += 1;
  freq = Math.round(freq * 10) / 10;

  const darkKw = ['dolor', 'ira', 'miedo', 'muerte', 'tristeza', 'odio', 'caos', 'sufrimiento', 'oscuridad', 'bloqueo'];
  const funKw = ['magia', 'musica', 'baile', 'risa', 'fiesta', 'alegria', 'ritmo', 'flow', 'fuego'];
  const lightKw = ['amor', 'paz', 'luz', 'iluminacion', 'conciencia', 'abundancia', 'divino', 'creacion'];
  const voidKw = ['vacio', 'nada', 'abismo', 'quantum', 'singularidad', 'entropia'];

  let vibe: VibeCategory, geometryType: GeometryType, status: string;
  if (darkKw.some((k) => lower.includes(k))) {
    vibe = 'DARK_EMOTION'; geometryType = freq % 2 === 0 ? 'fractal_starburst' : 'chaotic_glitch';
    status = 'Calcinación: transmutando densidad en luz';
  } else if (funKw.some((k) => lower.includes(k))) {
    vibe = 'FUN_EMOTION'; geometryType = freq % 2 === 0 ? 'rose_of_grandi' : 'fractal_starburst';
    status = 'Ritmo cósmico elevando el pulso creativo';
  } else if (lightKw.some((k) => lower.includes(k))) {
    vibe = 'HARMONIC_LIGHT'; geometryType = 'fermat_spiral';
    status = 'Crisopeya pura: espectro áureo revelado';
  } else if (voidKw.some((k) => lower.includes(k))) {
    vibe = 'CHAOTIC_VOID'; geometryType = 'chaotic_glitch';
    status = 'Inversión espacio-tiempo en la matriz';
  } else {
    vibe = 'SACRED_GEOMETRY'; geometryType = 'merkaba_matrix';
    status = 'Estructuras vectoriales alineadas';
  }

  const nodesPoints = generateGeometry(geometryType, freq, nodes);
  const [glowColor, secondaryColor] = colorProfile(text, vibe);

  return {
    frequency: freq,
    nodes: nodesPoints,
    elements: elements.length ? elements : ['éter'],
    archetype: ARCHETYPE_LABELS[geometryType],
    status,
    glowColor,
    secondaryColor,
  };
}

function elementIcon(el: string): React.ReactNode {
  const style = { width: 11, height: 11, marginRight: 4 };
  
  switch (el) {
    case 'fuego': return <Flame style={{ ...style, color: '#f87171' }} />;
    case 'agua': return <Droplets style={{ ...style, color: '#60a5fa' }} />;
    case 'tierra': return <Compass style={{ ...style, color: '#34d399' }} />;
    case 'aire': return <Wind style={{ ...style, color: '#a5b4fc' }} />;
    default: return <Sparkles style={{ ...style, color: '#22d3ee' }} />;
  }
}

/* ============================================================
   3. RENDER DEL MANDALA (SVG interactivo)
   ============================================================ */

interface MandalaProps {
  result: TransmutationResult;
  glow: string;
  glow2: string;
  pulsed: number | null;
  onPulse: (i: number) => void;
}

function Mandala({ result, glow, glow2, pulsed, onPulse }: MandalaProps) {
  const nodes = result.nodes;
  const total = nodes.length;
  const freq = result.frequency;
  const step2 = Math.max(2, Math.floor((freq % 4) + 2));
  const step3 = Math.max(5, Math.floor(total / 2));

  return (
    <>
      {nodes.map((p, i) => {
        const p1 = nodes[(i + 1) % total];
        const p2 = nodes[(i + step2) % total];
        const p3 = nodes[(i + step3) % total];
        return (
          <g key={i}>
            {p1 && <line x1={p.x} y1={p.y} x2={p1.x} y2={p1.y} stroke={glow} strokeWidth="1.3" opacity="0.85" filter="url(#glow-heavy)" />}
            {p2 && (
              <line x1={p.x} y1={p.y} x2={p2.x} y2={p2.y} stroke={glow2} strokeWidth="0.8" opacity="0.55"
                strokeDasharray={freq % 2 === 0 ? 'none' : '4,3'} filter="url(#glow-light)" />
            )}
            {p3 && <line x1={p.x} y1={p.y} x2={p3.x} y2={p3.y} stroke={glow} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,6" />}
            {pulsed === i && (
              <circle cx={p.x} cy={p.y} r="4" fill="none" stroke={glow} strokeWidth="1" style={{ animation: 'ripple .6s ease-out forwards' }} />
            )}
            <circle
              cx={p.x} cy={p.y} r={i % 2 === 0 ? 3.2 : 1.8}
              fill="#fff" stroke={glow} strokeWidth="1.3" filter="url(#glow-heavy)"
              style={{ cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); onPulse(i); }}
            />
          </g>
        );
      })}
    </>
  );
}

/* ============================================================
   4. COMPONENTE PRINCIPAL
   ============================================================ */

export default function CosmicArchitect() {
  const [prompt, setPrompt] = useState<string>('');
  const [isChanneling, setIsChanneling] = useState<boolean>(false);
  const [result, setResult] = useState<TransmutationResult | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pulsed, setPulsed] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(
    () => Array.from({ length: 90 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
    })),
    []
  );

  const playChime = async (freq: number): Promise<void> => {
    try {
      // Se tipa como `any`: los tipos genéricos de Tone.js para PolySynth
      // son más estrictos de lo que necesitamos aquí para un simple acorde.
      const Tone: any = await import('tone');
      await Tone.start();
      const reverb = new Tone.Reverb({ decay: 3, wet: 0.4 }).toDestination();
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.4, decay: 0.3, sustain: 0.2, release: 1.8 },
      }).connect(reverb);
      const clamped = Math.max(180, Math.min(900, freq));
      synth.triggerAttackRelease([clamped, clamped * 1.5], '2n');
    } catch (e) {
      console.warn('Audio no disponible en este navegador.', e);
    }
  };

  const handleTransmute = (): void => {
    if (!prompt.trim()) return;
    setIsChanneling(true);
    setResult(null);
    window.setTimeout(() => {
      const output = transmuteEnergy(prompt);
      setResult(output);
      setIsChanneling(false);
      if (soundOn) void playChime(output.frequency);
    }, 750);
  };

  const handlePulse = (i: number): void => {
    setPulsed(i);
    window.setTimeout(() => setPulsed(null), 600);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x: rx, y: ry });
  };

  const telemetry = useMemo(() => {
    if (!result) return null;
    const nodes = result.nodes;
    let totalDist = 0, count = 0;
    for (let i = 0; i < Math.min(nodes.length, 10); i++) {
      for (let j = i + 1; j < Math.min(nodes.length, 10); j++) {
        totalDist += Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        count++;
      }
    }
    const avg = count ? totalDist / count : 100;
    const coherence = Math.min(99.8, Math.max(74.5, (avg % 25) + 75)).toFixed(1);
    const entropy = Math.min(0.95, Math.max(0.12, ((result.frequency * nodes.length) % 100) / 100)).toFixed(2);
    return { coherence, entropy };
  }, [result]);

  const downloadSVG = (): void => {
    if (!svgRef.current || !result) return;
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    clone.removeAttribute('class');
    clone.setAttribute('width', '800');
    clone.setAttribute('height', '800');
    clone.style.background = '#030303';
    const str = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic_${(prompt || 'blueprint').toLowerCase().replace(/[^a-z0-9]/g, '_')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const glow = result?.glowColor || '#22d3ee';
  const glow2 = result?.secondaryColor || '#818cf8';

  return (
    <div
      style={{
        position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, #0b1026 0%, #030303 60%)',
        color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: .2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes driftA { 0% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } 100% { transform: translate(0,0); } }
        @keyframes driftB { 0% { transform: translate(0,0); } 50% { transform: translate(-25px,25px); } 100% { transform: translate(0,0); } }
        @keyframes ripple { 0% { transform: scale(1); opacity: .9; } 100% { transform: scale(2.6); opacity: 0; } }
        @keyframes slowspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map((s) => (
          <div key={s.id} style={{
            position: 'absolute', top: `${s.top}%`, left: `${s.left}%`,
            width: s.size, height: s.size, borderRadius: '9999px', background: '#fff',
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>

      <div style={{
        position: 'absolute', width: 380, height: 380, top: '8%', left: '4%', borderRadius: '9999px',
        background: glow, opacity: 0.22, filter: 'blur(90px)', animation: 'driftA 14s ease-in-out infinite',
        transition: 'background 1s ease',
      }} />
      <div style={{
        position: 'absolute', width: 340, height: 340, bottom: '4%', right: '6%', borderRadius: '9999px',
        background: glow2, opacity: 0.16, filter: 'blur(90px)', animation: 'driftB 18s ease-in-out infinite',
        transition: 'background 1s ease',
      }} />

      <header style={{ textAlign: 'center', marginBottom: 24, position: 'relative', zIndex: 10 }}>
        <h1 style={{
          fontSize: 24, fontWeight: 900, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em',
          color: glow, textShadow: `0 0 18px ${glow}80`, transition: 'color .6s ease',
        }}>
          🌌 Cosmic Architect ✨
        </h1>
        <p style={{ fontSize: 11, color: '#71717a', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          Oráculo de Geometría Sagrada
        </p>
      </header>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', marginBottom: 24, perspective: 900 }}
      >
        <div style={{
          position: 'relative', width: 480, height: 420, maxWidth: '92vw',
          background: 'rgba(0,0,0,0.6)', borderRadius: 16, border: '1px solid #27272a',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
          backdropFilter: 'blur(4px)', boxShadow: `0 0 60px ${glow}25`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform .25s ease-out, box-shadow .6s ease',
        }}>
          {result && (
            <button
              onClick={downloadSVG}
              title="Descargar como SVG"
              style={{
                position: 'absolute', top: 12, right: 12, padding: 8, borderRadius: 8, zIndex: 20,
                background: 'rgba(0,0,0,0.7)', border: '1px solid #27272a', cursor: 'pointer',
              }}
            >
              <Download style={{ width: 14, height: 14, color: '#a1a1aa' }} />
            </button>
          )}

          {isChanneling ? (
            <div style={{ textAlign: 'center' }}>
              <Loader2 style={{ width: 32, height: 32, margin: '0 auto 12px', color: glow, animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', color: '#a1a1aa' }}>
                Canalizando frecuencia...
              </p>
            </div>
          ) : result ? (
            <svg ref={svgRef} viewBox="0 0 300 300" width="100%" height="100%" style={{ animation: 'slowspin 50s linear infinite' }}>
              <defs>
                <filter id="glow-heavy" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="b1" />
                  <feGaussianBlur stdDeviation="1.5" result="b2" />
                  <feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-light" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <circle cx="150" cy="150" r="140" fill="none" stroke={glow} strokeOpacity="0.15" strokeDasharray="2,6" />
              <g style={{ transformOrigin: '150px 150px', animation: 'orbit 22s linear infinite' }}>
                <circle cx="150" cy="10" r="2.6" fill={glow2} />
              </g>
              <g style={{ transformOrigin: '150px 150px', animation: 'orbit 32s linear infinite reverse' }}>
                <circle cx="150" cy="18" r="2" fill={glow} />
              </g>

              <Mandala result={result} glow={glow} glow2={glow2} pulsed={pulsed} onPulse={handlePulse} />
            </svg>
          ) : (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <Wand2 style={{ width: 30, height: 30, margin: '0 auto 12px', color: '#22d3ee' }} />
              <p style={{ fontSize: 11, color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', maxWidth: 260 }}>
                Escribe una palabra o intención para revelar su geometría
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          background: 'rgba(0,0,0,0.7)', border: '1px solid #27272a', borderRadius: 14, padding: 16, backdropFilter: 'blur(6px)',
        }}>
          <label style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: glow, transition: 'color .6s ease',
          }}>
            <Sparkles style={{ width: 14, height: 14 }} /> Descubre el patrón de tu intención
          </label>
          <textarea
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            disabled={isChanneling}
            rows={2}
            placeholder="Ej. amor, abundancia, caos y bloqueo..."
            style={{
              width: '100%', background: '#0a0a0a', color: '#cffafe', border: '1px solid #27272a',
              borderRadius: 10, padding: 12, fontSize: 14, outline: 'none', resize: 'none',
            }}
          />

          {result && (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12, padding: 12,
              background: 'rgba(0,0,0,0.4)', border: '1px solid #18181b', borderRadius: 10, fontSize: 10,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a', paddingRight: 8 }}>
                <span style={{ color: '#71717a', textTransform: 'uppercase' }}>Arquetipo</span>
                <span style={{ fontWeight: 600, color: glow, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.archetype}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a', padding: '0 8px' }}>
                <span style={{ color: '#71717a', textTransform: 'uppercase' }}>Resonancia</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{result.frequency} Hz</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 8 }}>
                <span style={{ color: '#71717a', textTransform: 'uppercase' }}>Elementos</span>
                <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontWeight: 600 }}>
                  {result.elements.map((el) => (
                    <span key={el} style={{ display: 'flex', alignItems: 'center', marginRight: 4 }}>
                      {elementIcon(el)}{el}
                    </span>
                  ))}
                </span>
              </div>

              {telemetry && (
                <div style={{
                  gridColumn: '1 / -1', borderTop: '1px solid #18181b', marginTop: 4, paddingTop: 8,
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Gauge style={{ width: 12, height: 12, color: '#818cf8' }} />
                    <span style={{ color: '#a1a1aa' }}>Golden Ratio: <b style={{ color: '#c7d2fe' }}>{telemetry.coherence}%</b></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Activity style={{ width: 12, height: 12, color: '#c084fc' }} />
                    <span style={{ color: '#a1a1aa' }}>Entropía: <b style={{ color: '#e9d5ff' }}>{telemetry.entropy}</b></span>
                  </div>
                </div>
              )}

              <div style={{
                gridColumn: '1 / -1', textAlign: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid #18181b',
                fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: glow,
              }}>
                {result.status}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleTransmute}
            disabled={!prompt.trim() || isChanneling}
            style={{
              flex: 1, padding: '12px 0', borderRadius: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.15em', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              border: 'none', cursor: (!prompt.trim() || isChanneling) ? 'not-allowed' : 'pointer',
              background: (!prompt.trim() || isChanneling) ? '#18181b' : `linear-gradient(90deg, ${glow}, ${glow2})`,
              color: (!prompt.trim() || isChanneling) ? '#52525b' : '#fff',
              transition: 'background .4s ease',
            }}
          >
            {isChanneling ? (
              <><Loader2 style={{ width: 15, height: 15, animation: 'spin 1s linear infinite' }} /> Transmutando...</>
            ) : (
              <><Sparkles style={{ width: 15, height: 15 }} /> Transmutar Energía</>
            )}
          </button>
          <button
            onClick={() => setSoundOn((s) => !s)}
            title={soundOn ? 'Silenciar' : 'Activar sonido'}
            style={{
              padding: '0 14px', borderRadius: 10, background: 'rgba(0,0,0,0.7)', border: '1px solid #27272a', cursor: 'pointer',
            }}
          >
            {soundOn ? <Volume2 style={{ width: 15, height: 15, color: '#a1a1aa' }} /> : <VolumeX style={{ width: 15, height: 15, color: '#52525b' }} />}
          </button>
        </div>
      </div>
    </div>
  );
}