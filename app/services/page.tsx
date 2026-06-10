"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Layout,
  ShieldAlert,
  ChevronRight,
  X,
  Orbit,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  Radio,
  CheckCircle2,
  Send,
  AlertTriangle
} from 'lucide-react';

// ========================================================
// ASTRONAUT WIDGET — sin cambios
// ========================================================
const AstronautWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-auto cursor-pointer group"
    >
      <div className="relative w-24 h-32 md:w-32 md:h-44 flex flex-col items-center justify-center animate-cosmic-float">
        <div className="absolute inset-0 bg-cyan-500/0 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-700" />
        <div className="absolute bottom-4 md:bottom-6 w-10 h-10 md:w-16 md:h-16 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-700" />
        <motion.div whileHover={{ scale: 1.05, rotate: 3 }} className="relative w-full h-full">
          <img src="/cosmic-universe/assets/captain-963.png" className="absolute inset-0 w-full h-full object-contain" alt="Space Pirate Body" />
          <motion.img
            src="/cosmic-universe/assets/brazo-captain-369.png"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ originX: "0.25", originY: "0.30" }}
            animate={{ rotate: isHovered ? [0, -10, 6, -4, 2, 0] : 0 }}
            transition={{ duration: isHovered ? 1.4 : 0.4, ease: "easeInOut" }}
          />
        </motion.div>
        <span className="hidden md:inline-block absolute -bottom-4 font-mono text-[9px] tracking-[0.2em] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase whitespace-nowrap bg-black/90 px-3 py-1 border border-cyan-500/30 rounded backdrop-blur-md">
          COSMIC_SYSTEM // ACTIVE
        </span>
      </div>
    </motion.div>
  );
};

