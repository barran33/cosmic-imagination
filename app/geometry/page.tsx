'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo, memo } from 'react';
import { Loader2, Cloud, SlidersHorizontal, CheckCircle, RotateCcw, PenTool, Sparkles } from 'lucide-react';

// --- 1. CONSTANTES ---
const NEURAL_LAYERS_OPTIONS = [
    { label: 'Textures', value: 'mixed3' },
    { label: 'Patterns', value: 'mixed6' },
    { label: 'Deep Visions', value: 'mixed9' },
];

const FASTAPI_DREAM_URL = "http://localhost:8000/api/v1/cosmic-dream/image";
const FASTAPI_HYBRID_URL = "http://localhost:8000/api/v1/cosmic-dream/hybrid-synthesis";
const ASPECT_RATIO = 4 / 3;
const STEPS_PER_REQUEST = 1;

// --- 2. SUBCOMPONENTE DE CONTROLES (COMPACTADO) ---
const ParameterPanel = memo(({ 
    scenePrompt, 
    setScenePrompt, 
    selectedLayer, 
    setSelectedLayer, 
    dreamSteps, 
    setDreamSteps, 
    dreamStepSize, 
    setDreamStepSize, 
    isGenerating 
}: any) => {
    return (
        /* Reducido max-w-3xl a max-w-2xl y padding p-4 a p-3 */
        <div className="flex flex-col items-start p-3 bg-black/70 border border-cyan-700/50 rounded-xl shadow-lg shadow-cyan-900/20 w-full max-w-2xl">
            
            <h2 className="text-xs font-semibold text-cyan-400 flex items-center justify-center w-full mb-3 text-neon-glow-css border-b border-cyan-800 pb-1 uppercase tracking-wider">
                <SlidersHorizontal className="w-3 h-3 mr-2" /> Cosmic Creation Panel
            </h2>

            {/* AREA DEL PROMPT - Más fina */}
            <div className="w-full mb-3">
                <label className="text-[12px] font-bold text-cyan-300 flex items-center mb-1 uppercase tracking-tighter">
                    <PenTool className='w-3 h-3 mr-2' /> 
                    User Vision:
                </label>
                <textarea
                    value={scenePrompt}
                    onChange={(e) => setScenePrompt(e.target.value)}
                    disabled={isGenerating}
                    rows={2} /* Reducido de 3 a 2 para ahorrar altura */
                    placeholder="Describe what you imagine and make your ideas a reality..."
                    className="w-full bg-gray-900/80 text-cyan-100 border border-cyan-900/50 rounded-lg p-2 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all outline-none placeholder:text-gray-600 shadow-inner"
                />
            </div>

            <div className="flex flex-wrap w-full gap-3">
                {/* Capas */}
                <div className="flex-1 min-w-[120px]">
                    <label className="text-[9px] font-medium text-cyan-500 block mb-1 uppercase tracking-tighter">Neural Style</label>
                    <select
                        value={selectedLayer}
                        onChange={(e) => setSelectedLayer(e.target.value)}
                        disabled={isGenerating}
                        className="w-full bg-gray-800 text-cyan-100 border border-gray-700 rounded-md p-1 text-[10px] outline-none focus:border-cyan-500"
                    >
                        {NEURAL_LAYERS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                
                {/* Pasos */}
                <div className="flex-1 min-w-[120px]">
                    <label className="text-[9px] font-medium text-cyan-500 block mb-1 uppercase tracking-tighter">Steps: {dreamSteps}</label>
                    <input
                        type="range" min="10" max="150" step="10"
                        value={dreamSteps}
                        onChange={(e) => setDreamSteps(Number(e.target.value))}
                        disabled={isGenerating}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>

                {/* Intensidad */}
                <div className="flex-1 min-w-[120px]">
                    <label className="text-[9px] font-medium text-cyan-500 block mb-1 uppercase tracking-tighter">Intensity: {dreamStepSize.toFixed(3)}</label>
                    <input
                        type="range" min="0.01" max="0.10" step="0.01"
                        value={dreamStepSize}
                        onChange={(e) => setDreamStepSize(Number(e.target.value))}
                        disabled={isGenerating}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                </div>
            </div>
        </div>
    );
});

ParameterPanel.displayName = 'ParameterPanel';

// --- 3. COMPONENTE PRINCIPAL ---
export default function DeepDreamEngine() { 
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); 
    const renderId = useRef(0); 

    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStage, setCurrentStage] = useState('IDLE');
    const [apiError, setApiError] = useState<string | null>(null); 
    const [generationId, setGenerationId] = useState(0);

    const [scenePrompt, setScenePrompt] = useState('');
    const [dreamSteps, setDreamSteps] = useState(60); 
    const [dreamStepSize, setDreamStepSize] = useState(0.090); 
    const [selectedLayer, setSelectedLayer] = useState(NEURAL_LAYERS_OPTIONS[1].value); 

    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(600);
    const [progressStep, setProgressStep] = useState(0);

    const calculateCanvasSize = useCallback(() => {
        if (!containerRef.current) return;
        const availableWidth = containerRef.current.offsetWidth;
        const newWidth = Math.min(availableWidth * 0.98, 650); /* Reducido ligeramente de 700 a 650 */
        setCanvasWidth(Math.round(newWidth));
        setCanvasHeight(Math.round(newWidth / ASPECT_RATIO));
    }, []);

    useEffect(() => {
        calculateCanvasSize();
        window.addEventListener('resize', calculateCanvasSize);
        return () => window.removeEventListener('resize', calculateCanvasSize);
    }, [calculateCanvasSize]);

    const fetchImage = useCallback(async (payload: any, url: string): Promise<HTMLImageElement | null> => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const blob = await res.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.crossOrigin = "anonymous";
            await img.decode();
            return img;
        } catch (error: any) {
            setApiError(error.message);
            return null;
        }
    }, []);

    const startDeepDreamProcess = useCallback(async () => {
        const currentId = ++renderId.current;
        setIsGenerating(true);
        setApiError(null);
        setProgressStep(0);

        setCurrentStage('LOADING_SCENE_AI');
        const hybridPayload = {
            scene: { prompt: scenePrompt, negative_prompt: "low quality, blurry, distorted" },
            dream: { width: canvasWidth, height: canvasHeight, seedImageId: "init", steps: 1, stepSize: dreamStepSize, isProcessed: true, neuralLayer: selectedLayer }
        };

        const baseImg = await fetchImage(hybridPayload, FASTAPI_HYBRID_URL);
        if (!baseImg || currentId !== renderId.current) return;

        const ctx = canvasRef.current?.getContext('2d');
        ctx?.drawImage(baseImg, 0, 0, canvasWidth, canvasHeight);
        setProgressStep(1);

        setCurrentStage('ITERATING');
        const totalRequests = Math.ceil(dreamSteps / STEPS_PER_REQUEST);

        for (let i = 1; i < totalRequests; i++) {
            if (currentId !== renderId.current) break;

            const b64 = canvasRef.current?.toDataURL('image/png');
            const iterImg = await fetchImage({
                width: canvasWidth, height: canvasHeight, seedImageId: b64, steps: STEPS_PER_REQUEST, stepSize: dreamStepSize, isProcessed: true, neuralLayer: selectedLayer
            }, FASTAPI_DREAM_URL);

            if (!iterImg) break;
            ctx?.drawImage(iterImg, 0, 0, canvasWidth, canvasHeight);
            setProgressStep(i + 1);
        }

        setIsGenerating(false);
        setCurrentStage('IDLE');
    }, [canvasWidth, canvasHeight, dreamSteps, dreamStepSize, scenePrompt, selectedLayer, fetchImage]);

    useEffect(() => {
        if (generationId > 0) startDeepDreamProcess();
    }, [generationId, startDeepDreamProcess]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#050505] text-white p-6 font-sans selection:bg-cyan-500/30">
            
            <header className="text-center mb-4">
                <h1 className="text-2xl font-black text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] shadow-cyan-500">
                    🌌 Cosmic Architect ✨👨🏻‍🎨✨
                </h1>
                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                    Deep Dream Engine
                </p>
            </header>

            {/* CANVAS AREA (Más compacto) */}
            <div ref={containerRef} className="w-full flex justify-center mb-4">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <canvas
                        ref={canvasRef}
                        width={canvasWidth}
                        height={canvasHeight}
                        className="relative bg-black rounded-lg border border-white/10 shadow-xl"
                        style={{ maxWidth: '95vw', maxHeight: '50vh', objectFit: 'contain' }}
                    />
                </div>
            </div>

            {/* CONTROLS AREA - REFINADO */}
            <div className="w-full max-w-2xl space-y-3 flex flex-col items-center">
                
                <ParameterPanel 
                    scenePrompt={scenePrompt}
                    setScenePrompt={setScenePrompt}
                    selectedLayer={selectedLayer}
                    setSelectedLayer={setSelectedLayer}
                    dreamSteps={dreamSteps}
                    setDreamSteps={setDreamSteps}
                    dreamStepSize={dreamStepSize}
                    setDreamStepSize={setDreamStepSize}
                    isGenerating={isGenerating}
                />

                <div className="w-full max-w-2xl flex gap-3">
                    <button
                        onClick={() => isGenerating ? (renderId.current++, setIsGenerating(false)) : setGenerationId(g => g + 1)}
                        disabled={!scenePrompt.trim() && !isGenerating}
                        className={`flex-1 py-2.5 rounded-lg font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                            ${isGenerating 
                                ? 'bg-red-cyan-300 text-white border border-cyan-300/50 hover:bg-cyan-400/30 shadow-cyan-300' 
                                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] disabled:opacity-30'
                            }`}
                    >
                        {isGenerating ? (
                            <> <RotateCcw className="w-3.5 h-3.5 animate-spin" /> Creating Art🎨 </>
                        ) : (
                            <> <Sparkles className="w-4.5 h-4.5" /> Generate Visions✨ </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}