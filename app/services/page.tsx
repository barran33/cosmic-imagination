"use client";
import React, { useState, useEffect } from 'react';
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
// CAPA COMPLEMENTARIA: WIDGET DEL ASTRONAUTA FLOTANTE
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
          <img 
            src="/cosmic-universe/assets/captain-963.png" 
            className="absolute inset-0 w-full h-full object-contain" 
            alt="Space Pirate Body"
          />
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
// SUB-MODULO AISLADO: TELEMETRÍA (EVITA RE-RENDERS EN EL CORE)
// ========================================================
const TelemetryModule = () => {
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "SYS_INIT: Quantum kernel synchronized.",
    "AUDIT: ISO/IEC 27001 baseline established.",
    "SEC_MONITOR: Listening on port 443..."
  ]);

  useEffect(() => {
    const events = [
      "VULN_SCAN: Blocked SQLi attempt on endpoint /api/v2/auth",
      "INTEGRITY: Smart contract state verification matched 100%",
      "OPTIMIZER: Transmuting legacy microservice payload [-34ms]",
      "ZERO_TRUST: Re-authenticating cryptographic perimeter",
      "METRICS: Zero-latency threshold stabilized at 0.8ms"
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
          <span className="text-neutral-200 font-bold uppercase tracking-wider text-[11px]">// MONITOR_TELEMETRY // LIVE_NODE</span>
        </div>
        <div className="text-neutral-600 text-[10px] uppercase tracking-widest">
          COSMIC_NODE_ID: <span className="text-purple-500">0x7F_INIT_MAIN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-950/90 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-inner">
          <div className="flex items-center gap-2 text-neutral-400 text-[10px] uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>System Heatrate Threshold</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>CONCURRENCY_LOAD</span>
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
            <span>Live Exploit Mitigation</span>
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
            <span>Ecosystem Integrity</span>
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

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);

  // Estados del Pipeline del Terminal Modal
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  
  // Tu objeto estructurado de Formulario y Estado funcional idéntico
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'Nueva Misión desde Terminal Cosmic',
  });

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
      @keyframes cosmic-vortex-slow {
        0% { transform: translate3d(0,0,0) rotate(0deg); }
        100% { transform: translate3d(0,0,0) rotate(360deg); }
      }
      @keyframes cosmic-float-subtle {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -8px, 0); }
      }
      .animate-vortex-slow {
        animation: cosmic-vortex-slow 75s linear infinite;
        will-change: transform;
      }
      .animate-cosmic-float {
        animation: cosmic-float-subtle 5s ease-in-out infinite;
        will-change: transform;
      }
      .text-neon-glow {
        text-shadow: 0 0 8px rgba(34, 211, 238, 0.4), 0 0 20px rgba(34, 211, 238, 0.15);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Manejo de la secuencia del terminal táctico
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
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      subject: 'Nueva Misión desde Terminal Cosmic',
    });
  };

  // Abre el servicio e inyecta dinámicamente el Subject correcto
  const handleOpenService = (service: any) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      subject: `Misión Táctica: ${service.title}`
    }));
  };

  // TU LÓGICA DE BACKEND REVISADA Y RE-INCORPORADA A LA PERFECCIÓN
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
          phone:   formData.phone || 'No registrado', 
          message: formData.message,
          subject: formData.subject,
        }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setContactStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          subject: 'Nueva Misión desde Terminal Cosmic',
        });
        setTimeout(() => handleResetModal(), 4000); // Cierra limpio el modal tras éxito
      } else {
        console.error('Interferencia detectada en el payload del backend:', data.detail);
        setContactStatus('error');
        setTimeout(() => setContactStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Fallo crítico en la conexión cósmica:', err);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  const services = [
    {
      title: "Quantum Software Engineering",
      id: "engineering",
      icon: Terminal,
      glowColor: "rgba(34,211,238,0.12)",
      iconColor: "text-cyan-400",
      description: "We develop critical infrastructure and secure backends. We don't build generic applications; we forge high-performance ecosystems.",
      features: ["Distributed Systems Architecture", "Surgical Microservices", "Zero-Latency Infrastructures"],
      details: "Our engineering process focuses on high-concurrency environments and fault-tolerant architectures. We leverage advanced Python (FastAPI) and Next.js stacks to ensure your infrastructure is indestructible and perfectly scalable under heavy operational loads."
    },
    {
      title: "Harmonic Interface Design",
      id: "design",
      icon: Layout,
      glowColor: "rgba(255,255,255,0.05)",
      iconColor: "text-white",
      description: "Interactive design based on golden ratios. Visual structures that eliminate cognitive friction and maximize retention.",
      features: ["Sacred Geometry UI Proportions", "High-Converting Spatial UX", "Interactive Functional Prototyping"],
      details: "We map user journeys using universal ratios. Every interface component is mathematically aligned to reduce cognitive load, ensuring that your users navigate your digital ecosystem with intuitive ease, accelerating retention."
    },
    {
      title: "Strategic Alchemical Audit",
      id: "consulting",
      icon: ShieldAlert,
      glowColor: "rgba(168,85,247,0.12)",
      iconColor: "text-purple-400",
      description: "Tactical consulting and systems auditing. We transform obsolete stacks into modern, secure, and scalable architectures.",
      features: ["Zero-Trust Cybersecurity Auditing", "Ecosystem Security Verification", "Architecture Transmutation Roadmap"],
      details: "We perform deep-dive forensics on your current digital architecture. Backed by ISO/IEC 27001 standards, our audit identifies bottlenecks, structural vulnerabilities, and legacy weight, transmuting them into clean operational pipelines."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center relative overflow-x-hidden">
      
      <AstronautWidget />

      {/* Capa de Fondo Radial Ultra Suave */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#050914_0%,#000000_75%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        {/* Header Principal */}
        <div className="text-center space-y-6 transform-gpu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-white/5 rounded-full select-none group">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-vortex-slow" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// METAPHYSICAL CORE SYSTEM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extralight tracking-tighter uppercase leading-tight">
            Architectures Engineered to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 font-bold text-neon-glow">
              Dominate the Ecosystem
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed font-light tracking-wide">
            We merge absolute mathematical synchronization with robust tactical deployments. No generic templates, no compromised lines of code.
          </p>
        </div>

        {/* Grid de Servicios con Efecto Flotante Optimizado Sin Caída de FPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              onClick={() => handleOpenService(service)}
              // Flotación fluida por hardware a través de variantes lineales limpias
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: index * 0.4
              }}
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(34, 211, 238, 0.35)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.85)"
              }}
              whileTap={{ scale: 0.99 }}
              style={{ willChange: "transform" }}
              className="relative group cursor-pointer rounded-[2.5rem] border border-white/5 bg-[#070709] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Fulgor Cósmico de Fondo */}
              <div 
                style={{ backgroundColor: service.glowColor }}
                className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-all duration-500 pointer-events-none" 
              />

              <div className="p-8 md:p-10 relative z-10 flex flex-col h-full justify-between min-h-[390px]">
                <div>
                  {/* Icon Container */}
                  <div className="mb-8 p-4 bg-neutral-900/80 w-fit rounded-2xl border border-white/5 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-neutral-900">
                    <service.icon className={`w-6 h-6 ${service.iconColor} transition-transform duration-300 group-hover:scale-105`} />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 uppercase font-mono text-neon-glow">
                    {service.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer Interaction */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 group-hover:text-cyan-400 transition-colors duration-300 pt-5 border-t border-white/[0.04]">
                  <span>[ Initialize Audit ]</span>
                  <div className="p-2 rounded-xl bg-neutral-950 border border-white/5 group-hover:border-cyan-500/40 transition-all duration-300 group-hover:bg-cyan-950/20">
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Módulo de Telemetría Aislado */}
        <TelemetryModule />

        {/* Modal con Terminal Integrado Interactivo y Formulario Sincronizado */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={handleResetModal}
                className="fixed inset-0 bg-black/85 backdrop-blur-sm"
              />

              {/* Contenedor Modal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#050505] border border-neutral-800 p-6 md:p-10 rounded-[2.5rem] max-w-xl w-full relative overflow-hidden transform-gpu z-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
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
                    /* PASO 1: VISTA DE CAPACIDADES */
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-cyan-950/30 border border-cyan-500/20 rounded-md font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
                          // Module Architecture Analysis
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-white uppercase font-mono text-neon-glow">
                          {selectedService.title}
                        </h3>
                        <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-cyan-500 pl-5 py-1 italic font-light font-sans bg-neutral-950/40 pr-2 rounded-r-xl">
                          {selectedService.details}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">System Capabilities:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                          {selectedService.features.map((f: string) => (
                            <div key={f} className="flex items-center gap-3 text-xs font-mono text-neutral-300 bg-neutral-900/30 p-3 rounded-xl border border-white/[0.02]">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00FFFF]" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={handleStartDeployment} 
                          className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl text-xs font-mono uppercase tracking-widest font-bold text-white hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          Deploy Deployment Pipeline <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* PASO 2: TERMINAL COMPILING & FORM COMPONENT */
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="space-y-6 font-mono"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                        <span className="text-[10px] text-cyan-400 flex items-center gap-2 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 
                          LIVE CORE CORE_RUN_PIPELINE.SH
                        </span>
                        <span className="text-[9px] text-neutral-600">PROCESS_ID: 94A_{selectedService.id.toUpperCase()}</span>
                      </div>

                      {/* Ventana de Consola */}
                      <div className="bg-black border border-neutral-900 rounded-xl p-4 min-h-[140px] flex flex-col justify-start space-y-1.5 text-[11px] text-neutral-400 overflow-y-auto max-h-[180px] shadow-inner">
                        {pipelineLogs.map((log, idx) => (
                          <div key={idx} className={idx === pipelineLogs.length - 1 ? "text-cyan-400" : "text-neutral-500"}>
                            {log}
                          </div>
                        ))}
                        {currentStep < pipelineSteps.length && (
                          <div className="text-white animate-pulse inline-block">_</div>
                        )}
                      </div>

                      {/* Formulario que consume la terminal al finalizar los Logs */}
                      {currentStep === pipelineSteps.length && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="pt-4 border-t border-neutral-900 space-y-4"
                        >
                          {contactStatus !== 'success' && contactStatus !== 'error' ? (
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                              <div className="text-center sm:text-left">
                                <h4 className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-1">// IDENTITY CONFIGURATION GATEWAY</h4>
                                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans font-light">
                                  Authorize secure connection vectors to route your architectural configurations directly to our core developers.
                                </p>
                              </div>

                              <div className="space-y-3">
                                <input 
                                  type="text" 
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Nombre Operativo / Empresa"
                                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="root@yourdomain.com"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-cyan-400 placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                  />
                                  <input 
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Frecuencia (Teléfono)"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                  />
                                </div>

                                <textarea 
                                  required
                                  rows={3}
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  placeholder="Describe tu visión tecnológica..."
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
                                    TRANSMITTING PACKETS...
                                  </>
                                ) : (
                                  <>
                                    Authorize & Transmit Node <Send className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </form>
                          ) : contactStatus === 'success' ? (
                            /* TRANS-MISIÓN EXITOSA */
                            <motion.div 
                              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="bg-neutral-950 border border-cyan-500/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-2xl"
                            >
                              <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-bounce">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-white font-bold uppercase block tracking-wider text-neon-glow">Handshake Successful.</span>
                                <span className="text-neutral-400 text-xs font-sans font-light block">
                                  Los paquetes de datos se transmitieron y procesaron correctamente en el nodo central. Sincronizaremos comunicación pronto.
                                </span>
                              </div>
                            </motion.div>
                          ) : (
                            /* TRANSMISIÓN CON ANOMALÍAS (ERROR) */
                            <motion.div 
                              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="bg-neutral-950 border border-red-500/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-2xl"
                            >
                              <div className="w-12 h-12 bg-red-950/40 border border-red-400/30 rounded-full flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <AlertTriangle className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-white font-bold uppercase block tracking-wider text-red-400">Interferencia Detectada</span>
                                <span className="text-neutral-400 text-xs font-sans font-light block">
                                  No se pudo enrutar la carga útil al clúster de destino. Revisa la consola o los parámetros de conexión de red.
                                </span>
                              </div>
                              <button 
                                onClick={() => setContactStatus('idle')}
                                className="px-5 py-2 bg-neutral-900 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                              >
                                Reintentar Enlace
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
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