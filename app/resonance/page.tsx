// app/exploracion-cosmica/resonancia/page.tsx

"use client"; // 🛑 Asegúrate de que esta línea esté al inicio si usas Next.js App Router para componentes con interactividad.

import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone'; 

// ------------------------------------------------------------------
// INTERFACES DE DATOS 
// ------------------------------------------------------------------

type StarTripMode = 'Focus' | 'Relax' | 'Sleep'; 

interface CosmicSymphonyData {
    pitch: number[];
    duration_ms: number[];
    tempo_bpm: number;
    instrument: string;
}

interface StarTripApiResult {
    user_id: string;
    session_id: string;
    processed_points: number;
    duration_s: number;
    result_score: number;
    message: string;
    symphony_data: CosmicSymphonyData;
    error?: string;
}

interface StarTripDataInput {
    user_id: string;
    session_id: string;
    raw_frequency_points: number[];
    algorithm_version?: string;
    max_duration_minutes?: number;
    mode: StarTripMode; 
}


// ------------------------------------------------------------------
// FUNCIÓN DE LLAMADA A LA API (Mantener la función aquí o importarla)
// ------------------------------------------------------------------

const sendStarTripDataForProcessing = async (input: StarTripDataInput): Promise<StarTripApiResult | { error: string }> => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/star-trip/analyze-data", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...input,
                algorithm_version: input.algorithm_version || "STV1",
                max_duration_minutes: input.max_duration_minutes || 5,
                mode: input.mode, 
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { error: `HTTP Error ${response.status}: ${errorText.substring(0, 100)}...` };
        }
        
        return await response.json();

    } catch (e: any) {
        return { error: `Network/Fetch Error: ${e.message}` };
    }
};


let animationFrameId: number; 
let currentFFT: Tone.FFT | null = null;
let lastSpectrum: Float32Array | null = null; 
let canvasContext: CanvasRenderingContext2D | null = null; 

// ------------------------------------------------------------------
// FUNCIÓN AUXILIAR: DIBUJO DE FORMAS SIMÉTRICAS RADIALES (MANDALAS)
// ------------------------------------------------------------------

