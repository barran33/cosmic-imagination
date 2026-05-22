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
  CheckCircle2
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "SYS_INIT: Quantum kernel synchronized.",
    "AUDIT: ISO/IEC 27001 baseline established.",
    "SEC_MONITOR: Listening on port 443..."
  ]);

  // Estados del Pipeline de Despliegue Inmersivo
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const pipelineSteps = [
    "INITIALIZING TELEMETRY INJECTION PIPELINE...",
    "ISOLATING CONCURRENT DESCRIPTOR CONTAINERS...",
    "ORCHESTRATING FASTAPI/DJANGO SECURE ENVIRONMENT...",
    "INJECTING ZERO-TRUST PERIMETER MUTATIONS...",
    "RUNNING STATIC EXPLOIT FORENSICS ON SOURCE STACK...",
    "VERIFYING CRYPTOGRAPHIC SHIELD INTEGRITY...",
    "PIPELINE COMPILED SUCCESSFULLY. TARGET BOUND."
  ];

  // Manejo de la secuencia del terminal táctico
  useEffect(() => {
    if (!isDeploying) return;
    if (currentStep < pipelineSteps.length) {
      const timeout = setTimeout(() => {
        setPipelineLogs(prev => [...prev, `[OK] ${pipelineSteps[currentStep]}`]);
        setCurrentStep(prev => prev + 1);
      }, 900); // Velocidad de render secuencial en milisegundos
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
    setLeadEmail("");
    setIsSubmitted(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail.trim()) {
      setIsSubmitted(true);
      // Aquí puedes conectar tu webhook de Discord/Slack o base de datos en el futuro
      console.log(`Target connection authorized by: ${leadEmail}`);
    }
  };

  // Simulación de Logs locos del Dashboard de fondo
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
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      title: "Quantum Software Engineering",
      id: "engineering",
      icon: Terminal,
      color: "from-cyan-500/10 to-cyan-950/20",
      iconColor: "text-cyan-400",
      description: "We develop critical infrastructure and secure backends. We don't build generic applications; we forge high-performance ecosystems.",
      features: ["Distributed Systems Architecture", "Surgical Microservices", "Zero-Latency Infrastructures"],
      details: "Our engineering process focuses on high-concurrency environments and fault-tolerant architectures. We leverage advanced Python (FastAPI/Django) and Next.js stacks to ensure your infrastructure is not just functional, but indestructible and perfectly scalable under heavy operational loads."
    },
    {
      title: "Harmonic Interface Design",
      id: "design",
      icon: Layout,
      color: "from-white/5 to-neutral-900/20",
      iconColor: "text-white",
      description: "Interactive design based on golden ratios. Visual structures that eliminate cognitive friction and maximize retention.",
      features: ["Sacred Geometry UI Proportions", "High-Converting Spatial UX", "Interactive Functional Prototyping"],
      details: "We map user journeys using universal ratios. Every interface component is mathematically aligned to reduce cognitive load, ensuring that your users navigate your digital ecosystem with intuitive ease, accelerating retention and conversion metrics organically."
    },
    {
      title: "Strategic Alchemical Audit",
      id: "consulting",
      icon: ShieldAlert,
      color: "from-purple-500/10 to-purple-950/20",
      iconColor: "text-purple-400",
      description: "Tactical consulting and systems auditing. We transform obsolete stacks into modern, secure, and scalable architectures.",
      features: ["Zero-Trust Cybersecurity Auditing", "Smart Contract & Web3 Verification", "Architecture Transmutation Roadmap"],
      details: "We perform deep-dive forensics on your current digital architecture. Backed by ISO/IEC 27001:2022 standards, our audit identifies bottlenecks, structural vulnerabilities, and legacy weight, transmuting them into clean, high-performance operational pipelines."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center relative overflow-x-hidden">
      
      {/* Ambiente de Fondo Estático */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#050811_0%,#000_80%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        {/* Header Principal */}
        <div className="text-center space-y-6 transform-gpu">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-white/5 rounded-full select-none group">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700 ease-out" />
            <span className="text-cyan-400 font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase">// SYSTEM ACTIVE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extralight tracking-tighter uppercase leading-tight">
            Architectures Engineered to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 font-bold">
              Dominate the Ecosystem
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed font-light tracking-wide">
            We merge absolute mathematical synchronization with robust tactical deployments. No generic templates, no compromised lines of code.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="relative group cursor-pointer rounded-[2rem] border border-white/5 bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-cyan-500/30 active:scale-[0.99] transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_50%_50%,rgba(34,211,238,0.06),transparent_60%)] transition-opacity duration-300 pointer-events-none" />

              <div className="p-8 md:p-10 relative z-10 flex flex-col h-full justify-between min-h-[380px]">
                <div>
                  <div className="mb-8 p-4 bg-neutral-900 w-fit rounded-2xl border border-white/5 transition-colors duration-300 group-hover:border-cyan-500/20 transform-gpu">
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4 group-hover:text-cyan-400 transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-hover:text-cyan-400 transition-colors duration-200 pt-4 border-t border-white/[0.03]">
                  <span>[ Initialize Audit ]</span>
                  <div className="p-1.5 rounded-lg bg-neutral-900 border border-white/5 group-hover:border-cyan-500/30 transition-all duration-200 group-hover:translate-x-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MÓDULO DE TELEMETRÍA CUÁNTICA EN VIVO --- */}
        <div className="relative border border-white/5 rounded-[2rem] bg-[#050505]/60 overflow-hidden p-6 md:p-8 font-mono text-xs transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-purple-500/40" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-[11px]">// CORE_METRICS // REAL_TIME_TELEMETRY</span>
            </div>
            <div className="text-neutral-500 text-[10px] uppercase tracking-widest">
              COSMIC_NODE_ID: <span className="text-cyan-400">0x7F_INIT_MAIN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-950/80 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>System Heatrate Threshold</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>CONCURRENCY_LOAD</span>
                  <span className="text-purple-400 font-bold">89.4%</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden p-[1px]">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full w-[89%] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </div>

            <div className="bg-neutral-950/80 border border-white/[0.03] p-5 rounded-2xl md:col-span-1 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] uppercase tracking-wider mb-2">
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

            <div className="bg-neutral-950/80 border border-white/[0.03] p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-white" />
                <span>Ecosystem Integrity</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-neutral-900/40 p-2 border border-white/[0.02] rounded-lg">
                  <div className="text-neutral-500">ISO_STATUS</div>
                  <div className="text-white font-bold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" /> AUDITED
                  </div>
                </div>
                <div className="bg-neutral-900/40 p-2 border border-white/[0.02] rounded-lg">
                  <div className="text-neutral-500">API_LATENCY</div>
                  <div className="text-white font-bold flex items-center gap-1 mt-0.5">
                    <Activity className="w-3 h-3 text-purple-400" /> 0.8ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MODAL CON TERMINAL INTEGRADO INTERACTIVO --- */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95" 
              onClick={handleResetModal}
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#060606] border border-neutral-800 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden transform-gpu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
                
                <button 
                  onClick={handleResetModal} 
                  className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <AnimatePresence mode="wait">
                  {!isDeploying ? (
                    /* PASO 1: VISTA NORMAL DE CAPACIDADES */
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }}
                      className="space-y-6"
                    >
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/20 border border-cyan-500/20 rounded-md font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
                          // Module Analysis
                        </div>
                        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white uppercase">
                          {selectedService.title}
                        </h3>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed border-l-2 border-cyan-500 pl-6 py-1 italic font-light font-sans">
                          {selectedService.details}
                        </p>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/[0.05] space-y-4">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">System Capabilities:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedService.features.map((f: string) => (
                            <div key={f} className="flex items-center gap-3 text-xs font-mono text-neutral-300 bg-neutral-900/40 p-3 rounded-xl border border-white/[0.02]">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 flex justify-end">
                        <button 
                          onClick={handleStartDeployment} 
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-xs font-mono uppercase tracking-widest font-bold text-black hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          Deploy Deployment Pipeline <ChevronRight className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* PASO 2: TERMINAL INTERACTIVA EN DESPLIEGUE */
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="space-y-6 font-mono"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <span className="text-[10px] text-cyan-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 
                          LIVE CORE CORE_RUN_PIPELINE.SH
                        </span>
                        <span className="text-[9px] text-neutral-600">PROCESS_ID: {Math.floor(Math.random() * 9000 + 1000)}</span>
                      </div>

                      {/* Ventana de Consola */}
                      <div className="bg-black border border-neutral-800 rounded-xl p-4 min-h-[180px] flex flex-col justify-start space-y-2 text-[11px] text-neutral-400 overflow-y-auto max-h-[220px]">
                        {pipelineLogs.map((log, idx) => (
                          <div key={idx} className={idx === pipelineLogs.length - 1 ? "text-cyan-400" : "text-neutral-500"}>
                            {log}
                          </div>
                        ))}
                        {currentStep < pipelineSteps.length && (
                          <div className="text-white animate-pulse">_</div>
                        )}
                      </div>

                      {/* Fase final: Interrupción para conversión (Formulario) */}
                      {currentStep === pipelineSteps.length && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="pt-4 border-t border-neutral-800 space-y-4"
                        >
                          {!isSubmitted ? (
                            <form onSubmit={handleLeadSubmit} className="space-y-4">
                              <p className="text-xs text-neutral-400 leading-relaxed">
                                <span className="text-purple-400 font-bold">AUTHENTICATION REQUIRED:</span> Enter your communication node (email) to hook deployment configurations and initialize execution vectors with our architects.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                  type="email" 
                                  required
                                  value={leadEmail}
                                  onChange={(e) => setLeadEmail(e.target.value)}
                                  placeholder="root@yourdomain.com"
                                  className="flex-grow bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-cyan-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                />
                                <button 
                                  type="submit"
                                  className="px-6 py-3 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-300 active:scale-[0.98] transition-all flex items-center justify-center gap-1"
                                >
                                  Authorize Node
                                </button>
                              </div>
                            </form>
                          ) : (
                            <motion.div 
                              initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              className="bg-cyan-950/10 border border-cyan-500/20 p-4 rounded-xl flex items-center gap-3"
                            >
                              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                              <div className="text-xs">
                                <span className="text-white font-bold uppercase block">Handshake Successful.</span>
                                <span className="text-neutral-400">Our operational core will transmit connection keys to <span className="text-cyan-400 font-semibold">{leadEmail}</span> shortly.</span>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}