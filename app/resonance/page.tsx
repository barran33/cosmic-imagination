'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Upload, Music, Volume2 } from 'lucide-react';

// ==========================================
// PALETA DE COLORES ALQUÍMICOS Y CONFIGURACIÓN CUÁNTICA
// ==========================================
const MODE_SETTINGS = {
    focus: { 
        speed: 1.8, 
        color: '#ffffff',       
        secondaryColor: '#01ebf7', 
        label: 'Beta Waves: Tesla 3-6-9 Vortex' 
    },
    relax: { 
        speed: 0.6, 
        color: '#00ffaa',       
        secondaryColor: '#0066ff', 
        label: 'Alpha Waves: Quantum Liquid Lotus' 
    },
    sleep: { 
        speed: 0.2, 
        color: '#ff007f',       
        secondaryColor: '#0bd3e9', 
        label: 'Delta Waves: Golden Nebula Breath' 
    }
};

export default function CosmicSymphony() {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMode, setCurrentMode] = useState<'focus' | 'relax' | 'sleep'>('relax');
    const [stellarScore, setStellarScore] = useState(93.76);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const timeRef = useRef(0);
    // Interpolación para fluidez (Evita movimientos forzados o robóticos)
    const smoothAudioRef = useRef({ bass: 0, mids: 0, highs: 0 });
    const config = MODE_SETTINGS[currentMode];

    const initAudioContext = (element: HTMLAudioElement) => {
        if (audioContextRef.current) return;
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512; // Mayor resolución espectral
        const source = ctx.createMediaElementSource(element);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        audioContextRef.current = ctx;
        analyserRef.current = analyser;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAudioFile(file);
            setIsPlaying(false);
            if (audioRef.current) {
                if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src);
                }
                audioRef.current.src = URL.createObjectURL(file);
                audioRef.current.load();
            }
            setStellarScore(parseFloat((85 + Math.random() * 14).toFixed(2)));
        }
    };

    const updateCymaticsLoop = () => {
        let rawBass = 0, rawMids = 0, rawHighs = 0;

        if (analyserRef.current && isPlaying) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            for (let i = 0; i < 15; i++) rawBass += dataArray[i]; rawBass /= 15;
            for (let i = 15; i < 100; i++) rawMids += dataArray[i]; rawMids /= 85;
            for (let i = 100; i < 200; i++) rawHighs += dataArray[i]; rawHighs /= 100;
        } else {
            // Latidos base cuando está inactivo
            rawBass = 30 + Math.sin(timeRef.current * 2) * 10;
            rawMids = 20;
            rawHighs = 10;
        }

        // LERPING (Linear Interpolation) - El secreto para el movimiento fluido y natural
        const ease = 0.08; // Qué tan rápido reacciona (menor = más líquido, mayor = más reactivo)
        smoothAudioRef.current.bass += (rawBass - smoothAudioRef.current.bass) * ease;
        smoothAudioRef.current.mids += (rawMids - smoothAudioRef.current.mids) * ease;
        smoothAudioRef.current.highs += (rawHighs - smoothAudioRef.current.highs) * ease;

        const { bass, mids, highs } = smoothAudioRef.current;
        const normBass = bass / 255;
        const normMids = mids / 255;
        const normHighs = highs / 255;

        timeRef.current += 0.01 * config.speed + (normHighs * 0.02); // Los agudos aceleran sutilmente el tiempo
        const t = timeRef.current;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const w = canvas.width;
                const h = canvas.height;
                const cx = w / 2;
                const cy = h / 2;
                
                // Motion Blur adaptativo según el modo
                const blurAlpha = currentMode === 'focus' ? 0.25 : currentMode === 'relax' ? 0.15 : 0.08;
                ctx.fillStyle = `rgba(3, 3, 3, ${blurAlpha})`;
                ctx.fillRect(0, 0, w, h);

                ctx.shadowBlur = 15 + (normBass * 20);
                ctx.shadowColor = config.secondaryColor;

                // ==========================================
                // MODO FOCUS: VÓRTICE TESLA 3-6-9 (Geometría afilada y reactiva)
                // ==========================================
                if (currentMode === 'focus') {
                    const instances = 3; // Múltiplo de 3
                    const points = 9; // Nonágono base
                    
                    for (let inst = 0; inst < instances; inst++) {
                        ctx.beginPath();
                        ctx.strokeStyle = inst % 2 === 0 ? config.color : config.secondaryColor;
                        ctx.lineWidth = 1.5 + normBass;

                        const radius = 40 + (inst * 45) + (normMids * 60);
                        const rotationOffset = t * (inst % 2 === 0 ? 1 : -1) * (1 + inst * 0.5);

                        for (let i = 0; i <= points * 2; i++) {
                            const angle = (i * Math.PI) / points + rotationOffset;
                            // Salto de vértices para crear estrellas agudas
                            const r = i % 2 === 0 ? radius + (normBass * 40) : radius * 0.4 - (normHighs * 20);
                            
                            const x = cx + Math.cos(angle) * r;
                            const y = cy + Math.sin(angle) * r;

                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.closePath();
                        ctx.stroke();
                    }

                    // Anillo energético interior cruzado
                    ctx.beginPath();
                    ctx.strokeStyle = config.secondaryColor;
                    ctx.arc(cx, cy, 25 + (normBass * 30), 0, Math.PI * 2);
                    ctx.setLineDash([10, 15]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                // ==========================================
                // MODO RELAX: LOTO CUÁNTICO LÍQUIDO (Curvas continuas y orgánicas)
                // ==========================================
                else if (currentMode === 'relax') {
                    const layers = 5;
                    const petals = 12; // Simetría armónica
                    
                    for (let l = 1; l <= layers; l++) {
                        ctx.beginPath();
                        ctx.strokeStyle = l % 2 === 0 ? config.color : config.secondaryColor;
                        ctx.lineWidth = 2 - (l * 0.2);
                        
                        // Rotación suave e interconectada
                        const rotation = t * 0.2 * (l % 2 === 0 ? 1 : -1);
                        const baseRadius = l * 25 + (normBass * 20);
                        const petalLength = baseRadius + 30 + (normMids * 60);
                        const petalWidth = 0.4 + (normHighs * 0.5); // Los agudos ensanchan los pétalos

                        for (let i = 0; i <= petals; i++) {
                            const angle = (i * 2 * Math.PI) / petals + rotation;
                            const nextAngle = ((i + 1) * 2 * Math.PI) / petals + rotation;
                            
                            const x1 = cx + Math.cos(angle) * baseRadius;
                            const y1 = cy + Math.sin(angle) * baseRadius;
                            
                            // Puntos de control para curvas de Bezier (crea el efecto líquido/loto)
                            const cp1x = cx + Math.cos(angle + petalWidth) * petalLength;
                            const cp1y = cy + Math.sin(angle + petalWidth) * petalLength;
                            const cp2x = cx + Math.cos(nextAngle - petalWidth) * petalLength;
                            const cp2y = cy + Math.sin(nextAngle - petalWidth) * petalLength;
                            
                            const x2 = cx + Math.cos(nextAngle) * baseRadius;
                            const y2 = cy + Math.sin(nextAngle) * baseRadius;

                            if (i === 0) ctx.moveTo(x1, y1);
                            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
                        }
                        ctx.stroke();
                    }
                }
                // ==========================================
                // MODO SLEEP: RESPIRACIÓN NEBULAR ÁUREA (Fractales de enjambre relajante)
                // ==========================================
                else if (currentMode === 'sleep') {
                    const goldenAngle = 137.5 * (Math.PI / 180); // Ángulo áureo
                    const numParticles = 250 + Math.floor(normMids * 100);
                    
                    // Modulación de respiración lenta
                    const breath = Math.sin(t * 0.5) * 20;

                    for (let i = 0; i < numParticles; i++) {
                        // Crecimiento espiral fibonacci
                        const radius = Math.sqrt(i) * (8 + normBass * 4) + breath;
                        const angle = i * goldenAngle + t * 0.1;
                        
                        const x = cx + Math.cos(angle) * radius;
                        const y = cy + Math.sin(angle) * radius;

                        // Tamaño y color dinámico por profundidad
                        const size = (1.5 + Math.sin(i * 0.1 + t)) * (1 + normBass);
                        
                        ctx.beginPath();
                        ctx.fillStyle = i % 3 === 0 ? config.color : config.secondaryColor;
                        // Difuminación profunda para efecto niebla
                        ctx.shadowBlur = 8; 
                        ctx.arc(x, y, Math.max(0.1, size), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // NÚCLEO CENTRAL LÍQUIDO EXTRA-REACTIVO PARA TODOS LOS MODOS
                ctx.shadowBlur = 30;
                ctx.shadowColor = config.color;
                ctx.fillStyle = config.color;
                ctx.beginPath();
                ctx.arc(cx, cy, 5 + (normBass * 15), 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(cx, cy, 2 + (normBass * 6), 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0; 
            }
        }

        animationRef.current = requestAnimationFrame(updateCymaticsLoop);
    };

    const togglePlayback = async () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                if (!audioContextRef.current) {
                    initAudioContext(audioRef.current);
                }
                if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                    await audioContextRef.current.resume();
                }
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.error("Fallo de reproducción interactiva en iOS:", err);
            }
        }
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(updateCymaticsLoop);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [currentMode, isPlaying]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#030303] text-white p-4 md:p-6 font-sans w-full overflow-x-hidden">
            <audio 
                ref={audioRef} 
                onEnded={() => setIsPlaying(false)} 
                className="hidden" 
                playsInline 
                controls={false}
            />
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="audio/*" 
                onChange={handleFileChange} 
                className="hidden" 
            />

            <header className="text-center mb-4 max-w-full">
                <p className="text-[10px] text-cyan-500 tracking-[0.3em] uppercase mb-1">🎵 Módulo 1: Música de las Esferas</p>
                <h1 className="text-xl md:text-2xl font-black text-white uppercase px-2 tracking-wider">Cosmic Symphony Dashboard</h1>
            </header>

            {/* SELECCIÓN DE MODOS */}
            <div className="flex gap-2 mb-4">
                {(['focus', 'relax', 'sleep'] as const).map((mode) => (
                    <button 
                        key={mode} 
                        onClick={() => {
                            setCurrentMode(mode);
                        }} 
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border 
                            ${currentMode === mode 
                                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                                : 'bg-transparent text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                            }`}
                        style={{
                            borderColor: currentMode === mode ? MODE_SETTINGS[mode].color : undefined
                        }}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            {/* TELEMETRÍA SUPERIOR EXTERNA */}
            <div className="w-full max-w-[340px] md:max-w-[420px] flex justify-between items-center px-2 mb-2 font-mono text-[9px]">
                <span className="tracking-widest flex items-center gap-1.5 uppercase" style={{ color: config.color }}>
                    <Volume2 className="w-3 h-3" /> {config.label}
                </span>
                {audioFile ? (
                    <span className="text-gray-400 tracking-tight max-w-[140px] truncate border-b border-gray-900 pb-0.5">
                        {audioFile.name}
                    </span>
                ) : (
                    <span className="text-gray-600 italic">No audio track loaded</span>
                )}
            </div>

            {/* MANDALA CONTENEDOR CON CANVAS DE ALTA FRECUENCIA */}
            <div className="w-full max-w-xl flex justify-center mb-2 px-1">
                <div className="group relative bg-black rounded-full border border-cyan-950/40 shadow-[0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center p-2 w-full aspect-square max-w-[340px] md:max-w-[420px] overflow-hidden">
                    
                    {/* MOTOR DE RENDERIZADO CUÁNTICO */}
                    <canvas 
                        ref={canvasRef} 
                        width={500} 
                        height={500} 
                        className="w-full h-full rounded-full"
                    />

                    {/* INTERFAZ FLOTANTE */}
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none rounded-full transition-all duration-300
                        ${isPlaying ? 'bg-black/0 group-hover:bg-black/40' : 'bg-black/20'}`}
                    >
                        <button 
                            onClick={togglePlayback} 
                            disabled={!audioFile} 
                            className={`p-4 rounded-full border pointer-events-auto transition-all duration-300 backdrop-blur-sm
                                ${!audioFile 
                                    ? 'bg-neutral-900/40 text-neutral-600 border-neutral-950 cursor-not-allowed' 
                                    : isPlaying 
                                        ? 'bg-black/70 opacity-0 group-hover:opacity-100 hover:scale-105 shadow-lg' 
                                        : 'bg-black/60 opacity-100 hover:scale-105 shadow-lg'}`}
                            style={{
                                color: config.color,
                                borderColor: isPlaying ? 'rgba(255,255,255,0.1)' : config.color
                            }}
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* TELEMETRÍA INFERIOR EXTERNA */}
            <div className="w-full max-w-[340px] md:max-w-[420px] text-center mb-5 font-mono text-[8px] tracking-[0.25em] text-gray-600 uppercase">
                {isPlaying ? "Analyzing Spectrum..." : "System Idle"}
            </div>

            {/* CONTROLES INFERIORES */}
            <div className="w-full max-w-xl space-y-4 px-2">
                <div className="flex gap-3 w-full">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-3 bg-neutral-950 border border-cyan-950 hover:border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-98">
                        <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        {audioFile ? "Cambiar Pista" : "Subir Pista Alquímica"}
                    </button>
                </div>
                <div className="p-3 bg-black/60 border border-neutral-900 rounded-xl space-y-2 text-center sm:text-left">
                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Estado: <span className="text-green-400 font-bold">✓ Éxito en Modo {currentMode}!</span> Score Estelar: <span className="text-white font-mono font-bold">{stellarScore}</span>. Duración: <span className="text-gray-300 font-mono">Real-Time Sync</span>.</p>
                    <div className="h-[1px] bg-neutral-900 w-full" />
                    <p className="text-[10px] font-mono tracking-wide animate-pulse flex items-center justify-center sm:justify-start gap-1.5" style={{ color: config.color }}><Music className="w-3 h-3" /> {isPlaying ? "Generando patrones armónicos de onda..." : "Carga un archivo musical para sincronizar el flujo."}</p>
                </div>
            </div>
        </div>
    );
}