const drawSymmetricalShape = (
    ctx: CanvasRenderingContext2D, 
    center: { x: number, y: number }, 
    spectrum: Float32Array, 
    numBars: number, 
    pulseFactor: number, 
    symmetry: number, 
    baseRadius: number, 
    color: string | CanvasGradient, 
    lineWidth: number,
    initialRotation: number = 0,
    mode: 'stroke' | 'fill' = 'stroke' 
) => {
    // ... [MANTENER EL CÓDIGO DE drawSymmetricalShape AQUÍ] ...
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    const pointsPerSymmetry = Math.floor(numBars / symmetry); 

    for (let j = 0; j < symmetry; j++) {
        const rotation = initialRotation + (j / symmetry) * Math.PI * 2;
        
        ctx.beginPath();
        
        for (let i = 0; i < pointsPerSymmetry; i++) {
            const dataIndex = i % pointsPerSymmetry; 
            const amp = (spectrum[dataIndex] as number) * 0.003 * pulseFactor; 
            const r = baseRadius + (amp * baseRadius * 0.8); 
            const angle = rotation + (i / pointsPerSymmetry) * Math.PI * 2; 

            const x = center.x + r * Math.cos(angle);
            const y = center.y + r * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        
        if (mode === 'fill') {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
};

// ------------------------------------------------------------------
// FUNCIÓN DE REPRODUCCIÓN DE LA SINFONÍA CÓSMICA (playSymphony)
// ------------------------------------------------------------------

const playSymphony = (
    symphonyData: CosmicSymphonyData, 
    canvas: HTMLCanvasElement | null,
    currentMode: StarTripMode 
) => {
    // ... [MANTENER EL CÓDIGO COMPLETO DE playSymphony AQUÍ] ...
    if (!canvas) return;
    
    const transport = Tone.getTransport(); 

    // Limpieza
    if (transport.state === 'started') { transport.stop(); }
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); }
    if (currentFFT) { (currentFFT as any).dispose(); currentFFT = null; }
    
    canvasContext = canvas.getContext('2d');
    
    // 1. EFECTOS GLOBALES Y VARIABLES POR MODO
    let filterFrequency = 0;
    let padVolume = -12;
    let melodyVolume = -6; 
    let padAttack = 4;
    let padRelease = 5;
    let kickVolume = -10;
    let snareVolume = -15;
    let padFilterType: BiquadFilterType = "lowpass"; 


    
    // --- Lógica de variables de Focus/Relax/Sleep ---
    if (currentMode === 'Focus') {
        filterFrequency = 12000;
        padFilterType = "highpass";
        padVolume = -24;       
        melodyVolume = -3; 
        padAttack = 0.01;      
        padRelease = 0.1;
        kickVolume = -5;       
        snareVolume = -8;
        
    } else if (currentMode === 'Relax') {
        filterFrequency = 3000; 
        padVolume = -10;        
        melodyVolume = -6; 
        padAttack = 2;          
        padRelease = 3;
        kickVolume = -12; 
        snareVolume = -18; 
        
    } else { // Sleep
        filterFrequency = 400;  
        padVolume = -14;        
        melodyVolume = -8;      
        kickVolume = -15; 
        snareVolume = -Infinity; 
      
    }
    // -----------------------------------------------------------

    const reverb = new Tone.Reverb({
        decay: currentMode === 'Sleep' ? 8 : 6, 
        preDelay: 0.05,
        wet: currentMode === 'Sleep' ? 0.5 : 0.3 
    }).toDestination();
    
    const padFilter = new Tone.Filter({
        type: padFilterType, 
        frequency: filterFrequency, 
        rolloff: -24
    }).connect(reverb); 
    
    // 2. SINTETIZADOR PRINCIPAL (Melodía Orgánica/Cuerda)
    
    const melodyEnvelope = { 
        attack: currentMode === 'Focus' ? 0.001 : 0.01, 
        decay: currentMode === 'Focus' ? 0.05 : 0.2, 
        sustain: 0.0, 
        release: currentMode === 'Focus' ? 0.4 : 3.0 
    };

    let melodySynth: Tone.PolySynth;

    if (currentMode === 'Sleep') {
        melodySynth = new Tone.PolySynth(Tone.MembraneSynth, {
            volume: melodyVolume, 
            envelope: melodyEnvelope,
            octaves: 6, 
        }).connect(reverb);
    } else {
        melodySynth = new Tone.PolySynth(Tone.Synth, {
            volume: melodyVolume, 
            oscillator: { type: currentMode === 'Focus' ? 'sine' : 'triangle' }, 
            envelope: melodyEnvelope, 
        }).connect(reverb);
    }
    
    // 3. SINTETIZADOR DE PAD/AMBIENTE (Atmósfera)
    const padSynth = new Tone.PolySynth(Tone.DuoSynth, {
        voice0: {
             oscillator: { type: "sawtooth" },
             envelope: { attack: padAttack, decay: 0.5, sustain: 0.5, release: padRelease }, 
        },
        voice1: { 
             oscillator: { type: "sine" },
             envelope: { attack: padAttack, decay: 0.5, sustain: 0.5, release: padRelease }, 
        },
        volume: padVolume, 
    }).connect(padFilter); 
    
    // 4. SINTETIZADORES DE PERCUSIÓN Y DRONE
    
    const deepKickSynth = new Tone.MembraneSynth({
        pitchDecay: 0.02,
        octaves: 5,
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.0, release: 1.0 },
        volume: kickVolume 
    }).toDestination();
    
    const focusKickSynth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        volume: kickVolume 
    }).toDestination();
    
    const focusSnareSynth = new Tone.NoiseSynth({
        volume: snareVolume,
        envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.05 }
    }).toDestination();

    const droneSynth = new Tone.AMSynth({
        
        harmonicity: 1.5,
        oscillator: { type: 'sine' }, 
        envelope: { attack: 5, decay: 1, sustain: 1, release: 5 }
    }).toDestination();
    
    // 5. ANALIZADOR DE AUDIO
    currentFFT = new Tone.FFT(128); 
    melodySynth.connect(currentFFT); 
    droneSynth.connect(currentFFT); 
    
    // 6. Configuración de la escala, tempo y variables de tiempo
    const scale = [0, 3, 5, 7, 10]; 
    transport.bpm.value = symphonyData.tempo_bpm; 
    let time = 0;
    
    const MAX_DURATION_SECONDS = 30; 
    
    // 7. LÓGICA RÍTMICA AVANZADA (Percusión separada)
    
    let drumLoop: Tone.Loop | null = null;
    
    if (currentMode === 'Focus') {
        drumLoop = new Tone.Loop((time) => {
            focusKickSynth.triggerAttackRelease("4n", time); 
            focusKickSynth.triggerAttackRelease("8n", time + Tone.Time("4n").toSeconds() * 1.5); 
            focusSnareSynth.triggerAttackRelease("16n", time + Tone.Time("4n").toSeconds()); 
            focusSnareSynth.triggerAttackRelease("16n", time + Tone.Time("4n").toSeconds() * 3); 
        }, "1m").start(0); 
    } else if (currentMode === 'Relax') {
        drumLoop = new Tone.Loop((time) => {
            deepKickSynth.triggerAttackRelease("2n", time, 0.7); 
        }, "2m").start(0); 
    } else if (currentMode === 'Sleep') {
         drumLoop = new Tone.Loop((time) => {
            deepKickSynth.triggerAttackRelease("4n", time, 0.3); 
        }, "4m").start(0); 
    }

    // 7b. Lógica de Consonancia y Programación de la Melodía
    symphonyData.pitch.forEach((midiNote, index) => {
        const duration = symphonyData.duration_ms[index] / 1000; 
        const padDuration = duration * 2; 

        if (time + Math.max(duration, padDuration) > MAX_DURATION_SECONDS) {
            return; 
        }
        
        // --- LÓGICA DE CÁLCULO DE FRECUENCIA ---
        const noteClass = midiNote % 15;
        let closestInterval = scale.reduce((prev, curr) => {
            const diff = Math.abs(noteClass - curr);
            const prevDiff = Math.abs(noteClass - prev);
            return (diff < prevDiff ? curr : prev);
        }, scale[0]);

        let octave = Math.round(midiNote / 12); 
        octave = Math.max(4, Math.min(6, octave)); 

        const finalMidiNote = (octave * 12) + closestInterval;
        const freq = Tone.Midi(finalMidiNote).toFrequency(); 

        // 🎶 PROGRAMACIÓN DE NOTAS 🎶
        melodySynth.triggerAttackRelease(freq, duration, time);
        padSynth.triggerAttackRelease(freq, padDuration, time); 
        
        // El avance del tiempo sigue igual para la melodía
        time += Math.max(duration, padDuration); 
    });
    
    // 8. INICIO DE LA ANIMACIÓN CIMÁTICA 
    drawCymatics(currentFFT!, canvas, (spectrum) => { lastSpectrum = spectrum; }, currentMode); 

    transport.start(); 

    // 9. Configurar el loop para detener y dibujar el patrón final
    transport.scheduleOnce(() => { 
        transport.stop(); 
        
        // Limpiar todos los recursos
        melodySynth.dispose();
        padSynth.dispose();
        reverb.dispose();
        padFilter.dispose(); 
        focusKickSynth.dispose(); 
        focusSnareSynth.dispose(); 
        deepKickSynth.dispose(); 

        if (drumLoop) { 
            drumLoop.dispose();
        }

        droneSynth.triggerRelease(Tone.now()); 
        droneSynth.dispose();

        if (animationFrameId) { cancelAnimationFrame(animationFrameId); }
        if (lastSpectrum && canvasContext && canvas) {
            drawFinalCymaticsPattern(canvasContext, canvas, lastSpectrum, currentMode); 
        }
    }, time + 1); 
};
//--------------------------------------------------------------//
// FUNCIÓN DE DIBUJO CIMÁTICO 
// -------------------------------------------------------------//

