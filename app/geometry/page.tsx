'use client';

import React, { useState, memo } from 'react';
import { Loader2, SlidersHorizontal, CheckCircle, PenTool, Sparkles, Zap, Flame, Droplets, Compass } from 'lucide-react';

// --- 1. CONFIGURACIÓN DE ENDPOINT ---
const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'https://api.cosmic-imagination.com';
const BASE_API_URL = `${API_HOST}/api/v1/cosmic-architect/transmute`;

interface GeometryNode {
  x: number;
  y: number;
}

interface TransmutationResult {
  frequency_hz: number;
  geometry_nodes: GeometryNode[];
  glow_color: string;
  secondary_color?: string; // Sincronizado para heredar paletas infinitas
  elements: string[];
  alchemy_status: string;
}

// --- 2. SUBCOMPONENTE DE CONTROLES ---
const ParameterPanel = memo(({ 
    scenePrompt, 
    setScenePrompt, 
    isGenerating,
    result
}: any) => {

    const getElementIcon = (element: string) => {
        switch(element.toLowerCase()) {
            case 'fuego': return <Flame className="w-3 h-3 text-red-500 mr-1 animate-pulse" />;
            case 'agua': return <Droplets className="w-3 h-3 text-blue-400 mr-1" />;
            case 'tierra': return <Compass className="w-3 h-3 text-emerald-600 mr-1" />;
            default: return <Sparkles className="w-3 h-3 text-cyan-400 mr-1 animate-spin" />;
        }
    };

    return (
        <div className="flex flex-col items-start p-4 bg-black/80 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] w-full max-w-2xl backdrop-blur-md transition-all duration-500">
            
            <h2 className="text-xs font-semibold text-cyan-400 flex items-center justify-center w-full mb-3 border-b border-cyan-900/60 pb-2 uppercase tracking-widest">
                <SlidersHorizontal className="w-3 h-3 mr-2 animate-pulse" /> Cosmic Creation Panel
            </h2>

            {/* ÁREA DE INTENCIONES */}
            <div className="w-full mb-3">
                <label className="text-[11px] font-bold text-cyan-300 flex items-center mb-1.5 uppercase tracking-wider">
                    <PenTool className='w-3 h-3 mr-2 text-cyan-400' /> 
                    Discover the geometric pattern of the word:
                </label>
                <textarea
                    value={scenePrompt}
                    onChange={(e) => setScenePrompt(e.target.value)}
                    disabled={isGenerating}
                    rows={2}
                    placeholder="Describe what state or block you want to transmute (e.g., Caos y Bloqueo, Abundancia)..."
                    className="w-full bg-neutral-950 text-cyan-100 border border-cyan-900/60 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-cyan-400 focus:border-transparent transition-all outline-none placeholder:text-zinc-700 shadow-inner resize-none duration-300"
                />
            </div>

            {/* STATUS EN TIEMPO REAL */}
            {result && (
                <div className="w-full grid grid-cols-3 gap-2 p-2.5 bg-neutral-950/60 border border-neutral-900 rounded-lg text-[10px] items-center animate-fadeIn">
                    <div className="flex flex-col border-r border-neutral-800/80">
                        <span className="text-neutral-500 uppercase font-medium tracking-mono">Status</span>
                        <span className="text-emerald-400 font-bold tracking-wide truncate flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-2.5 h-2.5 animate-bounce" /> Transmuted
                        </span>
                    </div>
                    <div className="flex flex-col border-r border-neutral-800/80 pl-2">
                        <span className="text-neutral-500 uppercase font-medium tracking-mono">Resonance</span>
                        <span className="text-white font-mono font-bold tracking-widest mt-0.5">{result.frequency_hz} Hz</span>
                    </div>
                    <div className="flex flex-col pl-2">
                        <span className="text-neutral-500 uppercase font-medium tracking-mono">Elements</span>
                        <span className="text-cyan-400 font-semibold font-mono uppercase tracking-tighter truncate flex items-center mt-0.5">
                            {result.elements.map((el: string) => (
                                <span key={el} className="flex items-center mr-1">
                                    {getElementIcon(el)}{el}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
});

ParameterPanel.displayName = 'ParameterPanel';

// --- 3. COMPONENTE PRINCIPAL: MOTOR DE RED REESTRUCTURADO ---
export default function DeepDreamEngine() { 
    const [isGenerating, setIsGenerating] = useState(false);
    const [scenePrompt, setScenePrompt] = useState('');
    const [result, setResult] = useState<TransmutationResult | null>(null);

    const handleTransmutation = async () => {
        if (!scenePrompt.trim()) return;

        setIsGenerating(true);
        try {
            const response = await fetch(BASE_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: scenePrompt }),
            });

            if (!response.ok) throw new Error(`Quantum disruption: ${response.status}`);
            
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error collapsing wave function:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    // FUNCIÓN GENERADORA DE DERIVACIÓN FRACTAL (Geometría Sagrada de Alta Densidad Estilizada)
    const renderMandalaLayers = () => {
        if (!result || !result.geometry_nodes.length) return null;

        const nodes = result.geometry_nodes;
        const total = nodes.length;
        const hz = result.frequency_hz || 432;
        const activeColor = result.glow_color || "#22d3ee";
        const fallbackSecondary = result.secondary_color || activeColor;

        // Saltos armónicos adaptables basados en la resonancia recibida
        const step1 = 1;
        const step2 = Math.max(2, Math.floor((hz % 4) + 2)); 
        const step3 = Math.max(5, Math.floor(total / 2)); 

        return nodes.map((point, index) => {
            const rx = point.x;
            const ry = point.y;

            // Nodos entrelazados nativos puros
            const p1 = nodes[(index + step1) % total];
            const p2 = nodes[(index + step2) % total];
            const p3 = nodes[(index + step3) % total];

            return (
                <g key={`mandala-vertex-${index}`} className="transition-all duration-700 ease-in-out">
                    {/* Capa de Red 1: Perímetro de Contención Energética */}
                    {p1 && (
                        <line
                            x1={rx} y1={ry} x2={p1.x} y2={p1.y}
                            stroke={activeColor}
                            strokeWidth="1.4"
                            opacity="0.9"
                            style={{ filter: 'url(#cosmic-glow-heavy)' }}
                        />
                    )}
                    
                    {/* Capa de Red 2: Cruces Armónicos Sagrados (Pétalos de Loto / Estrellas) */}
                    {p2 && (
                        <>
                            <line
                                x1={rx} y1={ry} x2={p2.x} y2={p2.y}
                                stroke={fallbackSecondary}
                                strokeWidth="0.8"
                                opacity="0.6"
                                strokeDasharray={hz % 2 === 0 ? "none" : "4,3"}
                                style={{ filter: 'url(#cosmic-glow-light)' }}
                            />
                            {/* Partícula de Luz Orbitante en los canales armónicos secundarios */}
                            {index % 3 === 0 && (
                                <circle r="1.5" fill="#ffffff">
                                    <animateMotion 
                                        dur={`${(hz % 5) + 3}s`} 
                                        repeatCount="indefinite"
                                        path={`M ${rx} ${ry} L ${p2.x} ${p2.y}`} 
                                    />
                                </circle>
                            )}
                        </>
                    )}

                    {/* Capa de Red 3: Red de Expansión del Núcleo */}
                    {p3 && (
                        <line
                            x1={rx} y1={ry} x2={p3.x} y2={p3.y}
                            stroke={activeColor}
                            strokeWidth="0.5"
                            opacity="0.35"
                            strokeDasharray="2,6"
                        />
                    )}
                    
                    {/* Nodos de Conciencia Cristalina (Efecto Lente Esférico Glow) */}
                    <circle
                        cx={rx}
                        cy={ry}
                        r={index % 2 === 0 ? "3.5" : "2"}
                        fill="#ffffff"
                        stroke={activeColor}
                        strokeWidth="1.5"
                        className="animate-pulse"
                        style={{ 
                            filter: 'url(#cosmic-glow-heavy)',
                            transformOrigin: `${rx}px ${ry}px`
                        }}
                    />
                    {/* Núcleo hiper-brillante interno del nodo */}
                    <circle cx={rx} cy={ry} r="1" fill="#ffffff" />
                </g>
            );
        });
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#030303] text-white p-6 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            <header className="text-center mb-6 relative">
                <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-sm"></div>
                <h1 className="text-2xl font-black text-cyan-400 mb-1 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] tracking-wide uppercase">
                    🌌 Cosmic Architect ✨⚛️✨
                </h1>
                <p className="text-[9px] text-zinc-500 tracking-[0.25em] uppercase font-mono">
                    Quantum Sacred Geometry Engine
                </p>
            </header>

            {/* CANVAS AREA (Rotación fluida y resplandor adaptativo de fondo) */}
            <div className="w-full flex justify-center mb-5">
                <div className="relative group max-w-full">
                    {/* Efecto Aura Aurora detrás de la matriz */}
                    <div 
                        className="absolute -inset-2 rounded-2xl blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000 duration-700"
                        style={{ 
                            background: result ? `radial-gradient(circle, ${result.glow_color} 0%, transparent 70%)` : 'radial-gradient(circle, #0891b2 0%, transparent 70%)' 
                        }}
                    ></div>
                    
                    <div 
                        className="relative bg-black/90 rounded-xl border border-zinc-800/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-4"
                        style={{ width: '500px', height: '380px', maxWidth: '95vw', maxHeight: '45vh' }}
                    >
                        {result ? (
                            <div className="flex flex-col items-center justify-center w-full h-full relative">
                                <svg 
                                    width="100%" 
                                    height="100%" 
                                    viewBox="0 0 300 300" 
                                    className="animate-[spin_26s_linear_infinite]"
                                    style={{ willChange: 'transform' }}
                                >
                                    <defs>
                                        {/* Filtro de Resplandor Alquímico Pesado */}
                                        <filter id="cosmic-glow-heavy" x="-40%" y="-40%" width="180%" height="180%">
                                            <feGaussianBlur stdDeviation="4" result="blur1" />
                                            <feGaussianBlur stdDeviation="1.5" result="blur2" />
                                            <feMerge>
                                                <feMergeNode in="blur1" />
                                                <feMergeNode in="blur2" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>

                                        {/* Filtro de Resplandor Sutil */}
                                        <filter id="cosmic-glow-light" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="1" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Capas de geometría sagrada */}
                                    {renderMandalaLayers()}
                                </svg>
                                
                                {/* Status inferior estilizado y corregido */}
                                <span 
                                    className="absolute bottom-2 text-[8px] tracking-[0.25em] uppercase font-mono px-3 py-1 bg-neutral-950/80 border border-neutral-900 rounded-full shadow-md backdrop-blur-sm max-w-[85%] truncate transition-all duration-300"
                                    style={{ color: result.glow_color, textShadow: `0 0 8px ${result.glow_color}40` }}
                                >
                                    {result.alchemy_status || 'Resonant Blueprint Active'}
                                </span>
                            </div>
                        ) : (
                            <div className="text-center p-6 space-y-4">
                                <div className="w-12 h-12 rounded-full border border-cyan-500/20 flex items-center justify-center mx-auto animate-pulse bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <Zap className="w-5 h-5 text-cyan-400 animate-bounce" />
                                </div>
                                <p className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-mono max-w-xs">
                                    Waiting for wave function collapse...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTROLS AREA */}
            <div className="w-full max-w-2xl space-y-4 flex flex-col items-center">
                
                <ParameterPanel 
                    scenePrompt={scenePrompt}
                    setScenePrompt={setScenePrompt}
                    isGenerating={isGenerating}
                    result={result}
                />

                <div className="w-full max-w-2xl flex gap-3">
                    <button
                        onClick={handleTransmutation}
                        disabled={!scenePrompt.trim() || isGenerating}
                        style={{
                            boxShadow: (!scenePrompt.trim() || isGenerating) ? 'none' : `0 0 20px ${(result?.glow_color || '#06b6d4')}30`
                        }}
                        className={`flex-1 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group
                            ${isGenerating 
                                ? 'bg-zinc-950 text-cyan-400 border border-cyan-500/20 shadow-inner cursor-not-allowed' 
                                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:scale-[1.01] active:scale-[0.99] disabled:opacity-20 shadow-md'
                            }`}
                    >
                        {isGenerating ? (
                            <> 
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" /> 
                                <span className="animate-pulse">Transmuting Matrix...</span> 
                            </>
                        ) : (
                            <> 
                                <Sparkles className="w-3.5 h-3.5 text-cyan-200 group-hover:rotate-12 transition-transform" /> 
                                <span>Transmute Energy ✨</span> 
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}