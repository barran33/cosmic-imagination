
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Zap, RefreshCcw, Trophy, Mail, User, MessageSquare,
  Phone, Crosshair, Shield, Cpu, Activity, Star, Award,
  CheckCircle, XCircle, Loader2
} from 'lucide-react';

// ============================================================
// BANCO DE PREGUNTAS — Ciberseguridad + Desarrollo de Software
// ============================================================
const QUESTION_BANK = {
  blue: [
    { q: 'Un atacante inunda tu API con miles de requests por segundo. ¿Cuál es la primera línea de defensa?', a: ['Honeypot estático', 'Rate Limiting + throttling', 'Escalar verticalmente el servidor', 'Cifrar la base de datos'], c: 1, xp: 50, topic: 'API Security' },
    { q: '¿Qué control ISO/IEC 27001 gestiona las vulnerabilidades técnicas?', a: ['Control A.5.15', 'Control A.8.8', 'Control A.7.2', 'Control A.5.1'], c: 1, xp: 60, topic: 'ISO 27001' },
    { q: 'Un JWT está siendo interceptado en tránsito. ¿Qué medida mitiga este ataque?', a: ['Aumentar el tiempo de expiración', 'Usar HTTPS + httpOnly cookies', 'Guardar el token en localStorage', 'Duplicar la firma del token'], c: 1, xp: 70, topic: 'Auth Security' },
    { q: '¿Qué principio de seguridad implica dar a cada usuario solo los permisos que necesita?', a: ['Defense in depth', 'Zero Trust', 'Least Privilege', 'Separation of Duties'], c: 2, xp: 50, topic: 'Principios' },
    { q: 'Detectas tráfico DNS inusual saliendo de un servidor interno. ¿Qué tipo de ataque sospechas?', a: ['Phishing', 'DNS Tunneling', 'CSRF', 'SQL Injection'], c: 1, xp: 80, topic: 'Threat Detection' },
    { q: '¿Cuál es la diferencia clave entre IDS e IPS?', a: ['Son idénticos en función', 'IDS detecta y alerta, IPS detecta y bloquea activamente', 'IPS solo detecta amenazas', 'IDS bloquea todo el tráfico sospechoso'], c: 1, xp: 60, topic: 'Network Security' },
    { q: 'En Next.js, ¿dónde NO debes exponer variables de entorno con secretos sensibles?', a: ['process.env en server components', 'Variables con prefijo NEXT_PUBLIC_', 'API Routes del servidor Node.js', '.env.local solo en el servidor'], c: 1, xp: 55, topic: 'Next.js Security' },
    { q: '¿Qué HTTP response header previene específicamente los ataques de clickjacking?', a: ['Content-Security-Policy', 'X-Frame-Options: DENY', 'X-XSS-Protection', 'Strict-Transport-Security'], c: 1, xp: 65, topic: 'HTTP Security' },
    { q: 'En FastAPI, ¿cómo proteges un endpoint para que solo usuarios autenticados puedan acceder?', a: ['Decorador @app.secure()', 'Dependency Injection con OAuth2PasswordBearer', 'Prefijo /private/ en la URL', 'Solo middleware de CORS'], c: 1, xp: 75, topic: 'FastAPI Security' },
    { q: '¿Qué es un SOC (Security Operations Center)?', a: ['Un software de cifrado avanzado', 'Centro/equipo que monitorea seguridad 24/7', 'Protocolo de red seguro', 'Tipo de firewall de nueva generación'], c: 1, xp: 50, topic: 'SOC' },
  ],
  red: [
    { q: 'Detectas un endpoint vulnerable a SQLi. ¿Qué payload básico valida el bypass de autenticación?', a: ["' OR '1'='1' --", '<script>alert(1)</script>', '&& cat /etc/passwd', '../../../etc/shadow'], c: 0, xp: 70, topic: 'SQL Injection' },
    { q: '¿Qué flag de Nmap realiza un escaneo SYN Stealth sin completar el handshake TCP?', a: ['-sT (TCP connect scan)', '-sS (SYN stealth scan)', '-sU (UDP scan)', '-sV (version detection)'], c: 1, xp: 65, topic: 'Nmap' },
    { q: '¿Cuál es el objetivo principal de la fase de Reconocimiento en un pentest?', a: ['Explotar vulnerabilidades encontradas', 'Recopilar información sin interacción directa con el objetivo', 'Instalar backdoors persistentes', 'Escalar privilegios en el sistema'], c: 1, xp: 55, topic: 'Pentest Phases' },
    { q: 'En un ataque XSS reflejado, ¿dónde se ejecuta el payload malicioso?', a: ['En el servidor de la víctima', 'En la base de datos del servidor', 'En el navegador de la víctima', 'En el firewall perimetral'], c: 2, xp: 60, topic: 'XSS' },
    { q: '¿Qué herramienta usarías para interceptar y modificar peticiones HTTP/HTTPS en un pentest web?', a: ['Wireshark', 'Metasploit Framework', 'Burp Suite Pro', 'Nessus Scanner'], c: 2, xp: 70, topic: 'Web Pentest' },
    { q: 'Un token JWT tiene el campo "alg" seteado en "none". ¿Qué vulnerabilidad crítica existe?', a: ['No existe vulnerabilidad', 'Algorithm Confusion — se puede forjar el token sin firma válida', 'El token expira inmediatamente', 'Genera un CSRF automáticamente'], c: 1, xp: 85, topic: 'JWT Attacks' },
    { q: '¿Qué técnica permite RCE en servidores aprovechando templates no sanitizados en Python (Jinja2)?', a: ['Buffer Overflow clásico', 'Server-Side Template Injection (SSTI)', 'ARP Spoofing en la red', 'DNS Cache Poisoning'], c: 1, xp: 80, topic: 'SSTI' },
    { q: 'En Firebase Firestore, ¿qué misconfiguration expone todos los datos a usuarios no autenticados?', a: ['Habilitar Google Auth en el proyecto', 'Reglas: allow read, write: if true (sin condición)', 'Usar el SDK de Admin en el backend', 'Activar Firebase Analytics'], c: 1, xp: 75, topic: 'Firebase Security' },
    { q: '¿En qué consiste un ataque "Pass-the-Hash"?', a: ['Romper contraseñas con fuerza bruta offline', 'Usar el hash NTLM capturado para autenticarse sin conocer la contraseña en texto plano', 'Inyectar código malicioso en cookies de sesión', 'Ataque de denegación de servicio distribuido'], c: 1, xp: 90, topic: 'Credential Attacks' },
    { q: 'Encuentras una IDOR (Insecure Direct Object Reference). ¿Cómo la explotas básicamente?', a: ['Inyectas SQL en el parámetro vulnerable', 'Cambias el ID del objeto en la petición para acceder a recursos de otros usuarios', 'Usas XSS para robar cookies de sesión', 'Aplicas fuzzing agresivo al header Authorization'], c: 1, xp: 70, topic: 'IDOR' },
  ]
};