const drawCymatics = (
    fft: Tone.FFT, 
    canvas: HTMLCanvasElement, 
    onSpectrumUpdate: (spectrum: Float32Array) => void,
    currentMode: StarTripMode 
) => {
    // ... [MANTENER EL CÓDIGO COMPLETO DE drawCymatics AQUÍ] ...
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const center = { x: width / 2, y: height / 2 };
    
    // --- NUEVA CONFIGURACIÓN DE COLORES ---
    const colors = {
        Focus: { outer: '#13fab1ff', inner: '#f1f2ffff', fill: '#a8ea00ff' },
        Relax: { outer: '#00ffff', inner: '#00ff00', fill: '#00fffbff' }, 
        Sleep: { outer: '#00e1ffff', inner: '#00ffd9ff', fill: '#a0a0a0ff' }, 
    }[currentMode];
    
    // --- NUEVA CONFIGURACIÓN DE SIMETRÍA Y BLUR ---
    const symmetryConfig = {
        Focus: { base: 12, inner: 6, blur: 30 }, // Alta complejidad, pulso fuerte
        Relax: { base: 8, inner: 4, blur: 18 },  // Media complejidad, pulso moderado
        Sleep: { base: 5, inner: 9, blur: 6 },   // Baja complejidad, pulso sutil
    }[currentMode];
    
    const pulseBlur = symmetryConfig.blur; 

    const draw = () => {
        const spectrum = fft.getValue(); 
        onSpectrumUpdate(spectrum); 
        const numBars = spectrum.length; 
        
        ctx.fillStyle = 'rgba(16, 16, 16, 0.95)'; 
        ctx.fillRect(0, 0, width, height);

        const energySum = spectrum.reduce((sum, val) => sum + Math.abs(val as number), 0);
        const avgEnergy = energySum / numBars;
        const pulseFactor = (avgEnergy + 80) / 80; 

        ctx.shadowBlur = pulseBlur;
        ctx.shadowColor = `rgba(0, 229, 255, 0.8)`;
        
        // --- CAPA EXTERIOR (Simetría BASE) ---
        drawSymmetricalShape(
            ctx, center, spectrum, numBars, pulseFactor, 
            symmetryConfig.base, 
            width / 1.8, 
            colors.outer, 
            3, 
            0, 
            'stroke'
        );
        
        // --- CAPA INTERIOR (Simetría INNER) ---
        drawSymmetricalShape(
            ctx, center, spectrum, numBars, pulseFactor, 
            symmetryConfig.inner, 
            width / 3.0, 
            colors.inner, 
            2.5, 
            Math.PI / 6, 
            'stroke'
        );
        
        // --- CAPA CENTRAL (Simetría 3 - Fija) ---
        drawSymmetricalShape(
            ctx, center, spectrum, numBars, pulseFactor, 
            3, 
            width / 8, 
            colors.fill, 
            4, 
            0, 
            'fill' 
        );

        ctx.globalCompositeOperation = 'source-over';
        animationFrameId = requestAnimationFrame(draw);
    };

    draw();
};
// ------------------------------------------------------------------
// FUNCIÓN: DIBUJAR EL PATRÓN CIMÁTICO FINAL 
// ------------------------------------------------------------------

