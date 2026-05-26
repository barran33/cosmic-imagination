'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, RefreshCcw, Trophy, Mail, User, MessageSquare, Phone, Crosshair, Shield, Cpu, Activity } from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS ---
const FACCIONES = {
  blue: {
    id: 'blue',
    name: 'Blue Team / Defensa',
    color: '#00FFFF', // Cyan Neon
    pool: [
      { q: 'Un atacante inunda tu API causando picos masivos. ¿Cómo lo mitigas?', a: ['Honeypot estático', 'Rate Limiting estricto', 'Escalado vertical', 'Cifrar tablas SQL'], c: 1 },
      { q: '¿Qué control ISO/IEC 27001 asegura la gestión de vulnerabilidades?', a: ['Control A.5.15', 'Control A.8.8', 'Control A.7.2', 'Control A.5.1'], c: 1 }
    ]
  },
  red: {
    id: 'red',
    name: 'Red Team / Ofensivo',
    color: '#a855f7', // Púrpura/Neón
    pool: [
      { q: 'Detectas un endpoint vulnerable a SQLi. ¿Qué payload valida el bypass?', a: ["' OR '1'='1", '<script>alert(1)</script>', '&& sudo rm -rf /', 'admin/../../etc/passwd'], c: 0 },
      { q: '¿Herramienta para un escaneo de puertos sigiloso (SYN Stealth)?', a: ['Burp Suite', 'Nmap -sS -Pn', 'SQLmap --crawl', 'Wireshark'], c: 1 }
    ]
  }
};

const PERSONAJES = [
  { id: 'char_1', name: 'Cosmic Pirate', class: 'Cyber Architect', cardImg: '/cosmic-universe/cards/space_pirate33.PNG', assetImg: '/cosmic-universe/assets/space_pirate3.png', stats: [ { label: 'PROCESAMIENTO', val: 90 }, { label: 'SIGILO', val: 96 }, { label: 'ESTABILIDAD', val: 85 } ] },
  { id: 'char_2', name: 'Celestial Hacker', class: 'Captain369', cardImg: '/cosmic-universe/cards/capitan369.png', assetImg: '/cosmic-universe/assets/captain369.png', stats: [ { label: 'PROCESAMIENTO', val: 60 }, { label: 'SIGILO', val: 95 }, { label: 'ESTABILIDAD', val: 50 } ] },
  { id: 'char_3', name: 'Galactic warrior', class: 'Code Samurai', cardImg: '/cosmic-universe/cards/pirate66.PNG', assetImg: '/cosmic-universe/assets/space_pirate9.png', stats: [ { label: 'PROCESAMIENTO', val: 75 }, { label: 'SIGILO', val: 30 }, { label: 'ESTABILIDAD', val: 98 } ] },
  { id: 'char_4', name: 'Chrono Hacker', class: 'Time Manipulator', cardImg: '/cosmic-universe/cards/guardian33.PNG', assetImg: '/cosmic-universe/assets/guardian3.png', stats: [ { label: 'PROCESAMIENTO', val: 88 }, { label: 'SIGILO', val: 70 }, { label: 'ESTABILIDAD', val: 65 } ] },
  { id: 'char_5', name: 'Aether Blade', class: 'Energy Vanguard', cardImg: '/cosmic-universe/cards/guardian99.PNG', assetImg: '/cosmic-universe/assets/guardian9.png', stats: [ { label: 'PROCESAMIENTO', val: 80 }, { label: 'SIGILO', val: 85 }, { label: 'ESTABILIDAD', val: 70 } ] },
  { id: 'char_6', name: 'Cosmic Oracle', class: 'Data Seer', cardImg: '/cosmic-universe/cards/guardian66.PNG', assetImg: '/cosmic-universe/assets/guardian6.png', stats: [ { label: 'PROCESAMIENTO', val: 99 }, { label: 'SIGILO', val: 50 }, { label: 'ESTABILIDAD', val: 60 } ] }
];

interface CosmicPortalProps { isOpen: boolean; onClose: () => void; }