// ============================================================
// SISTEMA DE RANGOS / RECOMPENSAS
// ============================================================
const RANKS = [
  { min: 0,    label: 'SCRIPT KIDDIE',  color: '#6b7280', icon: '👾' },
  { min: 100,  label: 'HACKER NOVATO',  color: '#22c55e', icon: '🟢' },
  { min: 300,  label: 'CYBER AGENT',    color: '#3b82f6', icon: '🔵' },
  { min: 600,  label: 'ELITE HACKER',   color: '#a855f7', icon: '🟣' },
  { min: 1000, label: 'COSMIC PHANTOM', color: '#00FFFF', icon: '⚡' },
  { min: 2000, label: 'VOID ARCHITECT', color: '#f59e0b', icon: '🌟' },
];

const getRank = (score: number) => {
  let rank = RANKS[0];
  for (const r of RANKS) { 
    if (score >= r.min) rank = r; 
  }
  return rank;
};

// ============================================================
// FACCIONES Y PERSONAJES
// ============================================================
const FACCIONES = {
  blue: { id: 'blue', name: 'Blue Team / Defensa', color: '#00FFFF' },
  red:  { id: 'red',  name: 'Red Team / Ofensivo', color: '#e61383ff' },
};

const PERSONAJES = [
  { id: 'char_1', name: 'Cosmic Pirate',    class: 'Cyber Architect',  cardImg: '/cosmic-universe/cards/cosmic-card.png', assetImg: '/cosmic-universe/assets/cosmic-pirate.png',  stats: [{ label: 'PROCESAMIENTO', val: 90 }, { label: 'SIGILO', val: 96 }, { label: 'ESTABILIDAD', val: 85 }] },
  { id: 'char_2', name: 'Celestial Hacker', class: 'Captain369',       cardImg: '/cosmic-universe/cards/capitan369.png',      assetImg: '/cosmic-universe/assets/captain369.png',    stats: [{ label: 'PROCESAMIENTO', val: 60 }, { label: 'SIGILO', val: 95 }, { label: 'ESTABILIDAD', val: 50 }] },
  { id: 'char_3', name: 'Galactic Warrior', class: 'Code Samurai',     cardImg: '/cosmic-universe/cards/pirate66.PNG',        assetImg: '/cosmic-universe/assets/space_pirate9.png', stats: [{ label: 'PROCESAMIENTO', val: 75 }, { label: 'SIGILO', val: 30 }, { label: 'ESTABILIDAD', val: 98 }] },
  { id: 'char_4', name: 'Chrono Hacker',    class: 'Time Manipulator', cardImg: '/cosmic-universe/cards/guardian33.PNG',      assetImg: '/cosmic-universe/assets/guardian3.png',    stats: [{ label: 'PROCESAMIENTO', val: 88 }, { label: 'SIGILO', val: 70 }, { label: 'ESTABILIDAD', val: 65 }] },
  { id: 'char_5', name: 'Aether Blade',     class: 'Energy Vanguard',  cardImg: '/cosmic-universe/cards/guardian99.PNG',      assetImg: '/cosmic-universe/assets/guardian9.png',    stats: [{ label: 'PROCESAMIENTO', val: 80 }, { label: 'SIGILO', val: 85 }, { label: 'ESTABILIDAD', val: 70 }] },
  { id: 'char_6', name: 'Cosmic Oracle',    class: 'Data Seer',        cardImg: '/cosmic-universe/cards/guardian66.PNG',      assetImg: '/cosmic-universe/assets/guardian6.png',    stats: [{ label: 'PROCESAMIENTO', val: 99 }, { label: 'SIGILO', val: 50 }, { label: 'ESTABILIDAD', val: 60 }] },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

interface CosmicPortalProps {
  isOpen: boolean;
  onClose: () => void;
}
// 2. Aplicamos la interfaz directamente en los argumentos de la función
export default function CosmicPortal({ isOpen, onClose }: CosmicPortalProps) {
  const [gameState, setGameState]             = useState('SELECT_CHAR');
  const [charIndex, setCharIndex]             = useState(0);
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [highScore, setHighScore]             = useState(0);
  const [totalXP, setTotalXP]                 = useState(0);
  const [triviaActive, setTriviaActive]       = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answerFeedback, setAnswerFeedback]   = useState<any>(null);
  const [showContact, setShowContact]         = useState(false);
  const [contactStatus, setContactStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [rewardPopup, setRewardPopup]         = useState<any>(null);
  const [streak, setStreak]                   = useState(0);
  const [charBobOffset, setCharBobOffset]     = useState(0);

  // Form refs (evita re-renders en cada keystroke)
  // Form refs (evita re-renders en cada keystroke)
  const nameRef    = useRef<HTMLInputElement | null>(null);
  const emailRef   = useRef<HTMLInputElement | null>(null);
  const phoneRef   = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null); // Usar HTMLTextAreaElement si es un textarea

  // Engine / canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const scoreDisplayRef = useRef<HTMLSpanElement | null>(null);
  const imgCache        = useRef(new Map());
  const factionRef      = useRef(selectedFaction);
  const usedQRef        = useRef(new Set());

 // Animación de bob para personajes en pantalla de selección
  useEffect(() => {
    let raf: number = 0; // Inicializada explícitamente en 0
    let t = 0;
    const animate = () => {
      t += 0.04;
      setCharBobOffset(Math.sin(t) * 6);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

 const engineRef = useRef({
    playerY: 225,
    velocity: 0,
    gravity: 0.35,
    jump: -7.5,
    angle: 0,
    obstacles: [] as any[],
    nodes: [] as any[],
    particles: [] as any[],
    stars: [] as any[],
    nebulae: [] as any[],
    frame: 0,
    speed: 4.5,
    // CORRECCIÓN AQUÍ: Permitimos explícitamente HTMLImageElement o HTMLCanvasElement
    avatarImg: null as HTMLImageElement | HTMLCanvasElement | null, 
    color: '#00FFFF',
    internalScore: 0
  });

  // Pre-cargar todas las imágenes al montar (una sola vez)
  useEffect(() => {
    PERSONAJES.forEach(char => {
      const img = new Image();
      img.src = char.assetImg;
      imgCache.current.set(char.id, img);
    });
  }, []);

  // Sync faction ref
  useEffect(() => { factionRef.current = selectedFaction; }, [selectedFaction]);

  // Overflow lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Construir sprite offscreen — shadowBlur una sola vez, no en el loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    
    // Solución 1: Forzamos a TypeScript a entender que el string es una llave válida de FACCIONES
    if (selectedFaction) {
      const factionKey = selectedFaction as keyof typeof FACCIONES;
      if (FACCIONES[factionKey]) {
        engineRef.current.color = FACCIONES[factionKey].color;
      }
    }

    // Solución 2: Tipamos 'img' explícitamente como HTMLImageElement para quitar la línea roja
    const buildSprite = (img: HTMLImageElement) => {
      const off = document.createElement('canvas');
      off.width = 80;
      off.height = 80;
      const octx = off.getContext('2d');
      if (!octx) return; // Validación de seguridad para el contexto
      octx.shadowBlur = 20;
      octx.shadowColor = engineRef.current.color;
      octx.drawImage(img, 0, 0, 80, 80);
      engineRef.current.avatarImg = off;
    };

    const cached = imgCache.current.get(PERSONAJES[charIndex].id);
    if (cached) {
      if (cached.complete) buildSprite(cached);
      else cached.onload = () => buildSprite(cached);
    }
  }, [gameState, charIndex, selectedFaction]);

  // ── Inicializar fondo cósmico ──
  const initCosmicBg = (W: number, H: number) => {
    const s = engineRef.current;
    s.stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * W, 
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.6 + 0.1,
      alpha: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));
    s.nebulae = [
      { x: W * 0.15, y: H * 0.3,  r: 130, color: '#7c3aed', alpha: 0.07 },
      { x: W * 0.72, y: H * 0.65, r: 110, color: '#0e7490', alpha: 0.08 },
      { x: W * 0.5,  y: H * 0.1,  r: 90,  color: '#be185d', alpha: 0.06 },
      { x: W * 0.88, y: H * 0.25, r: 95,  color: '#00FFFF', alpha: 0.05 },
      { x: W * 0.3,  y: H * 0.8,  r: 80,  color: '#a855f7', alpha: 0.05 },
    ];
  };