const drawFinalCymaticsPattern = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    finalSpectrum: Float32Array,
    currentMode: StarTripMode 
) => {
    // ... [MANTENER EL CÓDIGO COMPLETO DE drawFinalCymaticsPattern AQUÍ] ...
    const width = canvas.width;
    const height = canvas.height;
    const center = { x: width / 2, y: height / 2 };
    const numBars = finalSpectrum.length;

    // --- 1. CONFIGURACIÓN DEL BANCO DE MANDALAS (33+ Diseños) ---
 
    const mandalaPresets = [
        // Focus/High Energy
        [12, 8, 4], [10, 6, 5], [16, 12, 8], [14, 7, 3], 
        // Relax/Flow
        [9, 5, 3], [7, 4, 2], [11, 6, 5], [13, 8, 3], [15, 7, 5],
        // Sleep/Calm
        [5, 3, 2], [4, 2, 1], [3, 1, 1], [6, 4, 3],
        // Diseños Locos
        [18, 10, 5], [20, 15, 10], [17, 9, 4], [19, 11, 7], [24, 16, 8],
        [22, 14, 6], [26, 18, 10], [21, 12, 7], [23, 13, 5], [25, 17, 9],
        [28, 20, 12], [30, 25, 15], [27, 14, 6], [29, 15, 7], [32, 24, 16],
        [34, 26, 18], [31, 16, 8], [33, 17, 9], [36, 28, 20], [35, 20, 10]
    ];
    
    const presetIndex = Math.floor(Math.random() * mandalaPresets.length);
    const [sym1, sym2, sym3] = mandalaPresets[presetIndex];


    // --- 2. FONDO Y CÁLCULO DE ENERGÍA ---
    ctx.fillStyle = '#000814'; 
    ctx.fillRect(0, 0, width, height);

    const energySum = finalSpectrum.reduce((sum, val) => sum + Math.abs(val as number), 0);
    const avgEnergy = energySum / numBars;
    const finalPulseFactor = Math.max(1.0, (avgEnergy + 80) / 80) * 3.5; 

    const simulatedSpectrum = new Float32Array(numBars);
    for (let i = 0; i < numBars; i++) {
        simulatedSpectrum[i] = -40 + Math.cos(i * Math.PI / (numBars / 12)) * 10; 
    }

    // --- 3. CONFIGURACIÓN DE COLORES Y GRADIENTES MEJORADOS ---
    const gradientColors = {
        Focus: ['#13ebfaff',  '#f1f2ffff',  '#0a6d6aff'], 
        Relax: ['#00ffff',  '#02616dff',  '#c7d0cfff'],   
        Sleep: ['#03eaffff', '#e8ecefff', '#3d8de3ff'],   
    }[currentMode];

    const radialGradient = ctx.createRadialGradient(
        center.x, center.y, width / 25, 
        center.x, center.y, width / 1.5 
    );
    radialGradient.addColorStop(0, gradientColors[0]);     
    radialGradient.addColorStop(0.5, gradientColors[1]);    
    radialGradient.addColorStop(1, gradientColors[2]); 

    // --- 4. DIBUJO DE CAPAS GEOMÉTRICAS ÉPICAS ---
    
    
    ctx.shadowBlur = currentMode === 'Focus' ? 40 : 25; 
    ctx.shadowColor = currentMode === 'Sleep' ? 'rgba(25, 220, 255, 1)' : 'rgba(255, 255, 255, 0.8)'; 

    // CAPA 1: La Geometría Sagrada (La más grande, rellena)
    drawSymmetricalShape(
        ctx, center, simulatedSpectrum, numBars, finalPulseFactor, 
        sym1, 
        width / 1.70, 
        radialGradient, 
        0, 
        0, 
        'fill' 
    );

    // CAPA 2: LÍNEAS DE CONTRASTE (Trazo)
    drawSymmetricalShape(
        ctx, center, simulatedSpectrum, numBars, finalPulseFactor * 0.7, 
        sym2, 
        width / 2.2, 
        currentMode === 'Sleep' ? '#e9ecedff' : '#05f7ffff', 
        2.5, 
        Math.PI / sym2, 
        'stroke' 
    );
    
    // CAPA 3: CÍRCULO INTERIOR DE ÉNFASIS (NUEVO)
    drawSymmetricalShape(
        ctx, center, simulatedSpectrum, numBars, finalPulseFactor * 0.5, 
        sym3, 
        width / 4.0, 
        currentMode === 'Focus' ? '#11ffb0ff' : '#00cbefff', 
        4, 
        0, 
        'fill' 
    );
    
    // --- 5. NÚCLEO CENTRAL (El Sol/Conciencia) ---
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FFFFFF'; 
    ctx.beginPath();
    ctx.arc(center.x, center.y, width / 20, 0, Math.PI * 2); 
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fill();
    
    ctx.shadowBlur = 0; 
    ctx.strokeStyle = '#00e5ffff'; 
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(center.x, center.y, width / 2.5, 0, Math.PI * 2); 
    ctx.stroke();
};

