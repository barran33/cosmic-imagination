"use client";
import { motion } from 'framer-motion';
import { Sparkles, Code, Activity, Atom } from 'lucide-react'; 
// Eliminamos la importación de Link de 'next/link' para evitar el error de compilación.
import React, { useState, useEffect } from 'react';

// Componente para el título con efecto Neón
const NeonTitle = ({ text }: { text: string }) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    // Mantener el color cian y el brillo CSS
    className={`text-center font-extrabold text-cyan-300 text-neon-glow-css whitespace-nowrap 
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl`} 
  >
    {text}
  </motion.h1>
);

// Componente para el botón de la Auditoría
const NeonButton = () => (
  // Reemplazamos <Link> con un <a> o div para evitar la dependencia de next/link
  <a href="/cosmic-exploration" aria-label="Ir a Oráculo Cósmico" 
     className="block max-w-max mx-auto" // Asegura que la animación funciona en el div
  > 
    <motion.div
      // Efecto de brillo al pasar el ratón usando la sombra personalizada
      whileHover={{ scale: 1.05, boxShadow: '0 0 10px #00FFFF, 0 0 40px #00FFFF' }} 
      whileTap={{ scale: 0.95 }}
      // Estilo oscuro con texto cian para mantener el contraste
      className="mt-8 px-8 py-3 bg-gray-900/50 text-cyan-300 font-bold uppercase border border-cyan-300 rounded-full tracking-widest cursor-pointer transition-all duration-300 shadow-neon-light text-neon-glow-css"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5" />
        Cosmic Portal
      </div>
    </motion.div>
  </a>
);

// Datos de los proyectos conceptuales (reutilizados del componente anterior)
const projectData = [
  { 
    title: "Cosmic Architect", 
    tagline: "Espacio para Crear",
    // ANTES: "/proyectos/ascension-ai" -> CAMBIO SUGERIDO: 
    href: "/geometry", // ¡Usaremos esta ruta de forma temporal para pruebas!
    icon: Activity,
    tech: "React Native, Python ML" 
  },
  { 
    title: "Cosmic Symphony", 
    tagline: "Dashboard de Análisis de Datos Astrofísicos",
    // 🚨 RUTA CORREGIDA: Debe coincidir con la carpeta app/star-trip/page.tsx
    href: "/resonance", 
    icon: Atom,
    tech: "Next.js, FastAPI, Big Data" 
  },
  { 
    title: "Divine Flow", 
    tagline: "Sistema de Gestión de Proyectos Cuánticos",
    href: "/DivineFlow",
    icon: Code,
    tech: "React, WebSockets, QA" 
  },
];

// Componente para la sección de proyectos destacada en la Home Page
const FeaturedProjects = () => (
    <section className="py-20 md:py-32 bg-dark-space/0"> {/* El fondo de esta sección lo maneja el contenedor principal (negro) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título "Portfolio Destacado" con brillo y color cian */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center text-lg uppercase tracking-widest text-cyan-300 text-neon-glow-css mb-2"
            >
                Galactic Portfolio
            </motion.p>
            {/* Título principal de la sección de Proyectos con brillo y color cian */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-5xl font-extrabold text-cyan-100 text-neon-glow-css text-center mb-16"
            >
                High-Frequency Projects
            </motion.h2>

            {/* Grid de tarjetas de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projectData.map((project, index) => {
                    const Icon = project.icon;
                    return (
                        // Reemplazamos <Link> con un <a> HTML estándar
                        <a href={project.href} key={project.title} className="block"> 
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true, amount: 0.5 }}
                                whileHover={{ 
                                    scale: 1.03, 
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' // Efecto Neón
                                }}
                                // Fondo oscuro translúcido con backdrop-blur para el efecto de neón
                                className="bg-gray-900/70 backdrop-blur-sm border-2 border-cyan-300/50 p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer hover:border-cyan-300 flex flex-col items-start h-full"
                            >
                                {/* Icono con brillo y color cian */}
                                <Icon className="w-8 h-8 text-cyan-300 text-neon-glow-css mb-4 drop-shadow-neon-light" />
                                {/* Título de la tarjeta con brillo y color cian */}
                                <h3 className="text-3xl font-bold text-cyan-300 text-neon-glow-css mb-2">{project.title}</h3>
                                {/* Tagline de la tarjeta */}
                                <p className="text-gray-400 italic mb-4 flex-grow">{project.tagline}</p>
                                {/* Stack de la tarjeta */}
                                <p className="text-cyan-300 font-mono text-sm mt-auto">Stack: {project.tech}</p>
                            </motion.div>
                        </a>
                    );
                })}
            </div>
        </div>
    </section>
);


// Sección Hero Principal y el Layout de la página
export default function HomePage() {
  // URL de fondo de nebulosa oscura (placeholder)
  const cosmicBackgroundUrl = "https://i.ibb.co/6cJGmY57/2795-C464-DAC8-4-FBB-889-C-BEE78-FDA8-DD9.jpg";

  // Agregamos un pequeño ajuste para los estilos CSS necesarios
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Estilos para el efecto Neón */
      .text-neon-glow-css {
        text-shadow: 0 0 5px #00FFFF, 0 0 10px #00FFFF;
      }
      .shadow-neon-light {
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.5);
      }
      /* Fondo principal negro */
      .bg-dark-space {
        background-color: #000000ff;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  return (
    
    <div className="min-h-screen relative bg-dark-space text-white font-sans">
      
     
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
        style={{ 
          backgroundImage: `url('${cosmicBackgroundUrl}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          // El fondo NO es fijo, lo que permite que el scroll muestre el fondo negro de abajo.
        }}
      >
          {/* Capa de Superposición Oscura (Overlay) para el Hero */}
          {/* <div className="absolute inset-0 bg-dark-space/80 backdrop-blur-[1px] z-0"></div> */}

          {/* Contenido del Hero (Asegurado con z-index alto) */}
          <div className="relative z-10 pt-20 pb-10">
              {/* Título de Neón */}
              <NeonTitle text="Co§mic Imagination!" />

              {/* Subtítulo que define tu valor */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-4 text-white text-neon-glow-css text-xl md:text-2xl max-w-xl mx-auto"
              >
                "We unify scientific and spiritual knowledge to improve the well-being of the Cosmos."
              </motion.p>
              
              {/* Botón de la Auditoría (Tu CTA principal) */}
              <NeonButton />
          </div>
      </section>
      {/* ==================================================================== */}

      {/* 3. RESTO DEL CONTENIDO (Fondo Negro Sólido) */}
      <div className="relative z-10"> 
        {/* SECCIÓN DE PROYECTOS DESTACADOS */}
        <FeaturedProjects />
        
        {/* Espacio extra para ver el efecto de scroll contra el fondo negro */}
        <div className='p-20 text-center text-gray-500'>
            <p className='text-3xl font-light mb-4'>Explora nuestra galaxia de proyectos...</p>
            <p>La sección con fondo negro sólido comienza aquí, confirmando que la imagen del Hero ya no está presente al hacer scroll.</p>
            <div className='h-screen'></div> {/* Espacio para forzar más scroll */}
            <p>Fin del contenido.</p>
        </div>
      </div>
    </div>
  );
}