export default function CosmicPortal({ isOpen, onClose }: CosmicPortalProps) {
  type GameState = 'SELECT_CHAR' | 'SELECT_FACTION' | 'PLAYING' | 'GAME_OVER';
  const [gameState, setGameState] = useState<GameState>('SELECT_CHAR');
  const [charIndex, setCharIndex] = useState(0);
  const [selectedFaction, setSelectedFaction] = useState<keyof typeof FACCIONES | null>(null);
  
  const [highScore, setHighScore] = useState(0);
  const [triviaActive, setTriviaActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [showContact, setShowContact] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const scoreDisplayRef = useRef<HTMLSpanElement | null>(null);

  const engineRef = useRef({
    playerY: 225, velocity: 0, gravity: 0.35, jump: -7.5, angle: 0,
    obstacles: [] as any[], nodes: [] as any[], particles: [] as any[],
    frame: 0, speed: 4.5, avatarImg: null as HTMLImageElement | null, color: '#00FFFF', internalScore: 0
  });

  const activeChar = PERSONAJES[charIndex];

  useEffect(() => {
    if (gameState === 'PLAYING') {
      const img = new Image();
      img.src = activeChar.assetImg;
      img.onload = () => { engineRef.current.avatarImg = img; };
      if (selectedFaction) engineRef.current.color = FACCIONES[selectedFaction].color;
    }
  }, [gameState, activeChar, selectedFaction]);

  const handleJump = () => {
    if (gameState !== 'PLAYING' || triviaActive || showContact) return;
    engineRef.current.velocity = engineRef.current.jump;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'PLAYING' && !triviaActive && !showContact) {
        e.preventDefault(); handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, triviaActive, showContact]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // MOTOR GRÁFICO NATIVO (Zero-Lag)
  useEffect(() => {
    if (!isOpen || gameState !== 'PLAYING' || triviaActive || showContact) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const L_WIDTH = 800;
    const L_HEIGHT = 450;
    canvas.width = L_WIDTH;
    canvas.height = L_HEIGHT;

    const gameLoop = () => {
      const state = engineRef.current;
      state.frame++;

      ctx.fillStyle = '#020205';
      ctx.fillRect(0, 0, L_WIDTH, L_HEIGHT);

      ctx.strokeStyle = `${state.color}08`;
      ctx.lineWidth = 1;
      const offsetX = (state.frame * state.speed) % 50;
      for (let x = -offsetX; x < L_WIDTH; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, L_HEIGHT); ctx.stroke();
      }

      state.velocity += state.gravity;
      state.playerY += state.velocity;
      const targetAngle = Math.min(Math.max(state.velocity * 0.06, -0.5), 0.6);
      state.angle += (targetAngle - state.angle) * 0.15;

      if (state.playerY > L_HEIGHT - 40 || state.playerY < 20) {
        setHighScore(prev => Math.max(prev, state.internalScore));
        setGameState('GAME_OVER');
        return;
      }

      if (state.frame % 2 === 0) {
        state.particles.push({
          x: 100, y: state.playerY + (Math.random() * 16 - 8),
          size: Math.random() * 5 + 2, alpha: 1, speedY: Math.random() * 2 - 1
        });
      }

      state.particles.forEach((p, idx) => {
        p.x -= state.speed * 0.8; p.y += p.speedY; p.alpha -= 0.03;
        if (p.alpha <= 0) { state.particles.splice(idx, 1); return; }
        ctx.fillStyle = `${state.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });

      ctx.save();
      ctx.translate(120, state.playerY);
      ctx.rotate(state.angle);
      if (state.avatarImg) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = state.color;
        ctx.drawImage(state.avatarImg, -40, -40, 80, 80);
      } else {
        ctx.fillStyle = state.color;
        ctx.fillRect(-30, -30, 60, 60);
      }
      ctx.restore();

      if (state.frame % 120 === 0) {
        const gap = 150;
        const topHeight = Math.floor(Math.random() * (L_HEIGHT - gap - 80)) + 40;
        state.obstacles.push({ x: L_WIDTH, top: topHeight, bottom: L_HEIGHT - topHeight - gap, passed: false });
      }
      if (state.frame % 300 === 0) {
        state.nodes.push({ x: L_WIDTH, y: Math.floor(Math.random() * (L_HEIGHT - 120)) + 60, collected: false });
      }

      state.obstacles.forEach((obs) => {
        obs.x -= state.speed;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
        ctx.fillRect(obs.x, 0, 40, obs.top); ctx.strokeRect(obs.x, -2, 40, obs.top + 2);
        ctx.fillRect(obs.x, L_HEIGHT - obs.bottom, 40, obs.bottom); ctx.strokeRect(obs.x, L_HEIGHT - obs.bottom, 40, obs.bottom + 2);

        if (obs.x < 150 && obs.x + 40 > 90) {
          if (state.playerY - 25 < obs.top || state.playerY + 25 > L_HEIGHT - obs.bottom) {
            setHighScore(prev => Math.max(prev, state.internalScore));
            setGameState('GAME_OVER');
          }
        }
        
        if (!obs.passed && obs.x < 90) { 
          obs.passed = true; 
          state.internalScore += 10;
          if (scoreDisplayRef.current) {
            scoreDisplayRef.current.innerText = state.internalScore.toString();
          }
        }
      });

      state.nodes.forEach((node, idx) => {
        node.x -= state.speed;
        ctx.save(); ctx.shadowBlur = 15; ctx.shadowColor = '#eab308'; ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(node.x, node.y, 10, 0, Math.PI * 2); ctx.fill(); ctx.restore();

        const dist = Math.hypot(node.x - 120, node.y - state.playerY);
        if (dist < 40 && !node.collected) {
          node.collected = true; state.nodes.splice(idx, 1);
          if (selectedFaction) {
            const pool = FACCIONES[selectedFaction].pool;
            setCurrentQuestion(pool[Math.floor(Math.random() * pool.length)]);
            setTriviaActive(true);
          }
        }
      });

      state.obstacles = state.obstacles.filter(o => o.x > -60);
      state.nodes = state.nodes.filter(n => n.x > -60);

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [gameState, triviaActive, showContact, selectedFaction]);

  const startGame = (factionKey: keyof typeof FACCIONES) => {
    setSelectedFaction(factionKey);
    setTriviaActive(false);
    setShowContact(false);
    engineRef.current = {
      playerY: 225, velocity: 0, gravity: 0.35, jump: -7.5, angle: 0,
      obstacles: [], nodes: [], particles: [], frame: 0, speed: 4.5,
      avatarImg: engineRef.current.avatarImg, color: FACCIONES[factionKey].color, internalScore: 0
    };
    if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = "0";
    setGameState('PLAYING');
  };

  const handleAnswer = (index: number) => {
    if (index === currentQuestion.correct) {
      engineRef.current.internalScore += 50;
      if (scoreDisplayRef.current) {
        scoreDisplayRef.current.innerText = engineRef.current.internalScore.toString();
      }
      engineRef.current.speed = Math.max(3.0, engineRef.current.speed - 0.5);
    } else {
      engineRef.current.speed += 0.8;
    }
    setTriviaActive(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // OVERLAY: Bloqueado el scroll externo para forzar la inmersión tipo app
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-md overflow-hidden">
          
          {/* CONTENEDOR MODAL: Altura controlada al 96% del Viewport en móvil para evitar scroll indeseado */}
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="relative w-full max-w-6xl bg-[#030305] border border-neutral-800 rounded-xl md:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col my-auto h-[96vh] md:h-auto md:max-h-[90vh]">
            
            {/* HEADER */}
            <div className="flex border-b border-neutral-900 bg-black/60 justify-between items-center px-3 py-2 md:px-5 md:py-3 shrink-0">
              <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-xs tracking-wider text-neutral-400">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                <span className="truncate max-w-[150px] md:max-w-none">COSMIC DEV ENGINE v3.5 (FLUID MATRIX)</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button onClick={() => setShowContact(!showContact)} className="px-2 py-1 md:px-4 md:py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-md font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-cyan-400 transition-all bg-cyan-950/10 hover:bg-cyan-900/30">
                  {showContact ? '// ABORTAR' : '// CONTACTO'}
                </button>
                <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-1"><X className="w-4 h-4 md:w-5 md:h-5" /></button>
              </div>
            </div>

            {/* BODY: Maneja el flex para distribuir elementos dinámicamente sin scroll */}
            <div className="p-3 md:p-10 bg-gradient-to-b from-black to-[#050508] relative flex-1 flex flex-col justify-center overflow-y-auto overflow-x-hidden md:overflow-visible">
              
              {/* === ESTADO: SELECT_CHAR (TOTALMENTE RESPONSIVO) === */}
              {gameState === 'SELECT_CHAR' && !showContact && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-8 items-center justify-between md:justify-center w-full h-full min-h-0">
                  
                  {/* 1. CARTA GRANDE (Arriba en Móvil, Izquierda en PC) */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center shrink-0 w-full h-[30vh] md:h-auto">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeChar.id}
                        initial={{ opacity: 0, scale: 0.95, x: -10 }} 
                        animate={{ opacity: 1, scale: 1, x: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, x: 10 }}
                        transition={{ duration: 0.3 }}
                        // La altura en móvil está atada al % de pantalla para asegurar el encaje
                        className="h-full aspect-[2/3] md:w-64 md:h-96 md:aspect-auto border border-cyan-400/50 rounded-xl md:rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(0,255,255,0.25)] group bg-black"
                      >
                        <img src={activeChar.cardImg} alt={activeChar.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3 md:p-6">
                          <span className="font-mono text-[8px] md:text-[10px] text-cyan-400 tracking-widest uppercase mb-0.5 md:mb-1.5">// {activeChar.class} //</span>
                          <h3 className="text-white font-bold text-sm md:text-xl uppercase tracking-wider mb-0.5 md:mb-2 leading-tight">{activeChar.name}</h3>
                          <p className="text-neutral-400 text-[9px] md:text-xs font-sans leading-snug hidden md:block">
                        
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* 2. CUADRÍCULA MINIATURAS (Medio en Móvil, Centro en PC) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center w-full shrink-0">
                    <div className="hidden md:block text-left w-full border-b border-neutral-900 pb-2 mb-6">
                      <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase">// SELECCIONAR ARQUETIPO</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[260px] md:max-w-none mx-auto">
                      {PERSONAJES.map((char, index) => {
                        const isSelected = index === charIndex;
                        return (
                          <div 
                            key={char.id}
                            onClick={() => setCharIndex(index)}
                            className={`aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden border cursor-pointer relative transition-all duration-300 group ${
                              isSelected 
                                ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)] scale-105 z-10' 
                                : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-500'
                            }`}
                          >
                            <img src={char.cardImg} alt={char.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-1.5 md:p-2 flex items-end transition-opacity ${
                              isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
                            }`}>
                              <span className="text-[8px] md:text-[9px] font-mono font-bold text-white uppercase truncate tracking-tight block w-full text-center md:text-left">
                                {char.name.split(' ')[0]}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,1)]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. STATS + BOTÓN (Abajo en Móvil, Derecha en PC) */}
                  <div className="md:col-span-3 flex flex-col justify-end md:justify-center w-full px-1 md:px-2 gap-2 md:gap-8 shrink-0 pb-1 md:pb-0">
                    
                    {/* STATS: Reestructuradas horizontalmente en móvil (grid-cols-3) */}
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-5 w-full bg-black/40 md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none border border-neutral-900 md:border-none">
                      {activeChar.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col space-y-1 md:space-y-2">
                          <div className="flex flex-col md:flex-row md:justify-between font-mono text-[7px] md:text-[10px] uppercase tracking-widest text-center md:text-left">
                            <span className="text-neutral-400 flex items-center justify-center md:justify-start gap-1 md:gap-2">
                              <span className="hidden md:block">
                                {i === 0 && <Cpu className="w-4 h-4 text-cyan-500" />}
                                {i === 1 && <Crosshair className="w-4 h-4 text-cyan-500" />}
                                {i === 2 && <Activity className="w-4 h-4 text-cyan-500" />}
                              </span>
                              {/* Recorte inteligente de texto para evitar roturas en móvil */}
                              <span className="block md:hidden">{stat.label.substring(0, 4)}</span>
                              <span className="hidden md:block">{stat.label}</span>
                            </span>
                            <span className="text-cyan-400 font-bold mt-0.5 md:mt-0 leading-none">{stat.val}%</span>
                          </div>
                          <div className="w-full h-1 md:h-2 bg-neutral-900 rounded-full overflow-hidden">
                            <motion.div 
                              key={`${activeChar.id}-${i}`}
                              initial={{ width: 0 }} 
                              animate={{ width: `${stat.val}%` }} 
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* BOTÓN SINTONIZAR */}
                    <button 
                      onClick={() => setGameState('SELECT_FACTION')} 
                      className="w-full py-2.5 md:py-4 bg-cyan-950/40 border-2 border-cyan-400 text-cyan-400 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-lg md:rounded-xl hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,255,0.15)] active:scale-95"
                    >
                      SINTONIZAR
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SELECCIÓN DE FACCIÓN */}
              {gameState === 'SELECT_FACTION' && !showContact && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center space-y-6 md:space-y-10 h-full py-4 md:py-10">
                  <div className="text-center space-y-2 md:space-y-3">
                    <h2 className="text-white font-mono text-lg md:text-xl font-bold tracking-widest uppercase">// PROTOCOLO DE DESPLIEGUE</h2>
                    <p className="text-neutral-500 text-xs md:text-sm font-sans">Selecciona el vector de aproximación para el entorno de simulación.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-3xl px-2 md:px-0">
                    <div onClick={() => startGame('blue')} className="group cursor-pointer border-2 border-cyan-900/50 bg-cyan-950/10 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-cyan-400 hover:bg-cyan-900/20 transition-all flex flex-col items-center text-center space-y-3 md:space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                      <Shield className="w-10 h-10 md:w-16 md:h-16 text-cyan-400 group-hover:scale-110 transition-transform relative z-10" />
                      <div className="relative z-10">
                        <h3 className="text-white font-mono text-sm md:text-base font-bold uppercase tracking-wider mb-1 md:mb-2">Blue Team</h3>
                        <p className="text-neutral-400 text-[10px] md:text-xs leading-relaxed">Defensa proactiva. Mitigación de riesgos, normas ISO/IEC 27001 y arquitectura segura.</p>
                      </div>
                    </div>

                    <div onClick={() => startGame('red')} className="group cursor-pointer border-2 border-purple-900/50 bg-purple-950/10 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-purple-400 hover:bg-purple-900/20 transition-all flex flex-col items-center text-center space-y-3 md:space-y-5 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-purple-500/10 blur-3xl rounded-full" />
                      <Zap className="w-10 h-10 md:w-16 md:h-16 text-purple-400 group-hover:scale-110 transition-transform relative z-10" />
                      <div className="relative z-10">
                        <h3 className="text-white font-mono text-sm md:text-base font-bold uppercase tracking-wider mb-1 md:mb-2">Red Team</h3>
                        <p className="text-neutral-400 text-[10px] md:text-xs leading-relaxed">Operaciones ofensivas. Pentesting, explotación de vulnerabilidades y bypass táctico.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={() => setGameState('SELECT_CHAR')} className="text-neutral-500 hover:text-white font-mono text-[10px] md:text-xs tracking-widest uppercase transition-colors pt-2 md:pt-4">
                    &lt; Regresar al selector
                  </button>
                </motion.div>
              )}

              {/* PANTALLA DE JUEGO */}
              {(gameState === 'PLAYING' || gameState === 'GAME_OVER') && !showContact && (
                <div className="w-full flex flex-col items-center justify-center h-full">
                  
                  <div className="flex justify-between items-center w-full max-w-[800px] font-mono text-[10px] md:text-xs mb-3 md:mb-4 px-2 text-neutral-400">
                    <span className="text-white tracking-widest flex items-center gap-2">
                      SCORE: <strong ref={scoreDisplayRef} className="text-base md:text-xl" style={{ color: selectedFaction ? FACCIONES[selectedFaction].color : '#fff' }}>0</strong>
                    </span>
                    <span className="flex items-center gap-1.5"><Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" /> TOP: <strong>{highScore}</strong></span>
                  </div>

                  <div className="relative w-full max-w-[800px] aspect-video bg-black rounded-lg md:rounded-xl overflow-hidden border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    
                    {triviaActive && currentQuestion && (
                      <div className="absolute inset-0 z-30 flex flex-col justify-center bg-black/95 p-4 md:p-8 space-y-4 md:space-y-6">
                        <div className="border-b border-yellow-500/20 pb-2 md:pb-3 flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs font-bold text-yellow-400">
                          <Zap className="w-4 h-4 md:w-5 md:h-5 animate-pulse" /> // INTERRUPCIÓN TÁCTICA DETECTADA
                        </div>
                        <p className="text-white text-sm md:text-lg font-sans leading-relaxed">{currentQuestion.q}</p>
                        <div className="grid grid-cols-1 gap-2 md:gap-3">
                          {currentQuestion.a.map((opt: string, idx: number) => (
                            <button key={idx} onClick={() => handleAnswer(idx)} className="w-full text-left p-3 md:p-4 rounded-lg md:rounded-xl bg-neutral-900 border border-neutral-800 text-xs md:text-sm text-neutral-300 hover:border-cyan-400 hover:bg-cyan-950/20 hover:text-white transition-all">
                              {idx + 1}. {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {gameState === 'GAME_OVER' && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-4 md:p-6 text-center space-y-4 md:space-y-6 backdrop-blur-sm">
                        <div className="space-y-1 md:space-y-2">
                          <span className="text-red-500 font-mono text-sm md:text-base font-bold tracking-widest block uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">// CONEXIÓN PERDIDA</span>
                          <p className="text-neutral-400 text-xs md:text-sm">Rendimiento final: <strong className="text-white font-mono text-base md:text-lg">{engineRef.current.internalScore} pts</strong></p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2 md:pt-4 w-full md:w-auto px-4 md:px-0">
                          <button onClick={() => setGameState('SELECT_CHAR')} className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 border border-neutral-800 rounded-lg md:rounded-xl text-[10px] md:text-xs font-mono text-neutral-400 hover:border-cyan-400 hover:text-cyan-400 uppercase transition-all bg-neutral-900/50">
                            Cambiar Arquetipo
                          </button>
                          <button onClick={() => startGame(selectedFaction!)} className="w-full md:w-auto flex justify-center items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-red-600 text-white font-bold font-mono rounded-lg md:rounded-xl text-[10px] md:text-xs uppercase hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                            <RefreshCcw className="w-3 h-3 md:w-4 md:h-4" /> Reiniciar Simulación
                          </button>
                        </div>
                      </div>
                    )}

                    <canvas 
                      ref={canvasRef} 
                      onMouseDown={handleJump} onTouchStart={(e) => { e.preventDefault(); handleJump(); }}
                      className="w-full h-full block cursor-pointer object-cover bg-black"
                    />
                  </div>
                  <p className="text-[8px] md:text-[10px] text-neutral-600 text-center font-mono mt-3 md:mt-4 uppercase tracking-widest">
                    PC: BARRA ESPACIADORA o CLIC | MÓVIL: TOQUE EN PANTALLA
                  </p>
                </div>
              )}

              {/* FORMULARIO DE CONTACTO MATRIX */}
              {showContact && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto space-y-4 md:space-y-6 py-4 md:py-8 px-2 md:px-0">
                  <div className="text-center space-y-1.5 md:space-y-2">
                    <h3 className="text-white font-mono text-sm md:text-base font-bold uppercase tracking-widest text-cyan-400">// TERMINAL DE CONTACTO</h3>
                    <p className="text-neutral-500 text-[10px] md:text-xs">Inyecta tus parámetros para iniciar cotización o consultoría.</p>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-3 md:space-y-4 font-sans">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 md:left-4 md:top-3.5 w-4 h-4 text-neutral-600" />
                      <input type="text" required placeholder="Nombre Operativo" className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-lg md:rounded-xl pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 text-xs md:text-sm text-white font-mono outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 md:left-4 md:top-3.5 w-4 h-4 text-neutral-600" />
                        <input type="email" required placeholder="Email Corporativo" className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-lg md:rounded-xl pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 text-xs md:text-sm text-white font-mono outline-none transition-colors" />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 md:left-4 md:top-3.5 w-4 h-4 text-neutral-600" />
                        <input type="text" placeholder="Frecuencia (Tel)" className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-lg md:rounded-xl pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 text-xs md:text-sm text-white font-mono outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 md:left-4 md:top-4 w-4 h-4 text-neutral-600" />
                      <textarea rows={3} required placeholder="Describe tu visión arquitectónica..." className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-lg md:rounded-xl pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 text-xs md:text-sm text-white font-mono outline-none resize-none transition-colors md:rows-4" />
                    </div>
                    <button type="submit" className="w-full py-3 md:py-4 bg-cyan-400 text-black font-mono font-bold text-[10px] md:text-xs tracking-widest uppercase rounded-lg md:rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                      TRANSMITIR DATOS
                    </button>
                  </form>
                </motion.div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}