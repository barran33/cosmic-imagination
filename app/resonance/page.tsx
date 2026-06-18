'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Volume2, Waves, ChevronLeft, ChevronRight, Settings, X } from 'lucide-react';

// ==========================================
// MODO SETTINGS
// ==========================================
const MODE_SETTINGS = {
  focus: { speed:2.4, color:'#ffffff', secondaryColor:'#00f5ff', accentColor:'#bf00ff', blurAlpha:0.20, label:'Beta · Tesla 3-6-9 Vortex' },
  relax: { speed:0.8, color:'#00ffaa', secondaryColor:'#00f5ff', accentColor:'#0040ff', blurAlpha:0.11, label:'Alpha · Quantum Liquid Lotus' },
  sleep: { speed:0.22, color:'#ff00a8', secondaryColor:'#00f5ff', accentColor:'#7700ff', blurAlpha:0.05, label:'Delta · Golden Nebula Breath' },
};

// ==========================================
// MANDALA SHAPES
// ==========================================
const MANDALA_SHAPES = [
  { id:'lotus',     label:'Loto',       desc:'Bézier Orgánico',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 20 C14 10 8 8 8 14 C8 20 14 22 20 20Z"/><path d="M20 20 C26 10 32 8 32 14 C32 20 26 22 20 20Z"/><path d="M20 20 C10 14 8 8 14 8 C20 8 22 14 20 20Z"/><path d="M20 20 C30 14 32 8 26 8 C20 8 18 14 20 20Z"/><path d="M20 20 C10 26 8 32 14 32 C20 32 22 26 20 20Z"/><path d="M20 20 C30 26 32 32 26 32 C20 32 18 26 20 20Z"/><circle cx="20" cy="20" r="2.5"/></svg>` },
  { id:'fibonacci', label:'Fibonacci',  desc:'Espiral Áurea',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 20 Q20 8 32 8 Q32 20 20 20Z"/><path d="M20 20 Q32 20 32 32 Q20 32 20 20Z"/><path d="M20 20 Q20 32 8 32 Q8 20 20 20Z"/><path d="M20 20 Q8 20 8 8 Q20 8 20 20Z"/><circle cx="20" cy="20" r="1.5"/></svg>` },
  { id:'sri',       label:'Sri Yantra', desc:'Geometría Sagrada',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="20,6 34,30 6,30"/><polygon points="20,34 34,10 6,10"/><circle cx="20" cy="20" r="12" stroke-width="0.8"/><circle cx="20" cy="20" r="6" stroke-width="0.8"/><circle cx="20" cy="20" r="2"/></svg>` },
  { id:'lissajous', label:'Lissajous',  desc:'Curvas Armónicas',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 20 C8 10 16 10 20 20 C24 30 32 30 32 20 C32 10 24 10 20 20 C16 30 8 30 8 20Z"/><ellipse cx="20" cy="20" rx="12" ry="5" stroke-width="0.8" transform="rotate(45 20 20)"/></svg>` },
  { id:'chladni',   label:'Chladni',    desc:'Patrones Nodales',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 8 C26 14 32 14 32 20 C32 26 26 26 20 32 C14 26 8 26 8 20 C8 14 14 14 20 8Z"/><path d="M20 12 C24 16 28 16 28 20 C28 24 24 24 20 28 C16 24 12 24 12 20 C12 16 16 16 20 12Z"/><circle cx="20" cy="20" r="3"/></svg>` },
  { id:'vortex',    label:'Vórtice',    desc:'Fractal Tesla 3-6-9',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 20 Q28 8 32 14 Q36 20 28 26 Q20 32 12 28 Q4 24 8 16 Q12 8 20 10 Q28 12 30 20"/><circle cx="20" cy="20" r="2"/></svg>` },
  { id:'rose',      label:'Rosa Polar', desc:'Rhodonea',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 20 L32 20 A12 12 0 0 1 26 30.4Z"/><path d="M20 20 L26 30.4 A12 12 0 0 1 14 30.4Z"/><path d="M20 20 L14 30.4 A12 12 0 0 1 8 20Z"/><path d="M20 20 L8 20 A12 12 0 0 1 14 9.6Z"/><path d="M20 20 L14 9.6 A12 12 0 0 1 26 9.6Z"/><path d="M20 20 L26 9.6 A12 12 0 0 1 32 20Z"/><circle cx="20" cy="20" r="2"/></svg>` },
  { id:'quantum',   label:'Cuántica',   desc:'Orbital Atómico',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="20" cy="20" rx="14" ry="5"/><ellipse cx="20" cy="20" rx="14" ry="5" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="14" ry="5" transform="rotate(120 20 20)"/><circle cx="20" cy="20" r="2.5"/></svg>` },
  { id:'metatron',  label:'Metatron',   desc:'Cubo Sagrado',
    icon:`<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="20" cy="20" r="12"/><circle cx="20" cy="8" r="4"/><circle cx="20" cy="32" r="4"/><circle cx="9.6" cy="14" r="4"/><circle cx="30.4" cy="14" r="4"/><circle cx="9.6" cy="26" r="4"/><circle cx="30.4" cy="26" r="4"/><line x1="20" y1="8" x2="9.6" y2="26"/><line x1="20" y1="8" x2="30.4" y2="26"/><line x1="20" y1="32" x2="9.6" y2="14"/><line x1="20" y1="32" x2="30.4" y2="14"/></svg>` },
] as const;
type ShapeId = typeof MANDALA_SHAPES[number]['id'];

// ==========================================
// GENRE PARAMS — parámetros editables por género
// ==========================================
interface GenreParams {
  bpm: number;           // 60–180
  swing: number;         // 0–1 (shuffle feel)
  bassGain: number;      // 0–1
  melodyGain: number;    // 0–1
  reverbDecay: number;   // 0–1
  complexity: number;    // 0–1 (densidad de notas)
  rootNote: number;      // Hz de nota fundamental
  scale: 'minor' | 'major' | 'pentatonic' | 'blues' | 'dorian' | 'chromatic';
}

const DEFAULT_GENRE_PARAMS: Record<string, GenreParams> = {
  jazz: {
    bpm: 132, swing: 0.72, bassGain: 0.50, melodyGain: 0.55,
    reverbDecay: 0.42, complexity: 0.75, rootNote: 146.83, scale: 'dorian',
  },
  blues: {
    bpm: 96, swing: 0.68, bassGain: 0.70, melodyGain: 0.60,
    reverbDecay: 0.28, complexity: 0.55, rootNote: 82.41, scale: 'blues',
  },
  boombap: {
    bpm: 90, swing: 0.58, bassGain: 0.80, melodyGain: 0.40,
    reverbDecay: 0.62, complexity: 0.45, rootNote: 110.00, scale: 'minor',
  },
  reggae: {
    bpm: 80, swing: 0.20, bassGain: 0.75, melodyGain: 0.35,
    reverbDecay: 0.50, complexity: 0.35, rootNote: 98.00, scale: 'major',
  },
  ambient: {
    bpm: 60, swing: 0.05, bassGain: 0.30, melodyGain: 0.65,
    reverbDecay: 0.88, complexity: 0.60, rootNote: 130.81, scale: 'major',
  },
  lofi: {
    bpm: 76, swing: 0.48, bassGain: 0.55, melodyGain: 0.60,
    reverbDecay: 0.55, complexity: 0.50, rootNote: 261.63, scale: 'minor',
  },
};

const MUSIC_GENRES = [
  { id:'jazz',    label:'Magic-Jazz',          desc:'',       color:'#f5a623', emoji:'🎷' },
  { id:'blues',   label:'Rock-Blues',         desc:'',       color:'#4a90e2', emoji:'🎸' },
  { id:'boombap', label:'Dark-BoomBap',  desc:'',        color:'#9b59b6', emoji:'🎤' },
  { id:'reggae',  label:'Dubstep-Reggae',        desc:'',       color:'#27ae60', emoji:'🌿' },
  { id:'ambient', label:'Lofi-Ambient',       desc:'',      color:'#00f5ff', emoji:'🌌' },
  { id:'lofi',    label:'Samurai-BoomBap',         desc:'',       color:'#e74c3c', emoji:'☕' },
] as const;
type GenreId = typeof MUSIC_GENRES[number]['id'];

interface SmoothAudio { bass:number; mids:number; highs:number; energy:number; kick:number; }

// ==========================================
// SCALE BUILDER
// ==========================================
function buildScale(root: number, type: GenreParams['scale']): number[] {
  const intervals: Record<GenreParams['scale'], number[]> = {
    major:      [0,2,4,5,7,9,11,12],
    minor:      [0,2,3,5,7,8,10,12],
    dorian:     [0,2,3,5,7,9,10,12],
    blues:      [0,3,5,6,7,10,12,15],
    pentatonic: [0,3,5,7,10,12,15,17],
    chromatic:  [0,1,2,3,4,5,6,7,8,9,10,11,12],
  };
  return intervals[type].map(i => root * Math.pow(2, i/12));
}

// ==========================================
// MELODIC ENGINE — reconstruido por género
// ==========================================
class MelodicEngine {
  ctx: AudioContext;
  analyser: AnalyserNode;
  master: GainNode;
  compressor: DynamicsCompressorNode;
  nodes: AudioNode[] = [];
  params: GenreParams;
  
  // Control estricto de los samples en reproducción actual
  activeTracks: AudioBufferSourceNode[] = [];

  constructor(ctx: AudioContext, analyser: AnalyserNode, params: GenreParams) {
    this.ctx = ctx;
    this.analyser = analyser;
    this.params = params;
    
    // Mantenemos la compresión de masterización para amalgamar los samples reales
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -14;
    this.compressor.knee.value = 6;
    this.compressor.ratio.value = 3.5;
    this.compressor.attack.value = 0.005;
    this.compressor.release.value = 0.12;
    this.compressor.connect(analyser);
    
    this.master = ctx.createGain();
    this.master.gain.value = 0.7; // Ganancia inicial base para samples estéreo
    this.master.connect(this.compressor);
  }

  // ==========================================
  // NÚCLEO DE CARGA Y CONTROL DE AUDIO REAL
  // ==========================================
  
  // Detiene inmediatamente cualquier sample que se esté ejecutando en bucle
  stopAllTracks() {
    if (this.activeTracks && this.activeTracks.length > 0) {
      this.activeTracks.forEach(source => {
        try {
          source.stop(0);
          source.disconnect();
        } catch (_) {
          // Ignorar si el buffer ya había sido liberado
        }
      });
      this.activeTracks = [];
    }
  }

  // Descarga y decodifica el archivo binario de audio desde la carpeta pública o CDN
  async loadAudioSample(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.ctx.decodeAudioData(arrayBuffer);
  }

  // Generador de Reverb Convolver dinámico para darle espacio tridimensional a tus samples
  createReverb(): ConvolverNode {
    const sr = this.ctx.sampleRate;
    const len = sr * (0.5 + this.params.reverbDecay * 3.5);
    const buf = this.ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.2 + this.params.reverbDecay * 2);
      }
    }
    const conv = this.ctx.createConvolver();
    conv.buffer = buf;
    this.nodes.push(conv);
    return conv;
  }

  // Filtro utilitario por si deseas recortar frecuencias graves/agudas en tiempo real
  createFilter(type: BiquadFilterType, freq: number, q = 1): BiquadFilterNode {
    const f = this.ctx.createBiquadFilter();
    f.type = type; 
    f.frequency.value = freq; 
    f.Q.value = q;
    this.nodes.push(f); 
    return f;
  }

  // Método centralizado para inicializar y conectar un loop real al entorno de efectos
  private async setupAndPlaySample(url: string, reverbIntensity: number) {
    // 1. Matar hilos previos
    this.stopAllTracks();

    // 2. Cargar el archivo de audio real
    const audioBuffer = await this.loadAudioSample(url);
    
    // 3. Instanciar el nodo fuente
    const source = this.ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true; // Loop infinito del groove

    // 4. Cadena de efectos e inserción de Reverb espacial
    const rev = this.createReverb();
    const revG = this.ctx.createGain();
    revG.gain.value = reverbIntensity * this.params.reverbDecay;
    
    rev.connect(revG);
    revG.connect(this.master);
    this.nodes.push(revG);

    // 5. Conexiones físicas del flujo de señal
    source.connect(this.master); 
    source.connect(rev);       

    // 6. Play
    source.start(0);
    
    // 7. Registrar en el stack de control tracker
    this.activeTracks.push(source);
  }

  // ==========================================
  // PISTAS DE GÉNEROS UNA POR UNA (Pistas Reales)
  // ==========================================
  
  async playJazz() {
    try {
      // Reemplaza con la ruta real de tu sample de Jazz descargado
      await this.setupAndPlaySample('/samples/Second_and_Third.mp3', 0.35);
    } catch (e) {
      console.error("Error cargando sample de Jazz:", e);
    }
  }

  async playBlues() {
    try {
      // Reemplaza con la ruta real de tu sample de Blues descargado
      await this.setupAndPlaySample('/samples/Velvet_Gasoline.mp3', 0.28);
    } catch (e) {
      console.error("Error cargando sample de Blues:", e);
    }
  }

  async playBoomBap() {
    try {
      // Reemplaza con la ruta real de tu sample de BoomBap oscuro descargado
      await this.setupAndPlaySample('/samples/darkboom.mp3', 0.45);
    } catch (e) {
      console.error("Error cargando sample de BoomBap:", e);
    }
  }

  async playReggae() {
    try {
      await this.setupAndPlaySample('/samples/Thunder_on_the_Tin.mp3', 0.42);
    } catch (e) {
      console.error("Error cargando sample de Reggae:", e);
    }
  }

  async playAmbient() {
    try {
      // Reemplaza con la ruta real de tu sample de Ambient/Atmósfera descargado
      await this.setupAndPlaySample('/samples/Orbit_After_Midnight.mp3', 0.80);
    } catch (e) {
      console.error("Error cargando sample de Ambient:", e);
    }
  }

  async playLofi() {
    try {
      // Reemplaza con la ruta real de tu sample de Lo-Fi de vinilo descargado
      await this.setupAndPlaySample('/samples/Samurai_Wind.mp3', 0.50);
    } catch (e) {
      console.error("Error cargando sample de Lo-Fi:", e);
    }
  }

  // ==========================================
  // APAGADO ABSOLUTO DEL MOTOR
  // ==========================================
  stop() {
    // Apaga buffers de audio real activos
    this.stopAllTracks(); 
    
    // Desconecta nodos volátiles colgados en memoria
    this.nodes.forEach(n => { 
      try { 
        (n as any).stop?.(); 
        n.disconnect(); 
      } catch (_) {} 
    });
    this.nodes = [];
    
    // Desconexiones master de seguridad
    try { this.master.disconnect(); } catch (_) {}
    try { this.compressor.disconnect(); } catch (_) {}
  }
}
// ==========================================
// DRAWERS (igual que antes, sin cambios)
// ==========================================
interface SmoothAudio { bass:number; mids:number; highs:number; energy:number; kick:number; }
type Cfg = typeof MODE_SETTINGS['relax'];

function drawLotus(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  for(let l=1;l<=7;l++){
    ctx2.beginPath(); ctx2.strokeStyle=l%2===0?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(2.2-l*0.18)*(1+s.bass*1.8);
    const petals=8+l*2, rot=t*0.22*(l%2===0?1:-1);
    const base=l*22+s.bass*55, len=base+30+s.mids*120, w=0.3+s.highs*0.9;
    for(let i=0;i<=petals;i++){
      const a=(i*2*Math.PI)/petals+rot, na=((i+1)*2*Math.PI)/petals+rot;
      const x1=cx+Math.cos(a)*base,y1=cy+Math.sin(a)*base;
      const x2=cx+Math.cos(na)*base,y2=cy+Math.sin(na)*base;
      const cp1x=cx+Math.cos(a+w)*len,cp1y=cy+Math.sin(a+w)*len;
      const cp2x=cx+Math.cos(na-w)*len,cp2y=cy+Math.sin(na-w)*len;
      if(i===0)ctx2.moveTo(x1,y1); ctx2.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,y2);
    }
    ctx2.stroke();
  }
}
function drawFibonacci(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const phi=1.6180339887;
  [0,Math.PI].forEach((off,idx)=>{
    ctx2.beginPath(); ctx2.strokeStyle=idx===0?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(idx===0?1.6:1.1)*(1+s.bass*1.5);
    for(let i=0;i<700;i++){
      const r=Math.pow(phi,i/55)*1.7*(1+s.bass*0.9); if(r>225)break;
      const a=i*0.2+t*0.35+off, x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
      if(i===0)ctx2.moveTo(x,y); else ctx2.lineTo(x,y);
    } ctx2.stroke();
  });
  let fa=1,fb=1;
  for(let k=0;k<9;k++){
    const r=(fa/89)*185*(1+s.energy*0.9);
    ctx2.beginPath(); ctx2.strokeStyle=k%2===0?cfg.accentColor:cfg.secondaryColor;
    ctx2.globalAlpha=0.25+s.bass*0.4; ctx2.lineWidth=0.8+s.bass;
    ctx2.arc(cx,cy,r,0,Math.PI*2); ctx2.stroke(); ctx2.globalAlpha=1;
    const tmp=fa+fb; fa=fb; fb=tmp;
  }
}
function drawSriYantra(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  for(let l=0;l<9;l++){
    const r=16+l*22+s.bass*60, rot=t*0.18*(l%2===0?1:-1)+l*Math.PI/9, pts=l%2===0?3:4;
    ctx2.beginPath(); ctx2.strokeStyle=l<5?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(1.4+s.highs*1.2)*(1+s.kick*0.8);
    for(let i=0;i<=pts;i++){
      const a=(i*2*Math.PI)/pts+rot, x=cx+Math.cos(a)*r*(1+s.mids*0.7), y=cy+Math.sin(a)*r*(1+s.mids*0.7);
      if(i===0)ctx2.moveTo(x,y); else ctx2.lineTo(x,y);
    }
    ctx2.closePath(); ctx2.stroke();
    ctx2.beginPath(); ctx2.strokeStyle=cfg.accentColor;
    ctx2.globalAlpha=0.15+l*0.04+s.energy*0.4; ctx2.lineWidth=0.6;
    ctx2.arc(cx,cy,r,0,Math.PI*2); ctx2.stroke(); ctx2.globalAlpha=1;
  }
}
function drawLissajous(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const ratios:[number,number][]=[[3,2],[5,4],[7,6],[2,3]];
  ratios.forEach(([rx,ry],idx)=>{
    ctx2.beginPath(); ctx2.strokeStyle=idx%2===0?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(1.2+s.highs*1.5)*(1+s.kick*0.5);
    const A=200*(1+s.bass*0.8)*(1-idx*0.1), B=185*(1+s.mids*0.8)*(1-idx*0.1);
    const phase=t*0.55+idx*0.5+s.energy*2.5;
    for(let i=0;i<=600;i++){
      const u=(i/600)*2*Math.PI, x=cx+A*Math.sin(rx*u+phase), y=cy+B*Math.sin(ry*u);
      if(i===0)ctx2.moveTo(x,y); else ctx2.lineTo(x,y);
    } ctx2.stroke();
  });
}
function drawChladni(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const m=Math.round(2+s.bass*5), n=Math.round(3+s.mids*5), sc=200*(1+s.energy*0.5);
  ctx2.strokeStyle=cfg.color; ctx2.lineWidth=1+s.bass; ctx2.beginPath();
  for(let i=0;i<1500;i++){
    const u=(i/1500)*Math.PI*2, v=(i/1500)*Math.PI*4;
    const val=Math.cos(m*Math.PI*Math.cos(u+t*0.25))*Math.cos(n*Math.PI*Math.cos(v+t*0.18));
    if(Math.abs(val)<0.12+s.highs*0.1){
      ctx2.lineTo(cx+Math.cos(u)*sc*(1+val*s.bass*2.5), cy+Math.sin(v)*sc*(1+val*s.mids*2.5));
    }
  }
  ctx2.stroke();
}
function drawVortex(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  for(let a=0;a<9;a++){
    const ba=(a/9)*2*Math.PI;
    ctx2.beginPath();
    ctx2.strokeStyle=a%3===0?cfg.color:a%3===1?cfg.secondaryColor:cfg.accentColor;
    ctx2.lineWidth=(1.5+s.bass*3)*(1+s.kick*0.6);
    for(let i=0;i<240;i++){
      const r=i*(1+s.bass*0.9); if(r>230)break;
      const angle=ba+i*0.06*(1+s.mids*0.7)+t*(1.2+s.highs*0.8);
      const x=cx+Math.cos(angle)*r, y=cy+Math.sin(angle)*r;
      if(i===0)ctx2.moveTo(x,y); else ctx2.lineTo(x,y);
    } ctx2.stroke();
  }
  [1,2,3].forEach(k=>{
    ctx2.beginPath(); ctx2.strokeStyle=cfg.secondaryColor;
    ctx2.setLineDash([8,13]); ctx2.lineWidth=0.7+s.energy;
    ctx2.arc(cx,cy,k*70*(1+s.bass*0.6),0,Math.PI*2); ctx2.stroke(); ctx2.setLineDash([]);
  });
}
function drawRosePolar(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const k=3+Math.round(s.mids*4), R=205*(1+s.bass*0.7);
  [0,Math.PI/k].forEach((offset,idx)=>{
    ctx2.beginPath(); ctx2.strokeStyle=idx===0?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(idx===0?1.5:1.0)*(1+s.bass*1.2);
    for(let i=0;i<=1600;i++){
      const theta=(i/1600)*4*Math.PI+offset;
      const r=R*(idx===0?1:0.65)*Math.cos(k*theta+t*0.35)*Math.sin(theta*0.5+t*0.12+s.mids*1.5);
      ctx2.lineTo(cx+r*Math.cos(theta), cy+r*Math.sin(theta));
    } ctx2.stroke();
  });
}
function drawQuantum(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const n=3+Math.round(s.bass*4), l=1+Math.round(s.mids*3);
  for(let layer=1;layer<=4;layer++){
    ctx2.beginPath(); ctx2.strokeStyle=layer%2===0?cfg.color:cfg.secondaryColor;
    ctx2.lineWidth=(1.2+s.kick*1.5)*(1+s.bass*0.5);
    for(let i=0;i<=1000;i++){
      const theta=(i/1000)*2*Math.PI*n, phi=theta*l+t*(0.2+s.highs*0.45);
      const r0=36*layer*(1+s.bass*0.8), psi=Math.cos(phi)*Math.sin(theta*0.5);
      const r=r0*(1+psi*0.8*(1+s.mids*1.5));
      ctx2.lineTo(cx+r*Math.cos(theta+t*0.12*layer), cy+r*Math.sin(theta+t*0.12*layer));
    } ctx2.stroke();
  }
}
function drawMetatron(ctx2:CanvasRenderingContext2D,cx:number,cy:number,t:number,s:SmoothAudio,cfg:Cfg){
  const R=90*(1+s.bass*0.8);
  const centers:number[][]=[[0,0]];
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3+t*0.08;
    centers.push([Math.cos(a)*R*0.6, Math.sin(a)*R*0.6]);
  }
  centers.forEach(([ox,oy])=>{
    ctx2.beginPath(); ctx2.strokeStyle=cfg.secondaryColor;
    ctx2.globalAlpha=0.3+s.energy*0.5; ctx2.lineWidth=0.8+s.bass*0.8;
    ctx2.arc(cx+ox,cy+oy,R*0.6*(1+s.mids*0.4),0,Math.PI*2); ctx2.stroke(); ctx2.globalAlpha=1;
  });
  for(let i=1;i<centers.length;i++) for(let j=i+1;j<centers.length;j++){
    ctx2.beginPath(); ctx2.strokeStyle=cfg.color;
    ctx2.globalAlpha=0.15+s.highs*0.4; ctx2.lineWidth=0.6+s.kick;
    ctx2.moveTo(cx+centers[i][0],cy+centers[i][1]); ctx2.lineTo(cx+centers[j][0],cy+centers[j][1]);
    ctx2.stroke(); ctx2.globalAlpha=1;
  }
  for(let layer=1;layer<=3;layer++){
    ctx2.beginPath(); ctx2.strokeStyle=layer%2===0?cfg.accentColor:cfg.color;
    ctx2.lineWidth=(1+s.bass*1.5)*(1+s.kick*0.5);
    const pts=6*layer, rot=t*0.12*(layer%2===0?1:-1), r=R*(0.6+layer*0.35)*(1+s.mids*0.35);
    for(let i=0;i<=pts;i++){
      const a=(i*2*Math.PI)/pts+rot;
      if(i===0)ctx2.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);
      else ctx2.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);
    } ctx2.closePath(); ctx2.stroke();
  }
}

const DRAWERS: Record<ShapeId, Function> = {
  lotus:drawLotus, fibonacci:drawFibonacci, sri:drawSriYantra, lissajous:drawLissajous,
  chladni:drawChladni, vortex:drawVortex, rose:drawRosePolar, quantum:drawQuantum, metatron:drawMetatron,
};

// ==========================================
// PARAM EDITOR PANEL
// ==========================================
const PARAM_LABELS: Record<keyof GenreParams, string> = {
  bpm: 'BPM', swing: 'Swing', bassGain: 'Bass', melodyGain: 'Melodía',
  reverbDecay: 'Reverb', complexity: 'Densidad', rootNote: 'Nota Raíz (Hz)',
  scale: 'Escala',
};
const SCALE_OPTIONS: GenreParams['scale'][] = ['minor','major','pentatonic','blues','dorian','chromatic'];

function ParamEditor({
  genre, params, onUpdate, onClose, color,
}: {
  genre: string; params: GenreParams; onUpdate: (p: GenreParams) => void; onClose: () => void; color: string;
}) {
  const sliders: (keyof GenreParams)[] = ['bpm','swing','bassGain','melodyGain','reverbDecay','complexity','rootNote'];
  const ranges: Record<string, [number,number,number]> = {
    bpm:[50,200,1], swing:[0,1,0.01], bassGain:[0,1,0.01], melodyGain:[0,1,0.01],
    reverbDecay:[0,1,0.01], complexity:[0,1,0.01], rootNote:[55,440,0.5],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5 space-y-4" style={{ background:'#05050d', border:`1px solid ${color}33` }}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest" style={{ color }}>
            ⚙ Editar · {genre}
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {sliders.map(key => {
            const [min,max,step] = ranges[key];
            const val = params[key] as number;
            return (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500">{PARAM_LABELS[key]}</span>
                  <span className="text-[9px] font-mono" style={{ color }}>{val.toFixed(step < 1 ? 2 : 0)}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={val}
                  onChange={e => onUpdate({ ...params, [key]: parseFloat(e.target.value) })}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: color, background:`linear-gradient(to right, ${color} ${((val-min)/(max-min))*100}%, #1a1a2a ${((val-min)/(max-min))*100}%)` }} />
              </div>
            );
          })}
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1.5">{PARAM_LABELS.scale}</span>
            <div className="flex flex-wrap gap-1.5">
              {SCALE_OPTIONS.map(s => (
                <button key={s} onClick={() => onUpdate({ ...params, scale: s })}
                  className="px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-wider border transition-all"
                  style={{
                    background: params.scale === s ? `${color}22` : 'transparent',
                    borderColor: params.scale === s ? color : '#222',
                    color: params.scale === s ? color : '#444',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[8px] text-gray-700 font-mono text-center">Los cambios se aplican al reiniciar el género</p>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function CosmicSymphony() {
  const [isPlaying, setIsPlaying]         = useState(false);
  const [currentMode, setCurrentMode]     = useState<keyof typeof MODE_SETTINGS>('relax');
  const [currentShape, setCurrentShape]   = useState<ShapeId>('lotus');
  const [currentGenre, setCurrentGenre]   = useState<GenreId | null>(null);
  const [carouselIdx, setCarouselIdx]     = useState(0);
  const [audioFile, setAudioFile]         = useState<File | null>(null);
  const [stellarScore, setStellarScore]   = useState(93.76);
  const [fileIsPlaying, setFileIsPlaying] = useState(false);
  const [editingGenre, setEditingGenre]   = useState<GenreId | null>(null);
  const [genreParams, setGenreParams]     = useState<Record<string, GenreParams>>({ ...DEFAULT_GENRE_PARAMS });

  const canvasRef     = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef  = useRef<HTMLInputElement | null>(null);
  const animRef       = useRef<number | null>(null);
  const timeRef       = useRef(0);
  const smoothRef     = useRef<SmoothAudio>({ bass:0, mids:0, highs:0, energy:0, kick:0 });
  const audioCtxRef   = useRef<AudioContext | null>(null);
  const analyserRef   = useRef<AnalyserNode | null>(null);
  const engineRef     = useRef<MelodicEngine | null>(null);
  const fileElRef     = useRef<HTMLAudioElement | null>(null);
  const fileSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const modeRef  = useRef(currentMode);
  const shapeRef = useRef(currentShape);
  const playRef  = useRef(isPlaying);
  useEffect(() => { modeRef.current  = currentMode; }, [currentMode]);
  useEffect(() => { shapeRef.current = currentShape; }, [currentShape]);
  useEffect(() => { playRef.current  = isPlaying; }, [isPlaying]);

  const visibleCount = 3;
  const shapeCount = MANDALA_SHAPES.length;
  const carouselPrev = () => setCarouselIdx(i => (i-1+shapeCount)%shapeCount);
  const carouselNext = () => setCarouselIdx(i => (i+1)%shapeCount);
  const getVisibleShapes = () => {
    const v = [];
    for (let i = 0; i < visibleCount; i++) v.push(MANDALA_SHAPES[(carouselIdx+i)%shapeCount]);
    return v;
  };

  const ensureCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx() as AudioContext;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.75;
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx; analyserRef.current = analyser;
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return { ctx: audioCtxRef.current, analyser: analyserRef.current! };
  }, []);

  const stopEngine = () => { engineRef.current?.stop(); engineRef.current = null; };
  const stopFileAudio = () => {
    if (fileElRef.current) { fileElRef.current.pause(); fileElRef.current.src = ''; }
    try { fileSourceRef.current?.disconnect(); } catch (_) {}
    fileElRef.current = null; fileSourceRef.current = null; setFileIsPlaying(false);
  };
  const stopAll = () => {
    stopEngine(); stopFileAudio(); setIsPlaying(false); setCurrentGenre(null);
  };

  const playGenre = (id: GenreId) => {
    stopAll();
    const { ctx, analyser } = ensureCtx();
    const params = genreParams[id];
    const engine = new MelodicEngine(ctx, analyser, params);
    engineRef.current = engine;
    const map: Record<GenreId, () => void> = {
      jazz: () => engine.playJazz(), blues: () => engine.playBlues(),
      boombap: () => engine.playBoomBap(), reggae: () => engine.playReggae(),
      ambient: () => engine.playAmbient(), lofi: () => engine.playLofi(),
    };
    map[id]?.();
    setCurrentGenre(id); setIsPlaying(true);
    setStellarScore(parseFloat((85+Math.random()*14).toFixed(2)));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    stopAll(); setAudioFile(file);
    const { ctx, analyser } = ensureCtx();
    const el = new Audio();
    el.src = URL.createObjectURL(file); el.crossOrigin = 'anonymous';
    fileElRef.current = el;
    el.addEventListener('ended', () => { setFileIsPlaying(false); setIsPlaying(false); });
    const source = ctx.createMediaElementSource(el);
    source.connect(analyser); fileSourceRef.current = source;
    el.play().then(() => { setFileIsPlaying(true); setIsPlaying(true); setStellarScore(parseFloat((85+Math.random()*14).toFixed(2))); })
      .catch(err => console.error(err));
  };

  const toggleFilePlayback = async () => {
    if (!fileElRef.current) return;
    if (fileIsPlaying) {
      fileElRef.current.pause(); setFileIsPlaying(false); setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') await audioCtxRef.current.resume();
      await fileElRef.current.play(); setFileIsPlaying(true); setIsPlaying(true);
    }
  };

  const readAudio = (): SmoothAudio => {
    if (!analyserRef.current) return { bass:0,mids:0,highs:0,energy:0,kick:0 };
    const buf = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(buf);
    let b=0,m=0,hi=0,kick=0;
    for(let i=0;i<5;i++) kick+=buf[i]; kick/=5;
    for(let i=0;i<25;i++) b+=buf[i]; b/=25;
    for(let i=25;i<180;i++) m+=buf[i]; m/=155;
    for(let i=180;i<350;i++) hi+=buf[i]; hi/=170;
    return { bass:b/255, mids:m/255, highs:hi/255, energy:(b+m+hi)/(3*255), kick:kick/255 };
  };

  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const W=canvas.width, H=canvas.height, cx=W/2, cy=H/2;
    const cfg = MODE_SETTINGS[modeRef.current];

    let raw: SmoothAudio = { bass:0,mids:0,highs:0,energy:0,kick:0 };
    if (analyserRef.current && playRef.current) raw = readAudio();
    else {
      const idle = Math.sin(timeRef.current*1.4)*0.05+0.03;
      raw = { bass:idle, mids:idle*0.6, highs:idle*0.3, energy:idle*0.5, kick:0 };
    }
    const ease = 0.09;
    const sm = smoothRef.current;
    sm.bass   += (raw.bass   - sm.bass)   * ease;
    sm.mids   += (raw.mids   - sm.mids)   * ease;
    sm.highs  += (raw.highs  - sm.highs)  * ease;
    sm.energy += (raw.energy - sm.energy) * ease;
    sm.kick   += (raw.kick   - sm.kick)   * 0.3;

    timeRef.current += 0.007 * cfg.speed + sm.highs * 0.018;
    const t = timeRef.current;

    ctx.fillStyle = `rgba(0,0,5,${cfg.blurAlpha})`; ctx.fillRect(0,0,W,H);
    ctx.shadowBlur = 8+sm.bass*35; ctx.shadowColor = cfg.secondaryColor;
    const drawer = DRAWERS[shapeRef.current];
    if (drawer) drawer(ctx, cx, cy, t, sm, cfg);

    ctx.shadowBlur = 15+sm.kick*60+sm.bass*45; ctx.shadowColor = cfg.color;
    const coreR = 4+sm.bass*22+sm.kick*18;
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,coreR);
    grad.addColorStop(0,'#ffffff'); grad.addColorStop(0.4,cfg.color); grad.addColorStop(1,'transparent');
    ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(cx,cy,coreR,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    animRef.current = requestAnimationFrame(renderLoop);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) { const ctx = canvas.getContext('2d'); if(ctx){ctx.fillStyle='#000005';ctx.fillRect(0,0,canvas.width,canvas.height);} }
    animRef.current = requestAnimationFrame(renderLoop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [renderLoop]);

  useEffect(() => () => stopAll(), []);

  const config = MODE_SETTINGS[currentMode];
  const visibleShapes = getVisibleShapes();
  const activeGenreData = MUSIC_GENRES.find(g => g.id === currentGenre);
  const editingGenreData = editingGenre ? MUSIC_GENRES.find(g => g.id === editingGenre) : null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#000005] text-white p-3 md:p-6 font-sans w-full overflow-x-hidden">
      <input type="file" ref={fileInputRef} accept="audio/*" onChange={handleFileChange} className="hidden" />

      {/* PARAM EDITOR */}
      {editingGenre && editingGenreData && (
        <ParamEditor
          genre={editingGenreData.label}
          params={genreParams[editingGenre]}
          color={editingGenreData.color}
          onUpdate={p => setGenreParams(prev => ({ ...prev, [editingGenre]: p }))}
          onClose={() => setEditingGenre(null)}
        />
      )}

      {/* HEADER */}
      <header className="text-center mb-4 max-w-full">
        <p className="text-[9px] text-cyan-100 text-neon-glow-css  tracking-[0.35em] uppercase mb-1.5">🎵Module 1 · Music of the Spheres</p>
        <h1 className="text-lg md:text-2xl font-black uppercase tracking-wider"
          style={{ background:`linear-gradient(90deg,${config.color},${config.secondaryColor},${config.accentColor})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          Cosmic Symphony · Cymatics
        </h1>
      </header>

      {/* MODOS */}
      <div className="flex gap-2 mb-5">
        {(['focus','relax','sleep'] as const).map(m => (
          <button key={m} onClick={() => setCurrentMode(m)}
            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border ${currentMode===m?'text-black':'bg-transparent text-gray-500 border-gray-800 hover:text-white hover:border-gray-600'}`}
            style={currentMode===m?{ background:MODE_SETTINGS[m].color, borderColor:MODE_SETTINGS[m].color, boxShadow:`0 0 18px ${MODE_SETTINGS[m].color}55` }:{}}>
            {m}
          </button>
        ))}
      </div>

      {/* CAROUSEL */}
      <div className="w-full max-w-[420px] mb-5 px-1">
        <p className="text-[8px] text-gray-700 tracking-[0.2em] uppercase text-center mb-2 font-mono">— Sacred Geometry —</p>
        <div className="flex items-center gap-2">
          <button onClick={carouselPrev} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 grid grid-cols-3 gap-2">
            {visibleShapes.map((shape, idx) => {
              const isActive = shape.id === currentShape;
              const isCenter = idx === 1;
              return (
                <button key={shape.id} onClick={() => setCurrentShape(shape.id)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200"
                  style={{
                    background: isActive ? `${config.accentColor}14` : '#050508',
                    borderColor: isActive ? config.accentColor : isCenter ? '#2a2a2a' : '#111',
                    boxShadow: isActive ? `0 0 16px ${config.accentColor}33` : 'none',
                    transform: isActive ? 'scale(1.04)' : isCenter ? 'scale(1.01)' : 'scale(0.97)',
                  }}>
                  <div className="w-10 h-10" style={{ color: isActive ? config.accentColor : '#444' }}
                    dangerouslySetInnerHTML={{ __html: shape.icon }} />
                  <span className="text-[8px] font-bold uppercase tracking-wider leading-none"
                    style={{ color: isActive ? config.accentColor : '#555' }}>{shape.label}</span>
                  <span className="text-[7px] text-center leading-none hidden sm:block"
                    style={{ color: isActive ? `${config.accentColor}99` : '#333' }}>{shape.desc}</span>
                </button>
              );
            })}
          </div>
          <button onClick={carouselNext} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center gap-1.5 mt-2.5">
          {MANDALA_SHAPES.map(s => (
            <button key={s.id}
              onClick={() => { setCurrentShape(s.id); setCarouselIdx(MANDALA_SHAPES.findIndex(sh=>sh.id===s.id)); }}
              className="transition-all rounded-full"
              style={{ width:s.id===currentShape?'16px':'5px', height:'5px', background:s.id===currentShape?config.accentColor:'#222' }} />
          ))}
        </div>
      </div>

      {/* LABEL */}
      <div className="w-full max-w-[340px] md:max-w-[420px] flex justify-between items-center px-1 mb-2 font-mono text-[8px]">
        <span className="tracking-widest flex items-center gap-1.5 uppercase" style={{ color:config.color }}>
          <Volume2 className="w-3 h-3" /> {config.label}
        </span>
        <span className="text-gray-600 italic truncate max-w-[160px]">
          {audioFile ? audioFile.name : activeGenreData ? `${activeGenreData.emoji} ${activeGenreData.label}` : 'Sin pista cargada'}
        </span>
      </div>

      {/* CANVAS */}
      <div className="w-full max-w-xl flex justify-center mb-3 px-1">
        <div className="group relative rounded-full flex items-center justify-center p-2 w-full aspect-square max-w-[320px] md:max-w-[400px] overflow-hidden"
          style={{ background:'#000008', border:`1px solid ${config.secondaryColor}18`, boxShadow:`0 0 50px ${config.color}0c, 0 0 100px ${config.secondaryColor}07` }}>
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full rounded-full" />
          {audioFile && !currentGenre && (
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none rounded-full transition-all duration-300 ${fileIsPlaying?'bg-black/0 group-hover:bg-black/40':'bg-black/20'}`}>
              <button onClick={toggleFilePlayback}
                className={`p-4 rounded-full border pointer-events-auto transition-all backdrop-blur-sm ${fileIsPlaying?'opacity-0 group-hover:opacity-100 hover:scale-105':'opacity-100 hover:scale-105'}`}
                style={{ color:config.color, borderColor:config.color, background:'rgba(0,0,5,0.7)', boxShadow:`0 0 20px ${config.color}44` }}>
                {fileIsPlaying ? <span className="text-xl">⏸</span> : <span className="text-xl">▶</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STATUS */}
      <div className="w-full max-w-[340px] md:max-w-[420px] text-center mb-5 font-mono text-[8px] tracking-[0.28em] uppercase transition-all duration-500"
        style={{ color:isPlaying?config.secondaryColor:'#1a2a2a' }}>
        {isPlaying ? '◈ Analizando Espectro...' : '◌ '}
      </div>

      {/* CONTROLES */}
      <div className="w-full max-w-[420px] space-y-4 px-1">
        <button onClick={() => fileInputRef.current?.click()}
          className="w-full py-3 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group"
          style={{ background:'#050508', border:`1px solid ${config.secondaryColor}25`, color:config.secondaryColor }}
          onMouseEnter={e=>(e.currentTarget.style.borderColor=config.secondaryColor)}
          onMouseLeave={e=>(e.currentTarget.style.borderColor=`${config.secondaryColor}25`)}>
          <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          {audioFile ? 'Cambiar Pista Musical' : 'Add the Sound!'}
        </button>

        {/* GÉNEROS */}
        <div>
          <p className="text-[8px] text-white tracking-[0.2em] uppercase text-neon-glow-css  text-center mb-2.5 font-mono">— Instrumental Tracks —</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MUSIC_GENRES.map(g => {
              const active = currentGenre === g.id && isPlaying;
              return (
                <div key={g.id} className="relative group/card">
                  <button
                    onClick={() => { if(active) stopAll(); else playGenre(g.id as GenreId); }}
                    className="w-full p-3 rounded-xl text-left transition-all relative overflow-hidden"
                    style={{
                      background: active ? `${g.color}12` : '#050508',
                      border: `1px solid ${active ? g.color : '#111'}`,
                      boxShadow: active ? `0 0 15px ${g.color}28` : 'none',
                    }}>
                    {active && <span className="absolute top-1.5 right-6 text-[7px] font-mono animate-pulse" style={{ color:g.color }}>▶</span>}
                    <span className="block text-base mb-0.5">{g.emoji}</span>
                    <span className="block text-[11px] font-black font-mono mb-0.5" style={{ color:active?g.color:'#ccc' }}>{g.label}</span>
                    <span className="block text-[8px] uppercase tracking-wider" style={{ color:active?`${g.color}cc`:'#333' }}>{g.desc}</span>
                  </button>
                  {/* Settings button */}
                  <button
                    onClick={e => { e.stopPropagation(); setEditingGenre(g.id as GenreId); }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded opacity-0 group-hover/card:opacity-100 transition-opacity"
                    style={{ background:`${g.color}22`, color:g.color }}
                    title="Editar parámetros">
                    <Settings className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
          {isPlaying && (
            <button onClick={stopAll} className="mt-2 w-full py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border border-red-900/40 text-red-500/60 hover:border-red-500 hover:text-red-400">
              ◼ Stop Music!
            </button>
          )}
        </div>

        {/* INFO BOX */}
        <div className="p-3 rounded-xl space-y-2" style={{ background:'rgba(0,0,5,0.7)', border:'1px solid #0d0d0d' }}>
          <p className="text-[10px] text-gray-600 leading-relaxed">
            Estado:{' '}<span style={{ color:'#00ffaa', fontWeight:700 }}>✓ Modo {currentMode.charAt(0).toUpperCase()+currentMode.slice(1)}</span>
            {' '}· Score:{' '}<span className="text-white font-mono font-bold">{stellarScore}</span>
            {' '}· Forma:{' '}<span style={{ color:config.accentColor }}>{MANDALA_SHAPES.find(s=>s.id===currentShape)?.desc}</span>
          </p>
          <div style={{ height:1, background:'#111' }} />
          <p className="text-[9px] font-mono tracking-wide flex items-center gap-1.5"
            style={{ color:config.color, animation:isPlaying?'pulse 2s infinite':'none' }}>
            <Waves className="w-3 h-3" />
            {isPlaying ? `${activeGenreData?.emoji ?? ''} Generating Harmonic Patterns · ${activeGenreData?.label ?? ''}...` : 'Select a track or Upload an Audio File.'}
          </p>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
    </div>
  );
}