// ── Dibujar fondo cósmico ──
  const drawCosmicBg = (
    ctx: CanvasRenderingContext2D, // <-- Tipado nativo del contexto de canvas
    W: number, 
    H: number, 
    frame: number, 
    speed: number, 
    color: string
  ) => {
    // Gradiente de fondo espacial
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#01010c');
    grad.addColorStop(0.5, '#020212');
    grad.addColorStop(1, '#01010c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Nebulosas
    const s = engineRef.current;
    for (const nb of s.nebulae) {
      const ng = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.r);
      const alphaHex = Math.floor(nb.alpha * 255).toString(16).padStart(2, '0');
      ng.addColorStop(0, nb.color + alphaHex);
      ng.addColorStop(1, 'transparent');
      ctx.fillStyle = ng;
      ctx.fillRect(nb.x - nb.r, nb.y - nb.r, nb.r * 2, nb.r * 2);
    }

    // Estrellas con parallax y twinkle
    for (const star of s.stars) {
      star.x -= star.speed * (speed / 4.5);
      star.twinkle += 0.04;
      if (star.x < 0) { star.x = W; star.y = Math.random() * H; }
      const ta = star.alpha * (0.6 + 0.4 * Math.sin(star.twinkle));
      ctx.fillStyle = `rgba(255,255,255,${ta.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

  

    // Planeta decorativo con anillo (parallax lento)
    const px = (W * 0.85 - (frame * 0.15) % (W * 1.2) + W * 1.2) % (W * 1.2) - W * 0.1;
    const py = H * 0.13;
    const pg = ctx.createRadialGradient(px - 8, py - 8, 2, px, py, 30);
    pg.addColorStop(0, '#1a3a60');
    pg.addColorStop(0.7, '#0a1520');
    pg.addColorStop(1, 'transparent');
    ctx.fillStyle = pg;
    ctx.beginPath(); ctx.arc(px, py, 30, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(80,180,255,0.18)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(px, py, 48, 11, -0.3, 0, Math.PI * 2); ctx.stroke();

    // Shooting star ocasional
    if (frame % 400 < 8) {
      const progress = (frame % 400) / 8;
      const sx = W * 0.9 - progress * W * 0.3;
      const sy = H * 0.05 + progress * H * 0.15;
      ctx.strokeStyle = `rgba(255,255,255,${(1 - progress) * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + 30, sy - 10); ctx.stroke();
    }
  };

  const handleJump = useCallback(() => {
    if (gameState !== 'PLAYING' || triviaActive || showContact) return;
    engineRef.current.velocity = engineRef.current.jump;
  }, [gameState, triviaActive, showContact]);

  useEffect(() => {
    
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'PLAYING' && !triviaActive && !showContact) {
        e.preventDefault(); 
        handleJump();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, triviaActive, showContact, handleJump]);

  // ============================================================
  // MOTOR GRÁFICO
  // ============================================================
  useEffect(() => {
    if (!isOpen || gameState !== 'PLAYING' || triviaActive || showContact) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 900, H = 600; // <-- Elevamos de 450 a 550 para darle máxima verticalidad
    canvas.width = W; 
    canvas.height = H;
    
    // El fondo dinámico ahora se inicializa con el nuevo tamaño completo
    initCosmicBg(W, H);

    const loop = () => {
      const s = engineRef.current;
      s.frame++;

      drawCosmicBg(ctx, W, H, s.frame, s.speed, s.color);

      // Física del jugador
      s.velocity += s.gravity;
      s.playerY  += s.velocity;
      const targetAngle = Math.min(Math.max(s.velocity * 0.06, -0.5), 0.6);
      s.angle += (targetAngle - s.angle) * 0.15;

      if (s.playerY > H - 40 || s.playerY < 20) {
        setHighScore(prev => Math.max(prev, s.internalScore));
        setGameState('GAME_OVER');
        return;
      }

      // Partículas de estela
      if (s.frame % 2 === 0) {
        s.particles.push({
          x: 100, y: s.playerY + (Math.random() * 16 - 8),
          size: Math.random() * 5 + 2, alpha: 1, speedY: Math.random() * 2 - 1,
        });
      }

      // Dibujar partículas — iteración en reversa
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x -= s.speed * 0.8; 
        p.y += p.speedY; 
        p.alpha -= 0.03;
        
        if (p.alpha <= 0) { s.particles.splice(i, 1); continue; }
        
        // ── SOLUCIÓN GLOBAL ALPHA ──
        ctx.save();                 // Guardamos el estado actual del canvas
        ctx.globalAlpha = p.alpha;  // Le aplicamos la opacidad flotante directamente al canvas (0 a 1)
        ctx.fillStyle = s.color;    // Pintamos con el color puro de la facción (sea el formato que sea)
        
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); 
        ctx.fill();
        ctx.restore();              // Restauramos el canvas para que no afecte el renderizado de lo demás
      }
      
      // Dibujar jugador (sprite precalculado)
      ctx.save();
      ctx.translate(120, s.playerY);
      ctx.rotate(s.angle);
      if (s.avatarImg) {
        ctx.drawImage(s.avatarImg, -40, -40, 80, 80);
      } else {
        ctx.fillStyle = s.color;
        ctx.fillRect(-30, -30, 60, 60);
      }
      ctx.restore();

      // Generar obstáculos
      if (s.frame % 120 === 0) {
        const gap = 155;
        const topH = Math.floor(Math.random() * (H - gap - 80)) + 40;
        s.obstacles.push({ x: W, top: topH, bottom: H - topH - gap, passed: false });
      }

      // Dibujar obstáculos — reversa, sin .filter()
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const obs = s.obstacles[i];
        obs.x -= s.speed;
        if (obs.x < -60) { s.obstacles.splice(i, 1); continue; }

     // 1. Pilares con gradiente macizo
        const pg = ctx.createLinearGradient(obs.x, 0, obs.x + 40, 0);
        const baseColor = s.color || '#00ffea';
        pg.addColorStop(0, baseColor);
        pg.addColorStop(1, 'rgba(16, 240, 232, 0.15)');
        
        ctx.fillStyle = pg;
        // Dibuja el bloque sólido de arriba
        ctx.fillRect(obs.x, 0, 40, obs.top);
        // Dibuja el bloque sólido de abajo
        ctx.fillRect(obs.x, H - obs.bottom, 40, obs.bottom);

        // 2. Bordes limpios (SOLO en la superficie donde impacta la nave)
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 2.5;

        // Borde horizontal inferior del pilar de ARRIBA
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.top);
        ctx.lineTo(obs.x + 40, obs.top);
        ctx.stroke();

        // Borde horizontal superior del pilar de ABAJO
        ctx.beginPath();
        ctx.moveTo(obs.x, H - obs.bottom);
        ctx.lineTo(obs.x + 40, H - obs.bottom);
        ctx.stroke();

        // Colisión
        if (obs.x < 150 && obs.x + 40 > 90) {
          if (s.playerY - 25 < obs.top || s.playerY + 25 > H - obs.bottom) {
            setHighScore(prev => Math.max(prev, s.internalScore));
            setGameState('GAME_OVER');
            return;
          }
        }
        if (!obs.passed && obs.x < 90) {
          obs.passed = true;
          s.internalScore += 10;
          if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = s.internalScore.toString();
        }
      }

      // Generar nodos de trivia
      if (s.frame % 280 === 0) {
        s.nodes.push({ x: W, y: Math.floor(Math.random() * (H - 120)) + 60, collected: false, pulse: 0 });
      }

      // Dibujar nodos — reversa
      for (let i = s.nodes.length - 1; i >= 0; i--) {
        const node = s.nodes[i];
        node.x -= s.speed;
        node.pulse += 0.09;
        if (node.x < -60) { s.nodes.splice(i, 1); continue; }

        // Halo pulsante (sin shadowBlur)
        const pulseAlpha = 0.08 + 0.07 * Math.sin(node.pulse);
        ctx.fillStyle = `rgba(250,204,21,${pulseAlpha})`;
        ctx.beginPath(); ctx.arc(node.x, node.y, 22, 0, Math.PI * 2); ctx.fill();
        // Núcleo
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(node.x, node.y, 11, 0, Math.PI * 2); ctx.fill();
        // Ícono
        ctx.fillStyle = '#000';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', node.x, node.y);

        if (!node.collected && Math.hypot(node.x - 120, node.y - s.playerY) < 42) {
          node.collected = true;
          s.nodes.splice(i, 1);
          
          const faction = factionRef.current as keyof typeof QUESTION_BANK;
          if (faction && QUESTION_BANK[faction]) {
            const pool = QUESTION_BANK[faction];
            
            const available = pool.map((_, idx: number) => idx).filter((idx: number) => !usedQRef.current.has(idx));
            if (available.length === 0) usedQRef.current.clear();
            
            const pickFrom = available.length > 0 ? available : pool.map((_, idx: number) => idx);
            const picked = pickFrom[Math.floor(Math.random() * pickFrom.length)];
            usedQRef.current.add(picked);
            
            setCurrentQuestion({ ...pool[picked], _idx: picked, _selectedIdx: -1 });
            setAnswerFeedback(null);
            setTriviaActive(true);
          }
        }
      }

      // Dificultad progresiva
      if (s.frame % 600 === 0 && s.speed < 9.5) s.speed += 0.3;

     
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [gameState, triviaActive, showContact]);

 // ============================================================
  // INICIO DE PARTIDA
  // ============================================================
  const startGame = (factionKey: keyof typeof FACCIONES) => {
    setSelectedFaction(factionKey);
    factionRef.current = factionKey;
    setTriviaActive(false);
    setAnswerFeedback(null);
    setShowContact(false);
    setStreak(0);
    usedQRef.current.clear();
    engineRef.current = {
      playerY: 225, velocity: 0, gravity: 0.35, jump: -7.5, angle: 0,
      obstacles: [], nodes: [], particles: [], stars: [], nebulae: [],
      frame: 0, speed: 4.5,
      avatarImg: engineRef.current.avatarImg,
      color: FACCIONES[factionKey].color,
      internalScore: 0,
    };
    if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = '0';
    setGameState('PLAYING');
  };

  // ============================================================
  // RESPUESTA TRIVIA

  const handleAnswer = (index: number) => {
    if (!currentQuestion || answerFeedback) return;
    const correct = index === currentQuestion.c;
    const xpGained = correct ? currentQuestion.xp + streak * 10 : 0;

    // Marcar respuesta seleccionada
    currentQuestion._selectedIdx = index;
    setAnswerFeedback({ correct, correctIndex: currentQuestion.c, xpGained, topic: currentQuestion.topic });

    if (correct) {
      engineRef.current.internalScore += xpGained;
      if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = engineRef.current.internalScore.toString();
      engineRef.current.speed = Math.max(3.0, engineRef.current.speed - 0.4);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalXP(prev => {
        const next = prev + xpGained;
        const oldRank = getRank(prev);
        const newRank = getRank(next);
        if (newRank.label !== oldRank.label) {
          setRewardPopup(newRank);
          setTimeout(() => setRewardPopup(null), 3000);
        }
        return next;
      });
    } else {
      engineRef.current.speed += 0.7;
      setStreak(0);
    }

    setTimeout(() => {
      setTriviaActive(false);
      setAnswerFeedback(null);
    }, 1800);
  };



 // ============================================================
  // ENVÍO FORMULARIO → FastAPI /api/contact
  // ============================================================
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameRef.current?.value    ?? '',
          email:   emailRef.current?.value   ?? '',
          phone:   phoneRef.current?.value   ?? '',
          message: messageRef.current?.value ?? '',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setContactStatus('success');
      
      if (nameRef.current)    nameRef.current.value    = '';
      if (emailRef.current)   emailRef.current.value   = '';
      if (phoneRef.current)   phoneRef.current.value   = '';
      if (messageRef.current) messageRef.current.value = '';
      
      setTimeout(() => setContactStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  const activeChar   = PERSONAJES[charIndex];
  const currentRank  = getRank(totalXP);




  // ============================================================
  // RENDER
  // ============================================================
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-md overflow-hidden"
        >

          {/* ── Popup de rango desbloqueado ── */}
          <AnimatePresence>
            {rewardPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -30 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border font-mono text-sm font-bold tracking-widest shadow-2xl"
                style={{ background: '#050510', borderColor: rewardPopup.color, color: rewardPopup.color, boxShadow: `0 0 40px ${rewardPopup.color}55` }}
              >
                <span className="text-2xl">{rewardPopup.icon}</span>
                <div>
                  <div className="text-[9px] text-neutral-500 mb-0.5">// RANGO DESBLOQUEADO</div>
                  <div>{rewardPopup.label}</div>
                </div>
                <Award className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Modal principal ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-6xl bg-[#030305] border border-neutral-800 rounded-xl md:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.95)] flex flex-col my-auto h-[96vh] md:h-auto md:max-h-[90vh]"
          >

            {/* ── HEADER ── */}
            <div className="flex border-b border-neutral-900 bg-black/70 justify-between items-center px-3 py-2 md:px-5 md:py-3 shrink-0">
              <div className="flex items-center gap-2 md:gap-3 font-mono text-[9px] md:text-xs tracking-wider text-neutral-400">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                <span className="truncate max-w-[140px] md:max-w-none">COSMIC DEV ENGINE v4.0 (VOID MATRIX)</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                {/* Badge de rango/XP */}
                <div
                  className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-black/50 font-mono text-[9px]"
                  style={{ color: currentRank.color }}
                >
                  <Star className="w-3 h-3" />
                  <span>{currentRank.icon} {currentRank.label}</span>
                  <span className="text-neutral-700">|</span>
                  <span>{totalXP} XP</span>
                </div>
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="px-2 py-1 md:px-4 md:py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-md font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-cyan-400 transition-all bg-cyan-950/10 hover:bg-cyan-900/30"
                >
                  {showContact ? '// ABORTAR' : '// CONTACTO'}
                </button>
                <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-1">
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="p-3 md:p-10 bg-gradient-to-b from-[#020208] to-[#040410] relative flex-1 flex flex-col justify-center overflow-y-auto overflow-x-hidden md:overflow-visible">

              {/* ════════════════════ SELECT_CHAR ════════════════════ */}
              {gameState === 'SELECT_CHAR' && !showContact && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-8 items-center justify-between w-full h-full min-h-0"
                >
                  {/* Carta principal con bob */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center shrink-0 w-full h-[30vh] md:h-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChar.id}
                        initial={{ opacity: 0, scale: 0.95, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: charBobOffset }}
                        exit={{ opacity: 0, scale: 0.95, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="h-full aspect-[2/3] md:w-64 md:h-96 md:aspect-auto border border-cyan-400/50 rounded-xl md:rounded-2xl overflow-hidden relative bg-black"
                        style={{ boxShadow: '0 0 40px rgba(0,255,255,0.18), 0 0 80px rgba(0,255,255,0.04)' }}
                      >
                        <img src={activeChar.cardImg} alt={activeChar.name} className="w-full h-full object-cover object-top" />
                        {/* Scan lines cósmicas */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.012) 2px,rgba(0,255,255,0.012) 4px)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent flex flex-col justify-end p-3 md:p-6">
                          <span className="font-mono text-[8px] md:text-[10px] text-cyan-400 tracking-widest uppercase mb-0.5 md:mb-1.5">// {activeChar.class} //</span>
                          <h3 className="text-white font-bold text-sm md:text-xl uppercase tracking-wider leading-tight">{activeChar.name}</h3>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Miniaturas */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center w-full shrink-0">
                    <div className="hidden md:block text-left w-full border-b border-neutral-900 pb-2 mb-6">
                      <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase">// SELECCIONAR ARQUETIPO</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[260px] md:max-w-none mx-auto">
                      {PERSONAJES.map((char, index) => {
                        const isSelected = index === charIndex;
                        return (
                          <motion.div
                            key={char.id}
                            onClick={() => setCharIndex(index)}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.96 }}
                            animate={{ y: isSelected ? charBobOffset * 0.4 : 0 }}
                            className={`aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden border cursor-pointer relative transition-colors duration-200 ${
                              isSelected ? 'border-cyan-400 z-10' : 'border-neutral-800 opacity-50 hover:opacity-85 hover:border-neutral-600'
                            }`}
                            style={isSelected ? { boxShadow: '0 0 18px rgba(0,255,255,0.28)' } : {}}
                          >
                            <img src={char.cardImg} alt={char.name} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-1.5 flex items-end ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
                              <span className="text-[8px] font-mono font-bold text-white uppercase truncate w-full text-center">{char.name.split(' ')[0]}</span>
                            </div>
                            {isSelected && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]" />}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats + botón */}
                  <div className="md:col-span-3 flex flex-col justify-end md:justify-center w-full px-1 gap-2 md:gap-5 shrink-0 pb-1 md:pb-0">
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4 w-full bg-black/40 md:bg-transparent p-2 md:p-0 rounded-lg border border-neutral-900 md:border-none">
                      {activeChar.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col space-y-1">
                          <div className="flex flex-col md:flex-row md:justify-between font-mono text-[7px] md:text-[10px] uppercase tracking-widest text-center md:text-left">
                            <span className="text-neutral-400 flex items-center justify-center md:justify-start gap-1">
                              <span className="hidden md:block">
                                {i === 0 && <Cpu className="w-3.5 h-3.5 text-cyan-500" />}
                                {i === 1 && <Crosshair className="w-3.5 h-3.5 text-cyan-500" />}
                                {i === 2 && <Activity className="w-3.5 h-3.5 text-cyan-500" />}
                              </span>
                              <span className="block md:hidden">{stat.label.substring(0, 4)}</span>
                              <span className="hidden md:block">{stat.label}</span>
                            </span>
                            <span className="text-cyan-400 font-bold leading-none">{stat.val}%</span>
                          </div>
                          <div className="w-full h-1 md:h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                            <motion.div
                              key={`${activeChar.id}-stat-${i}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.val}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, #00FFFF, #0891b2)' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setGameState('SELECT_FACTION')}
                      className="w-full py-2.5 md:py-4 border-2 border-cyan-400 text-cyan-400 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-lg md:rounded-xl transition-all"
                      style={{ background: 'linear-gradient(135deg,rgba(0,255,255,0.04),rgba(0,255,255,0.1))', boxShadow: '0 0 20px rgba(0,255,255,0.08)' }}
                    >
                      SINTONIZAR
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ════════════════════ SELECT_FACTION ════════════════════ */}
              {gameState === 'SELECT_FACTION' && !showContact && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-6 md:space-y-10 h-full py-4"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-white font-mono text-lg md:text-xl font-bold tracking-widest uppercase">// PROTOCOLO DE DESPLIEGUE</h2>
                    <p className="text-neutral-500 text-xs md:text-sm">Elige tu vector de aproximación para el entorno de simulación cósmica.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-3xl px-2 md:px-0">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => startGame('blue')}
                      className="group cursor-pointer border-2 border-cyan-900/50 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-cyan-400 transition-all flex flex-col items-center text-center space-y-3 md:space-y-5 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg,rgba(0,255,255,0.02),rgba(0,255,255,0.07))' }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
                      <Shield className="w-10 h-10 md:w-16 md:h-16 text-cyan-400 group-hover:scale-110 transition-transform relative z-10" />
                      <div className="relative z-10">
                        <h3 className="text-white font-mono text-sm md:text-base font-bold uppercase tracking-wider mb-1 md:mb-2">Blue Team</h3>
                        <p className="text-neutral-400 text-[10px] md:text-xs leading-relaxed">Defensa proactiva. Mitigación de riesgos, ISO/IEC 27001, hardening y arquitectura segura.</p>
                      </div>
                      <div className="relative z-10 font-mono text-[9px] text-cyan-700 uppercase tracking-wider">{QUESTION_BANK.blue.length} preguntas disponibles</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => startGame('red')}
                      className="group cursor-pointer border-2 border-purple-900/50 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-purple-400 transition-all flex flex-col items-center text-center space-y-3 md:space-y-5 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.02),rgba(168,85,247,0.07))' }}
                    >
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
                      <Zap className="w-10 h-10 md:w-16 md:h-16 text-purple-400 group-hover:scale-110 transition-transform relative z-10" />
                      <div className="relative z-10">
                        <h3 className="text-white font-mono text-sm md:text-base font-bold uppercase tracking-wider mb-1 md:mb-2">Red Team</h3>
                        <p className="text-neutral-400 text-[10px] md:text-xs leading-relaxed">Operaciones ofensivas. Pentesting, explotación de vulnerabilidades y bypass táctico.</p>
                      </div>
                      <div className="relative z-10 font-mono text-[9px] text-purple-700 uppercase tracking-wider">{QUESTION_BANK.red.length} preguntas disponibles</div>
                    </motion.div>
                  </div>

                  <button onClick={() => setGameState('SELECT_CHAR')} className="text-neutral-500 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors">
                    &lt; Regresar al selector
                  </button>
                </motion.div>
              )}

              {/* ════════════════════ PANTALLA DE JUEGO ════════════════════ */}
              {(gameState === 'PLAYING' || gameState === 'GAME_OVER') && !showContact && (
                <div className="w-full flex flex-col items-center justify-center h-full">

                  {/* HUD superior */}
                  <div className="flex justify-between items-center w-full max-w-[800px] font-mono text-[10px] md:text-xs mb-2 px-2 text-neutral-400">
                    <div className="flex items-center gap-3">
                      <span className="text-white flex items-center gap-1.5">
                          SCORE:{' '}
                          <strong
                            ref={scoreDisplayRef}
                            className="text-base md:text-xl"
                            style={{
                              color: selectedFaction
                                ? FACCIONES[selectedFaction as keyof typeof FACCIONES].color
                                : '#fff',
                            }}
                          >
                            0
                          </strong>
                        </span>
                      {streak >= 2 && (
                        <motion.span
                          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                          className="flex items-center gap-1 text-orange-400"
                        >
                          <Zap className="w-3 h-3" /> STREAK x{streak}
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden md:flex items-center gap-1 font-mono text-[9px]" style={{ color: currentRank.color }}>
                        {currentRank.icon} {currentRank.label}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" /> <strong>{highScore}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Canvas wrapper */}
                    <div
                    className="relative w-full max-w-[800px] h-[55vw] max-h-[506px] md:aspect-video md:h-auto bg-black rounded-lg md:rounded-xl overflow-hidden border border-neutral-800"
                    style={{
                      aspectRatio: undefined, // lo controlamos con la clase de abajo
                    }}
                    >

                    {/* ── TRIVIA OVERLAY ── */}
                    <AnimatePresence>
                      {triviaActive && currentQuestion && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                         className="absolute inset-0 z-30 flex flex-col justify-start p-3 md:p-8 space-y-2 md:space-y-5 overflow-y-auto"
                          style={{ background: 'rgba(2,2,14,0.97)', backdropFilter: 'blur(10px)' }}
                        >
                          <div className="flex items-center justify-between border-b border-yellow-500/20 pb-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs font-bold text-yellow-400">
                              <Zap className="w-4 h-4 animate-pulse" /> // INTERRUPCIÓN TÁCTICA
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-wider">{currentQuestion.topic}</span>
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-yellow-600/30 text-yellow-400">+{currentQuestion.xp} XP</span>
                              {streak >= 2 && (
                                <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-orange-600/30 text-orange-400">STREAK +{streak * 10}</span>
                              )}
                            </div>
                          </div>

                          <p className="text-white text-sm md:text-base font-sans leading-relaxed">{currentQuestion.q}</p>

                         <div className="grid grid-cols-1 gap-2">
                            {currentQuestion.a.map((opt: string, idx: number) => { // <-- Tipado explícito aplicado aquí
                              let cls = 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-cyan-400 hover:bg-cyan-950/20 hover:text-white cursor-pointer';
                              let icon = null;

                              if (answerFeedback) {
                                if (idx === answerFeedback.correctIndex) {
                                  cls = 'bg-green-950/50 border-green-500 text-green-300 cursor-default';
                                  icon = <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />;
                                } else if (idx === currentQuestion._selectedIdx && !answerFeedback.correct) {
                                  cls = 'bg-red-950/50 border-red-500 text-red-300 cursor-default';
                                  icon = <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
                                } else {
                                  cls = 'bg-neutral-900/40 border-neutral-800/50 text-neutral-600 cursor-default';
                                }
                              }

                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    if (answerFeedback) return;
                                    currentQuestion._selectedIdx = idx;
                                    handleAnswer(idx);
                                  }}
                                  disabled={!!answerFeedback}
                                  className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center gap-2 ${cls}`}
                                >
                                  {icon}
                                  <span>{idx + 1}. {opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Feedback inmediato */}
                          <AnimatePresence>
                            {answerFeedback && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-2 font-mono text-xs font-bold px-3 py-2.5 rounded-lg ${
                                  answerFeedback.correct
                                    ? 'bg-green-950/40 text-green-400 border border-green-800'
                                    : 'bg-red-950/40 text-red-400 border border-red-800'
                                }`}
                              >
                                {answerFeedback.correct
                                  ? <><CheckCircle className="w-4 h-4 shrink-0" /> ¡CORRECTO! +{answerFeedback.xpGained} XP — VELOCIDAD REDUCIDA</>
                                  : <><XCircle className="w-4 h-4 shrink-0" /> INCORRECTO — VELOCIDAD AUMENTADA</>
                                }
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── GAME OVER OVERLAY ── */}
                    {gameState === 'GAME_OVER' && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center space-y-4 backdrop-blur-sm"
                        style={{ background: 'rgba(0,0,0,0.92)' }}
                      >
                        <div className="space-y-1">
                          <span className="text-red-500 font-mono text-sm md:text-base font-bold tracking-widest block uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                            // GAME OVER 
                          </span>
                          <p className="text-neutral-400 text-xs">
                           
                          Final performance: <strong className="text-white font-mono text-lg">{engineRef.current.internalScore} pts</strong>
                          </p>
                          <p className="font-mono text-[10px] text-neutral-600">
                            RANGO: <span style={{ color: currentRank.color }}>{currentRank.icon} {currentRank.label}</span>
                            &nbsp;|&nbsp; XP TOTAL: <span className="text-neutral-400">{totalXP}</span>
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 pt-2 w-full md:w-auto px-4 md:px-0">
                          <button
                            onClick={() => setGameState('SELECT_CHAR')}
                            className="w-full md:w-auto px-5 py-2.5 border border-neutral-800 rounded-xl text-[10px] font-mono text-neutral-400 hover:border-cyan-400 hover:text-cyan-400 uppercase transition-all bg-neutral-900/60"
                          >
                            Cambiar Arquetipo
                          </button>
                          <button
                          onClick={() => selectedFaction && startGame(selectedFaction as keyof typeof FACCIONES)}
                          className="w-full md:w-auto flex justify-center items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold font-mono rounded-xl text-[10px] uppercase hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" /> Reiniciar
                        </button>
                        </div>
                      </motion.div>
                    )}

                    <canvas
                      ref={canvasRef}
                      onMouseDown={handleJump}
                      onTouchStart={(e) => { e.preventDefault(); handleJump(); }}
                      className="w-full h-full block cursor-pointer bg-black"
                    />
                  </div>

                  <p className="text-[8px] md:text-[10px] text-neutral-600 text-center font-mono mt-2 uppercase tracking-widest">
                    PC: ESPACIO o CLIC &nbsp;|&nbsp; MÓVIL: TOQUE &nbsp;|&nbsp; RECOGE <span className="text-yellow-600">⚡</span> PARA TRIVIA
                  </p>
                </div>
              )}

              {/* ════════════════════ FORMULARIO DE CONTACTO ════════════════════ */}
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md mx-auto space-y-4 md:space-y-6 py-4 md:py-8 px-2 md:px-0"
                >
                  <div className="text-center space-y-1.5">
                    <h3 className="font-mono text-sm md:text-base font-bold uppercase tracking-widest text-cyan-400">// TERMINAL DE CONTACTO</h3>
                    <p className="text-neutral-500 text-[10px] md:text-xs">Inyecta tus parámetros para iniciar cotización o consultoría.</p>
                  </div>

                  {contactStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-950/40 border border-green-700 text-green-400 font-mono text-xs"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      TRANSMISIÓN EXITOSA — Te responderemos a la brevedad.
                    </motion.div>
                  )}

                  {contactStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-700 text-red-400 font-mono text-xs"
                    >
                      <XCircle className="w-5 h-5 shrink-0" />
                      ERROR DE TRANSMISIÓN — Verifica tu conexión e intenta de nuevo.
                    </motion.div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-3 md:space-y-4 font-sans">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                      <input ref={nameRef} type="text" required placeholder="Nombre Operativo"
                        className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white font-mono outline-none transition-colors placeholder:text-neutral-700"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                        <input ref={emailRef} type="email" required placeholder="Email Corporativo"
                          className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white font-mono outline-none transition-colors placeholder:text-neutral-700"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                        <input ref={phoneRef} type="text" placeholder="Frecuencia (Tel)"
                          className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white font-mono outline-none transition-colors placeholder:text-neutral-700"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-600" />
                      <textarea ref={messageRef} rows={4} required placeholder="Describe tu visión arquitectónica..."
                        className="w-full bg-black border border-neutral-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white font-mono outline-none resize-none transition-colors placeholder:text-neutral-700"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={contactStatus === 'sending'}
                      className="w-full py-3 md:py-4 bg-cyan-400 text-black font-mono font-bold text-[10px] md:text-xs tracking-widest uppercase rounded-xl hover:bg-cyan-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                    >
                      {contactStatus === 'sending'
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> TRANSMITIENDO...</>
                        : 'TRANSMITIR DATOS'
                      }
                    </button>
                  </form>

                  {/* Nota para el desarrollador sobre el endpoint */}
                  <p className="text-neutral-700 font-mono text-[9px] text-center">
                    → Conectado a <span className="text-neutral-600">/api/contact</span> (FastAPI + Zoho Mail)
                  </p>
                </motion.div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
