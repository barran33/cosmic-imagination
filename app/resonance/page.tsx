'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Upload, Music, Volume2 } from 'lucide-react';

// ==========================================
// PALETA DE COLORES ALQUÍMICOS (Optimizado para WebKit/Safari)
// ==========================================
const MODE_SETTINGS = {
    focus: { 
        vertices: 72, // Reducido sutilmente para optimizar frames en pantallas ProMotion/OLED de iPhone
        harmonics: 15, 
        speed: 1.8, 
        color: '#ffffff',       
        secondaryColor: '#01ebf7', 
        label: 'Beta Waves: Hyper-Focus Crystal' 
    },
    relax: { 
        vertices: 60, 
        harmonics: 6, 
        speed: 0.8, 
        color: '#00ffaa',       
        secondaryColor: '#0066ff', 
        label: 'Alpha Waves: Sacred Resonance' 
    },
    sleep: { 
        vertices: 64, 
        harmonics: 3, 
        speed: 0.36, 
        color: '#ff007f',       
        secondaryColor: '#0bd3e9', 
        label: 'Delta Waves: Deep Sleep Orbit' 
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

    const pathsRef = useRef<(SVGPathElement | null)[]>([]);
    const coreCenterRef = useRef<SVGCircleElement | null>(null);
    const coreGlowRef = useRef<SVGCircleElement | null>(null);

    const timeRef = useRef(0);

    const config = MODE_SETTINGS[currentMode];
    const ringCount = currentMode === 'focus' ? 10 : (currentMode === 'relax' ? 8 : 6);
    const rings = Array.from({ length: ringCount });

    const initAudioContext = (element: HTMLAudioElement) => {
        if (audioContextRef.current) return;
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
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
                // Liberar memoria previa del ObjectURL en iOS
                if (audioRef.current.src) {
                    URL.revokeObjectURL(audioRef.current.src);
                }
                audioRef.current.src = URL.createObjectURL(file);
                audioRef.current.load();
            }
            setStellarScore(parseFloat((85 + Math.random() * 14).toFixed(2)));
        }
    };

    const calculatePathString = (baseRadius: number, indexFactor: number, midDist: number, highDist: number, time: number) => {
        const points = [];
        const numPoints = config.vertices; 
        const center = 150;
        const phi = 1.618033988749895;
        
        const audioForce = isPlaying ? (midDist / 255) * 24 : 2.0;
        const highForce = isPlaying ? (highDist / 255) * 12 : 1.0;

        for (let i = 0; i <= numPoints; i++) {
            const direction = indexFactor % 2 === 0 ? 1 : -1;
            
            let rotationOffset = 0;
            if (currentMode === 'relax') rotationOffset = time * 0.25 * direction;
            if (currentMode === 'sleep') rotationOffset = time * 0.05 * direction;

            const angle = ((i * 2 * Math.PI) / numPoints) + rotationOffset;
            let currentRadius = baseRadius;

            if (currentMode === 'focus') {
                const waveA = Math.sin(angle * config.harmonics + time);
                const waveB = Math.cos(angle * (config.harmonics / 2) - time * 1.4);
                const microVib = Math.sin(angle * 32 - time * 3.0) * highForce * 0.45;
                currentRadius += (waveA * waveB) * audioForce * (1 + indexFactor * 0.08) + microVib;
            } 
            else if (currentMode === 'relax') {
                const harmonicA = Math.sin(angle * config.harmonics + (time * 0.7));
                const harmonicB = Math.cos(angle * (config.harmonics * phi) - (time * 0.4));
                const microVib = Math.sin(angle * 24 - time * 2.0) * highForce * 0.3;
                currentRadius += (harmonicA * harmonicB) * (audioForce * 1.5) * (1 + indexFactor * 0.04) + microVib;
            } 
            else {
                const slowPulse = Math.sin(time * 0.3 + indexFactor * 0.5);
                const breathing = 1 + Math.sin(time * 0.2) * 0.15;
                const a = baseRadius * breathing;
                const b = (15 + indexFactor * 4) * (1 + (audioForce * 0.15));
                
                const cardioidComponent = Math.cos(angle * config.harmonics + slowPulse);
                const goldenSpiralComponent = Math.sin(angle * 3 - time * 0.1) * (4 + indexFactor * 0.5);
                currentRadius = a + b * cardioidComponent + goldenSpiralComponent;
            }

            currentRadius = Math.max(10, Math.min(145, currentRadius));
            
            const x = center + currentRadius * Math.cos(angle);
            const y = center + currentRadius * Math.sin(angle);
            points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
        }
        return `M ${points.join(' L ')} Z`;
    };

    const updateCymaticsLoop = () => {
        let bass = 0;
        let mids = 0;
        let highs = 0;

        if (analyserRef.current && isPlaying) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            for (let i = 0; i < 10; i++) bass += dataArray[i]; bass /= 10;
            for (let i = 10; i < 50; i++) mids += dataArray[i]; mids /= 40;
            for (let i = 50; i < 100; i++) highs += dataArray[i]; highs /= 50;
        }

        timeRef.current += 0.02 * config.speed;

        pathsRef.current.forEach((pathElement, i) => {
            if (!pathElement) return;

            const baseRadius = currentMode === 'sleep'
                ? 35 + i * (90 / ringCount)
                : 30 + i * (108 / ringCount);

            const newD = calculatePathString(baseRadius, i, mids, highs, timeRef.current);
            pathElement.setAttribute('d', newD);

            const baseOpacity = currentMode === 'sleep' ? 0.15 + (i * 0.08) : 0.22 + (i * 0.05);
            const dynamicOpacity = baseOpacity + (isPlaying ? (mids / 255) * 0.40 : 0.08);
            pathElement.setAttribute('opacity', Math.min(0.85, dynamicOpacity).toString());
        });

        const currentBassScale = 1 + (bass / 255) * 0.35;
        const baseRadiusGlow = currentMode === 'sleep' ? 14 : 22;
        const baseRadiusCenter = currentMode === 'sleep' ? 8 : 12;

        if (coreGlowRef.current) {
            coreGlowRef.current.setAttribute('r', (baseRadiusGlow * currentBassScale).toFixed(2));
        }
        if (coreCenterRef.current) {
            coreCenterRef.current.setAttribute('r', (baseRadiusCenter * currentBassScale).toFixed(2));
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
                // Inicialización directa e inmediata en el stack síncrono del click para evadir bloqueos de iOS
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
            {/* Atributos cruciales inyectados para prevenir la pantalla completa forzada en Safari Móvil */}
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
                            pathsRef.current = []; 
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

            {/* MANDALA CONTENEDOR */}
            <div className="w-full max-w-xl flex justify-center mb-2 px-1">
                <div className="group relative bg-black rounded-full border border-cyan-950/40 shadow-[0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center p-4 w-full aspect-square max-w-[340px] md:max-w-[420px] overflow-hidden">
                    
                    {/* MOTOR DE RENDERIZADO */}
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <defs>
                            <filter id="glow-cymatic" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="4.5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        <g style={{ filter: 'url(#glow-cymatic)' }}>
                            {rings.map((_, i) => (
                                <path
                                    key={`cymatic-ring-${currentMode}-${i}`}
                                    ref={(el) => { pathsRef.current[i] = el; }}
                                    fill="none"
                                    stroke={i % 2 === 0 ? config.color : config.secondaryColor}
                                    strokeWidth={currentMode === 'focus' ? 0.65 : (currentMode === 'relax' ? 1.1 : 1.6 - i * 0.12)}
                                    opacity={currentMode === 'sleep' ? 0.2 + (i * 0.06) : 0.3}
                                    className="transition-all duration-150 ease-out"
                                />
                            ))}
                        </g>

                        {/* NÚCLEO CENTRAL DINÁMICO */}
                        <circle
                            ref={coreGlowRef}
                            cx="150"
                            cy="150"
                            r={currentMode === 'sleep' ? 14 : 22}
                            fill={config.color}
                            opacity="0.75"
                            style={{ filter: 'url(#glow-cymatic)' }}
                        />
                        <circle
                            ref={coreCenterRef}
                            cx="150"
                            cy="150"
                            r={currentMode === 'sleep' ? 8 : 12}
                            fill="#ffffff"
                            opacity="0.95"
                        />
                    </svg>

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