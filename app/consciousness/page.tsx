"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, ShieldCheck, Zap } from 'lucide-react';

export default function ConsciousnessPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header con énfasis en el propósito */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-extralight uppercase tracking-tighter mb-8">
            Conscious <span className="text-cyan-400">Development</span>
          </h2>
          <p className="text-cyan-300 text-neon-glow-css3 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Technology is not an end in itself, it's a catalyst. We design digital ecosystems where operational efficiency converges with human ethics.
          </p>
        </motion.div>

        {/* Pilares de Consciencia */}
        <div className="space-y-12 text-neon-glow-css">
          {[
            {
              icon: ShieldCheck,
              title: "Digital Ethics by Design",
              text: "We implement integrity layers from the first commit. We prioritize data sovereignty and transparency in every information flow we manage."
            },
            {
              icon: Globe,
              title: "Sustainable Development",
              text: "We optimize the digital footprint of each system. We create lightweight architectures that consume fewer resources, maximizing the energy efficiency of the ecosystem."
            },
            {
              icon: Heart,
              title: "User-centered design",
              text: "We build interfaces that respect the user's attention. Less friction, more purpose; tools designed to enhance the human experience, not distract from it."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-start p-8 border-l border-neutral-900 hover:border-cyan-900/50 transition-colors"
            >
              <div className="p-4 bg-neutral-950 rounded-2xl">
                <item.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white leading-relaxed max-w-2xl">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre de Consciencia */}
        <div className="mt-24 text-center border-t border-neutral-900 pt-16">
          <Zap className="w-10 h-10 text-cyan-500 mx-auto mb-6" />
          <p className="text-neutral-400 font-mono text-sm tracking-widest uppercase">
            // Development with intention. Engineering with impact.

          </p>
        </div>
      </div>
    </div>
  );
}