// ------------------------------------------------------------------
// COMPONENTE PRINCIPAL DE LA PÁGINA (ResonanciaPage)
// ------------------------------------------------------------------

const ResonanciaPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [userId] = useState('STAR_TRIP_USER_1');
    const [currentMode, setCurrentMode] = useState<StarTripMode>('Focus'); 
    
    const canvasRef = useRef<HTMLCanvasElement>(null); 

    // EFECTO PARA RESPONSIVIDAD DEL CANVAS
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const cssWidth = canvas.clientWidth;
            const cssHeight = canvas.clientHeight;

            canvas.width = cssWidth;
            canvas.height = cssHeight;
            
            // Si hay un patrón final dibujado, redibujarlo al cambiar el tamaño
            if (currentFFT && lastSpectrum && canvasContext) {
                 drawFinalCymaticsPattern(canvasContext, canvas, lastSpectrum, currentMode);
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [currentMode]); 


    const handleProcessClick = async () => {
        setLoading(true);
        setResultMessage(`Iniciando Análisis Estelar en Modo ${currentMode}...`);
        
        // Limpiar animaciones y transporte antes de iniciar
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        if (Tone.Transport.state === 'started') {
            Tone.Transport.stop();
        }

        // Simulación de puntos de frecuencia para la API
        const dataPoints = Array(10000).fill(0).map(() => Math.random() * 50); 
        const inputData: StarTripDataInput = {
            user_id: userId, 
            session_id: 'STAR_SESSION_' + Date.now(),
            raw_frequency_points: dataPoints,
            mode: currentMode, 
        };
        
        try {
            await Tone.start(); 

            const result = await sendStarTripDataForProcessing(inputData);

            if (!('error' in result)) {
                playSymphony(result.symphony_data, canvasRef.current, currentMode); 
                
                setResultMessage(
                    `✅ ¡Éxito en Modo ${currentMode}! Score Estelar: ${result.result_score.toFixed(2)}. 
                    Duración: ${result.duration_s.toFixed(3)}s. 
                    🎶 ¡La Sinfonía Cósmica ha comenzado! 🌟`
                );
            } else {
                setResultMessage(`❌ Fallo en el análisis: ${result.error}`);
            }
        } catch (e: any) {
            setResultMessage(`❌ Error CRÍTICO en la ejecución: ${e.message}`);
        }

        setTimeout(() => {
            setLoading(false);
        }, 6000); // Tiempo de espera de la simulación
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', alignItems: 'center', display: 'flex', flexDirection: 'column',textAlign: 'center', color: 'white', backgroundColor: '#000814' }}>
            <h2>🎵 Módulo 1: Música de las Esferas (Cimática)</h2>
            
            {/* BOTONES DE SELECCIÓN DE MODO */}
            <div style={{ margin: '20px 0', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                {['Focus', 'Relax', 'Sleep'].map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setCurrentMode(mode as StarTripMode)}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: currentMode === mode ? '#00e5ffff' : '#000814',
                            color: currentMode === mode ? 'black' : 'white',
                            border: '1px solid #00e5ffff',
                            borderRadius: '4px',
                            cursor: loading ? 'wait' : 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            <canvas 
                ref={canvasRef} 
                width="500" 
                height="500" 
                style={{ 
                    border: '1px solid #00e5ffff', 
                    borderRadius: '50%',
                    marginTop: '20px',
                    marginBottom: '20px',
                    backgroundColor: '#000814',
                    margin: '20px 0',
                    maxWidth: '500px', 
                    maxHeight: '500px', 
                    width: '90vw', 
                    height: '90vw',
                    aspectRatio: '1 / 1', 
                }}
            />

            <button 
                onClick={handleProcessClick} 
                disabled={loading}
                style={{ 
                    padding: '12px 25px', 
                    fontSize: '18px', 
                    cursor: loading ? 'wait' : 'pointer',
                    backgroundColor: loading ? '#000814' : '#00e5ffff',
                    color: loading ? 'white' : 'black',
                    border: '1px solid #00e5ffff',
                    borderRadius: '6px',
                    transition: 'all 0.3s'
                }}
            >
                {loading ? 'Analyzing & Visualizing Sound...' : 'Run Cosmic Symphony (Cymatics)'}
            </button>
            
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
                Estado: {resultMessage || `Listo para iniciar el análisis en Modo ${currentMode}.`}
            </p>
            {loading && <div style={{ color: '#00e5ffff' }}>Generando patrones musicales...</div>}
        </div>
    );
}

export default ResonanciaPage;