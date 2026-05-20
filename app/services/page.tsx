"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, spring } from 'framer-motion';
import { Terminal, Layout, ShieldAlert, ChevronRight, X, Sparkles, Orbit } from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const services = [
    {
      title: "Quantum Software Engineering",
      id: "engineering",
      icon: Terminal,
      color: "text-cyan-400",
      description: "We develop critical infrastructure and secure backends. We don't build generic applications; we forge high-performance ecosystems.",
      features: ["Distributed Systems", "Microservices Architecture", "Zero Latency"],
      details: "Our engineering process focuses on high-concurrency environments and fault-tolerant architectures. We leverage cutting-edge tech stacks to ensure your infrastructure is not just functional, but indestructible and perfectly scalable."
    },
    {
      title: "Harmonic Interface Design",
      id: "design",
      icon: Layout,
      color: "text-white",
      description: "Interactive design based on golden ratios. Visual structures that eliminate cognitive friction and maximize retention.",
      features: ["Sacred Geometry UI", "High-Converting UX", "Real Prototyping"],
      details: "We map user journeys using universal proportions. Every interface component is mathematically aligned to reduce cognitive load, ensuring that your users navigate your digital ecosystem with intuitive ease and high engagement."
    },
    {
      title: "Strategic Alchemical Audit",
      id: "consulting",
      icon: ShieldAlert,
      color: "text-purple-400",
      description: "Tactical consulting and systems auditing. We transform obsolete stacks into modern, secure, and scalable architectures.",
      features: ["Zero-Trust Security", "Stack Optimization", "Strategic Roadmap"],
      details: "We perform deep-dive forensics on your current digital architecture. Our audit identifies bottlenecks, security vulnerabilities, and legacy weight, transmuting them into clean, high-performance operational pipelines."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-hidden py-24 px-6 flex flex-col items-center relative">
      
      {/* Background Ambience: Gradiente cinemático */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0f1d_0%,#000_70%)] pointer-events-none z-0" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header con efecto de entrada */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-900/50 border border-cyan-500/30 rounded-full mb-6">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Operational Core Active</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            SaaS Solutions in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Real Action</span>
          </h2>
          <p className="text-white  text-neon-glow-css max-w-2xl mx-auto text-lg leading-relaxed font-light">
            We unify technical precision and strategic vision to deploy digital transformation tools that dominate the current ecosystem.
          </p>
        </motion.div>

        {/* Grid de Cards: Efecto Hover 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              onClick={() => setSelectedService(service)}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="relative group cursor-pointer perspective-1000"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/50 to-purple-600/50 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative h-full p-8 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-xl group-hover:border-cyan-500/50 transition-all duration-500">
                <div className={`mb-8 p-4 bg-white/5 w-fit rounded-2xl ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-neutral-400 text-sm mb-8 leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                   Explore Capabilities <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Interfaz tipo "HUD" */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
              onClick={() => setSelectedService(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neutral-950 border border-cyan-500/20 p-12 rounded-[3rem] max-w-2xl w-full relative shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* HUD Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse" />
                <Sparkles className="absolute top-10 right-10 text-cyan-500/50 w-12 h-12" />

                <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors">
                  <X className="w-8 h-8" />
                </button>
                
                <h3 className="text-5xl font-light mb-8 uppercase tracking-tighter text-white">
                  {selectedService.title}
                </h3>
                <p className="text-neutral-300 text-lg leading-relaxed border-l border-cyan-500 pl-8 mb-10">
                  {selectedService.details}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {selectedService.features.map((f: string) => (
                    <div key={f} className="flex items-center gap-3 text-sm font-mono text-cyan-200/80">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}