// ========================================================
// TELEMETRY MODULE — sin cambios de lógica, copy mejorado
// ========================================================
const TelemetryModule = () => {
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "SYS_INIT: Secure kernel synchronized.",
    "AUDIT: ISO/IEC 27001 baseline active.",
    "MONITOR: Listening on port 443..."
  ]);

  useEffect(() => {
    const events = [
      "SHIELD: Blocked SQLi attempt on /api/v2/auth — threat neutralized",
      "CONTRACT: Smart contract state verified — 100% integrity",
      "PERF: Legacy payload optimized — latency reduced 34ms",
      "PERIMETER: Zero-trust re-authentication complete",
      "LATENCY: API response threshold stable at 0.8ms"
    ];
    const interval = setInterval(() => {
      setSystemLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random() * events.length)]}`,
        prev[0],
        prev[1]
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative border border-white/5 rounded-[2rem] bg-[#040404]/90 overflow-hidden p-6 md:p-8 font-mono text-xs transform-gpu shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-purple-500/30" />
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </div>
          <span className="text-neutral-200 font-bold uppercase tracking-wider text-[11px]">// LIVE SECURITY MONITOR</span>
        </div>
        <div className="text-neutral-600 text-[10px] uppercase tracking-widest">
          NODE_ID: <span className="text-purple-500">0x7F_INIT_MAIN</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-950/90 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-inner">
          <div className="flex items-center gap-2 text-neutral-400 text-[10px] uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>System Load</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>CONCURRENCY</span>
              <span className="text-purple-400 font-bold">89.4%</span>
            </div>
            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full w-[89%] transition-all duration-1000 ease-out" />
            </div>
          </div>
        </div>
        <div className="bg-neutral-950/90 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between shadow-inner">
          <div className="flex items-center gap-2 text-neutral-400 text-[10px] uppercase tracking-wider mb-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Live Threat Feed</span>
          </div>
          <div className="space-y-1 font-mono text-[10px] text-neutral-400 overflow-hidden h-[54px] flex flex-col justify-end">
            {systemLogs.map((log, index) => (
              <div key={index} className={`truncate transition-all duration-300 ${index === 0 ? "text-cyan-400 font-medium" : "text-neutral-600"}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-neutral-950/90 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between shadow-inner">
          <div className="flex items-center gap-2 text-neutral-400 text-[10px] uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4 text-neutral-200" />
            <span>Infrastructure Status</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-neutral-900/60 p-2 border border-white/[0.02] rounded-lg">
              <div className="text-neutral-500">ISO_STATUS</div>
              <div className="text-cyan-400 font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> AUDITED
              </div>
            </div>
            <div className="bg-neutral-900/60 p-2 border border-white/[0.02] rounded-lg">
              <div className="text-neutral-500">API_LATENCY</div>
              <div className="text-purple-400 font-bold flex items-center gap-1 mt-0.5">
                <Activity className="w-3.5 h-3.5" /> 0.8ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// CONSTELLATION CANVAS — el efecto cósmico del modal
// ========================================================
interface Star { x: number; y: number; size: number; opacity: number; twinkleSpeed: number; }
interface ConstellationCanvasProps { filledFields: number; totalFields: number; }

const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({ filledFields, totalFields }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const progressRef = useRef(0);

  const nodes = [
    { x: 0.15, y: 0.25 }, { x: 0.45, y: 0.10 }, { x: 0.78, y: 0.30 },
    { x: 0.88, y: 0.65 }, { x: 0.55, y: 0.82 }, { x: 0.20, y: 0.70 },
    { x: 0.35, y: 0.48 }, { x: 0.65, y: 0.52 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [1, 6], [6, 7], [7, 3], [6, 4],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Seed background stars once
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
    }

    let t = 0;
    const targetProgress = filledFields / totalFields;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // Lerp progress smoothly
      progressRef.current += (targetProgress - progressRef.current) * 0.04;
      const prog = progressRef.current;

      // Background star field
      starsRef.current.forEach(s => {
        s.opacity = Math.max(0.05, Math.min(0.6, s.opacity + Math.sin(t * s.twinkleSpeed * 50) * 0.015));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${s.opacity})`;
        ctx.fill();
      });

      const totalEdges = edges.length;
      const activeEdges = prog * totalEdges;

      // Draw constellation lines
      edges.forEach(([a, b], i) => {
        const lineProgress = Math.max(0, Math.min(1, activeEdges - i));
        if (lineProgress <= 0) return;
        const ax = nodes[a].x * W, ay = nodes[a].y * H;
        const bx = nodes[b].x * W, by = nodes[b].y * H;
        const ex = ax + (bx - ax) * lineProgress;
        const ey = ay + (by - ay) * lineProgress;

        // Glow line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.12 + lineProgress * 0.15})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Core line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.55 + lineProgress * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Travelling particle at the tip
        if (lineProgress > 0 && lineProgress < 1) {
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 245, 255, 0.95)';
          ctx.shadowColor = '#22d3ee';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw constellation nodes
      nodes.forEach((n, i) => {
        const nodeActivation = Math.max(0, Math.min(1, (prog * totalEdges) - (i * 0.8)));
        if (nodeActivation <= 0) return;

        const nx = n.x * W, ny = n.y * H;
        const pulse = 0.6 + Math.sin(t * 2 + i * 0.9) * 0.4;

        // Outer halo
        ctx.beginPath();
        ctx.arc(nx, ny, 6 * nodeActivation * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.06 * nodeActivation})`;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5 * nodeActivation, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.6 * nodeActivation})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, 1.8 * nodeActivation, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 245, 255, ${0.9 * nodeActivation})`;
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 6 * nodeActivation;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Nebula glow at high progress
      if (prog > 0.7) {
        const cx = 0.5 * W, cy = 0.45 * H;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.45);
        grad.addColorStop(0, `rgba(139, 92, 246, ${(prog - 0.7) * 0.06})`);
        grad.addColorStop(0.5, `rgba(34, 211, 238, ${(prog - 0.7) * 0.03})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [filledFields, totalFields]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

// ========================================================
// SERVICES PAGE
// ========================================================
export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'New project from Services page',
  });

  // Count filled fields for constellation progress
  const filledFields = [formData.name, formData.email, formData.message].filter(v => v.trim().length > 0).length;
  const totalFields = 3;

  const pipelineSteps = [
    "INITIALIZING TELEMETRY INJECTION PIPELINE...",
    "ISOLATING CONCURRENT DESCRIPTOR CONTAINERS...",
    "ORCHESTRATING FASTAPI SECURE ENVIRONMENT...",
    "INJECTING ZERO-TRUST PERIMETER MUTATIONS...",
    "RUNNING STATIC EXPLOIT FORENSICS ON SOURCE STACK...",
    "VERIFYING CRYPTOGRAPHIC SHIELD INTEGRITY...",
    "PIPELINE COMPILED SUCCESSFULLY. TARGET BOUND."
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cosmic-vortex-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes cosmic-float-subtle { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-8px,0); } }
      .animate-vortex-slow { animation: cosmic-vortex-slow 75s linear infinite; will-change: transform; }
      .animate-cosmic-float { animation: cosmic-float-subtle 5s ease-in-out infinite; will-change: transform; }
      .text-neon-glow { text-shadow: 0 0 8px rgba(34,211,238,0.4), 0 0 20px rgba(34,211,238,0.15); }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    if (!isDeploying) return;
    if (currentStep < pipelineSteps.length) {
      const timeout = setTimeout(() => {
        setPipelineLogs(prev => [...prev, `[OK] ${pipelineSteps[currentStep]}`]);
        setCurrentStep(prev => prev + 1);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [isDeploying, currentStep]);

  const handleStartDeployment = () => {
    setIsDeploying(true);
    setPipelineLogs(["[START] Establishing connection with cosmic cluster..."]);
    setCurrentStep(0);
  };

  const handleResetModal = () => {
    setSelectedService(null);
    setIsDeploying(false);
    setPipelineLogs([]);
    setCurrentStep(0);
    setContactStatus('idle');
    setFormData({ name: '', email: '', phone: '', message: '', subject: 'New project from Services page' });
  };

  const handleOpenService = (service: any) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, subject: `Project inquiry: ${service.title}` }));
  };

  // ── FORM LOGIC: NOT TOUCHED ──────────────────────────────
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('sending');
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cosmic-imagination.com';
    try {
      const res = await fetch(`${BASE_API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    formData.name,
          email:   formData.email,
          phone:   formData.phone || 'Not provided',
          message: formData.message,
          subject: formData.subject,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContactStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', subject: 'New project from Services page' });
        setTimeout(() => handleResetModal(), 4000);
      } else {
        console.error('Backend error:', data.detail);
        setContactStatus('error');
        setTimeout(() => setContactStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Connection failed:', err);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };
  // ────────────────────────────────────────────────────────

  const services = [
    {
      title: "Design & Infrastructure",
      id: "engineering",
      icon: Terminal,
      glowColor: "rgba(34,211,238,0.10)",
      iconColor: "text-cyan-400",
      eyebrow: "Scale without limits",
      description: "Your backend is the foundation everything else rests on. We build APIs, microservices, and cloud infrastructure that handle real load — and keep handling it as you grow.",
      pitch: "Whether you're hitting performance ceilings, migrating a legacy monolith, or launching something that needs to work at scale from day one, we architect systems that don't break under pressure.",
      features: ["FastAPI & Node.js high-throughput APIs", "Microservices & event-driven architecture", "Cloud infrastructure on GCP & AWS", "CI/CD pipelines with zero-downtime deploys"],
      details: "We've migrated production systems from Django to FastAPI, cutting response latency by over 40%. We design for fault tolerance, horizontal scaling, and observability from the ground up — not as an afterthought."
    },
    {
      title: "Interfaces That Convert",
      id: "design",
      icon: Layout,
      glowColor: "rgba(255,255,255,0.04)",
      iconColor: "text-white",
      eyebrow: "First impressions close deals",
      description: "Users decide in seconds whether to trust your product. We design interfaces that feel effortless — removing every point of friction between your user and the action you need them to take.",
      pitch: "We work with React and Next.js to build UIs that are fast, accessible, and built to retain. Not just beautiful — functional.",
      features: ["React & Next.js component systems", "Conversion-focused UX architecture", "Interactive prototyping", "Performance-optimized frontend builds"],
      details: "Every layout decision we make is grounded in how people actually navigate digital products. We eliminate cognitive load so users move through your product with confidence — and come back."
    },
    {
      title: "Security Audit & Compliance",
      id: "consulting",
      icon: ShieldAlert,
      glowColor: "rgba(168,85,247,0.10)",
      iconColor: "text-purple-400",
      eyebrow: "Know exactly where you're exposed",
      description: "A security gap you don't know about is the most expensive one. We audit your infrastructure, identify vulnerabilities, and give you a concrete roadmap to fix them — aligned with ISO/IEC 27001.",
      pitch: "We've run security audits for cloud-native platforms on GCP and AWS. We don't hand you a 40-page report — we tell you what to fix first, and why.",
      features: ["ISO/IEC 27001 compliance audit", "Threat modeling & vulnerability assessment", "Zero-trust architecture review", "Legacy stack security roadmap"],
      details: "Backed by our ISO/IEC 27001 Lead Auditor certification, we assess your current posture and identify structural gaps before someone else does. Delivered as an actionable remediation plan with clear priorities."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center relative overflow-x-hidden">
      <AstronautWidget />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#050914_0%,#000000_75%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">

        {/* ── HEADER ── */}
        <div className="text-center space-y-6 transform-gpu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-white/5 rounded-full select-none group">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-vortex-slow" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// What we build</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extralight tracking-tighter uppercase leading-tight">
            We solve the problems <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 font-bold text-neon-glow">
              that slow your team down
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed font-light tracking-wide">
            Backend engineering, frontend design, and security auditing — built for teams that need things to work, stay fast, and stay secure.
          </p>
        </div>

        {/* ── SERVICE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              onClick={() => handleOpenService(service)}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: index * 0.4 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.35)", boxShadow: "0 20px 45px rgba(0,0,0,0.85)" }}
              whileTap={{ scale: 0.99 }}
              style={{ willChange: "transform" }}
              className="relative group cursor-pointer rounded-[2.5rem] border border-white/5 bg-[#070709] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              <div style={{ backgroundColor: service.glowColor }} className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-all duration-500 pointer-events-none" />

              <div className="p-8 md:p-10 relative z-10 flex flex-col h-full justify-between min-h-[420px]">
                <div>
                  {/* Eyebrow */}
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-600 group-hover:text-cyan-500/70 transition-colors duration-300 mb-5">
                    {service.eyebrow}
                  </p>

                  {/* Icon */}
                  <div className="mb-6 p-4 bg-neutral-900/80 w-fit rounded-2xl border border-white/5 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-neutral-900">
                    <service.icon className={`w-6 h-6 ${service.iconColor} transition-transform duration-300 group-hover:scale-105`} />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed font-light mb-4">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-1.5 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
                        <div className="w-1 h-1 rounded-full bg-cyan-500/60 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 group-hover:text-cyan-400 transition-colors duration-300 pt-5 border-t border-white/[0.04]">
                  <span>[ Start a conversation ]</span>
                  <div className="p-2 rounded-xl bg-neutral-950 border border-white/5 group-hover:border-cyan-500/40 transition-all duration-300 group-hover:bg-cyan-950/20">
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── TELEMETRY ── */}
        <TelemetryModule />

        {/* ── MODAL ── */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={handleResetModal}
                className="fixed inset-0 bg-black/85 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#050505] border border-neutral-800 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden transform-gpu z-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />

                <button
                  onClick={handleResetModal}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors duration-200 z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                <AnimatePresence mode="wait">
                  {!isDeploying ? (
                    /* ── STEP 1: SERVICE DETAIL ── */
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                      className="p-6 md:p-10 space-y-6"
                    >
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-cyan-950/30 border border-cyan-500/20 rounded-md font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
                          // {selectedService.eyebrow}
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-white text-neon-glow">
                          {selectedService.title}
                        </h3>
                        <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-cyan-500 pl-5 py-1 font-light bg-neutral-950/40 pr-2 rounded-r-xl">
                          {selectedService.details}
                        </p>
                      </div>

                      {/* Pitch line */}
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {selectedService.pitch}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">What's included:</span>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedService.features.map((f: string) => (
                            <div key={f} className="flex items-center gap-3 text-xs font-mono text-neutral-300 bg-neutral-900/30 p-3 rounded-xl border border-white/[0.02]">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00FFFF] flex-shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleStartDeployment}
                          className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl text-xs font-mono uppercase tracking-widest font-bold text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          Get in touch <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── STEP 2: CONSTELLATION CONTACT ── */
                    <motion.div
                      key="constellation"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    >
                      {/* Constellation canvas — top half */}
                      <div className="relative w-full h-48 overflow-hidden rounded-t-[2.5rem] bg-[#03030a]">
                        <ConstellationCanvas filledFields={filledFields} totalFields={totalFields} />

                        {/* Overlay label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <AnimatePresence mode="wait">
                            {filledFields === 0 && (
                              <motion.p
                                key="hint0"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest"
                              >
                                Fill in your details to map the constellation
                              </motion.p>
                            )}
                            {filledFields === 1 && (
                              <motion.p
                                key="hint1"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                className="font-mono text-[10px] text-cyan-600 uppercase tracking-widest"
                              >
                                Signal acquired — keep going
                              </motion.p>
                            )}
                            {filledFields === 2 && (
                              <motion.p
                                key="hint2"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest"
                              >
                                Constellation forming...
                              </motion.p>
                            )}
                            {filledFields >= 3 && (
                              <motion.p
                                key="hint3"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest text-neon-glow"
                              >
                                ✦ Coordinates locked. Ready to transmit.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Form section */}
                      <div className="p-6 md:p-8 font-mono space-y-5">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <span className="text-[10px] text-cyan-400 flex items-center gap-2 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            OPEN CHANNEL — {selectedService.title.toUpperCase()}
                          </span>
                          <span className="text-[9px] text-neutral-600">PROCESS_ID: 94A_{selectedService.id.toUpperCase()}</span>
                        </div>

                        <AnimatePresence mode="wait">
                          {contactStatus !== 'success' && contactStatus !== 'error' ? (
                            <motion.form
                              key="form"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              onSubmit={handleContactSubmit}
                              className="space-y-4"
                            >
                              <div>
                                <p className="text-[10px] text-purple-400 font-bold tracking-widest uppercase mb-1">// Tell us about your project</p>
                                <p className="text-neutral-500 text-[11px] leading-relaxed font-sans font-light">
                                  No forms for the sake of forms. Just what we need to understand your situation and get back to you with something useful.
                                </p>
                              </div>

                              <div className="space-y-3">
                                <input
                                  type="text"
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Your name or company"
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-cyan-400 placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                  />
                                  <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Phone (optional)"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                  />
                                </div>
                                <textarea
                                  required
                                  rows={3}
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  placeholder="What are you building, and where are you stuck?"
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={contactStatus === 'sending'}
                                className="w-full py-3.5 bg-cyan-400 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md font-mono"
                              >
                                {contactStatus === 'sending' ? (
                                  <>
                                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    Send message <Send className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </motion.form>
                          ) : contactStatus === 'success' ? (
                            <motion.div
                              key="success"
                              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="bg-neutral-950 border border-cyan-500/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-2xl"
                            >
                              <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-bounce">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-white font-bold uppercase block tracking-wider text-neon-glow">Message received.</span>
                                <span className="text-neutral-400 text-xs font-sans font-light block">
                                  We'll be in touch within 24 hours. Looking forward to it.
                                </span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="error"
                              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="bg-neutral-950 border border-red-500/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-2xl"
                            >
                              <div className="w-12 h-12 bg-red-950/40 border border-red-400/30 rounded-full flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <AlertTriangle className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-white font-bold uppercase block tracking-wider text-red-400">Something went wrong</span>
                                <span className="text-neutral-400 text-xs font-sans font-light block">
                                  The message didn't go through. Check your connection and try again.
                                </span>
                              </div>
                              <button
                                onClick={() => setContactStatus('idle')}
                                className="px-5 py-2 bg-neutral-900 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                              >
                                Try again
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}