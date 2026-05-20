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

// Componente para el botón de la Auditoría - AHORA CON CONTROL DE ACCIÓN PARA EL MODAL
const NeonButton = ({ onClick }: { onClick: () => void }) => (
  <div className="block max-w-max mx-auto" onClick={onClick}> 
    <motion.div
      // Conservamos tus efectos de brillo e interactividad intactos
      whileHover={{ scale: 1.05, boxShadow: '0 0 10px #00FFFF, 0 0 40px #00FFFF' }} 
      whileTap={{ scale: 0.95 }}
      // Estilo oscuro con texto cian original para mantener tu diseño exacto
      className="mt-8 px-8 py-3 bg-gray-900/50 text-cyan-300 font-bold uppercase border border-cyan-300 rounded-full tracking-widest cursor-pointer transition-all duration-300 shadow-neon-light text-neon-glow-css"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5" />
        Cosmic Portal
      </div>
    </motion.div>
  </div>
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

  // Agregamos el estado para controlar la apertura del modal directamente desde el Home
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Función manejadora para lanzar el Modal (conecta con tu arquitectura global)
  const handleOpenPortal = () => {
    // Si manejas un estado global (como un custom hook, context o Zustand), ejecútalo aquí.
    // De lo contrario, este trigger local cambia el estado para renderizar el formulario.
    setIsModalOpen(true);
    
    // Disparamos un evento personalizado por si el Navbar o el Layout global necesitan escuchar la acción
    const event = new CustomEvent('open-cosmic-portal');
    window.dispatchEvent(event);
  };

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
              
              {/* Botón de la Auditoría pasándole la función de activación */}
              <NeonButton onClick={handleOpenPortal} />
          </div>
      </section>
      {/* ==================================================================== */}

      {/* 3. RESTO DEL CONTENIDO (Fondo Negro Sólido) */}
      <div className="relative z-10"> 
        {/* SECCIÓN DE PROYECTOS DESTACADOS */}
        <FeaturedProjects />
        
        {/* Espacio extra para ver el efecto de scroll contra el fondo negro */}
        {/* SECCIÓN: EXPLORA NUESTRA GALAXIA DE PROYECTOS */}
{/* Expandido a max-w-7xl para abrir el terreno horizontal en desktop */}
<div className="w-full max-w-7xl mx-auto mt-24 mb-20 px-6 text-center relative selection:bg-cyan-500/30">
    
    {/* Resplandor Cósmico de Fondo */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

    <div className="relative z-10 space-y-10 max-w-5xl mx-auto">
        
        {/* Etiqueta de Telemetría Neón */}
        <div className="inline-block px-3 py-1 bg-cyan-950/30 border border-cyan-800/40 rounded-full">
            <h3 className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
                // QUANTUM METAPHYSICS ARCHIVE
            </h3>
        </div>
        
        {/* Título Principal Impresionante con Efecto Neón */}
        <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-white uppercase">
            Explore our  <span className="text-cyan-400 font-normal drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">galaxy of projects</span>
        </h2>
        
        {/* Manifiesto Alquímico / Cuántico Central */}
        
          <p className="text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wide text-justify sm:text-center max-w-4xl mx-auto">
            This ecosystem is the point of convergence where **science and spirituality** unify, intertwining **quantum physics**, **modern alchemy**, **sacred geometry**, and **cymatics**. Through universal patterns and conscious software development, we structure interactive interfaces with the purpose of elevating the human experience and making this world a better place to live. We don't create ordinary technology; we design digital transformation tools that tune frequencies, optimize flows, and materialize intentions into highly resonant visual architectures.

        </p>

        {/* Desglose Explicativo de la Tríada Cósmica */}
        {/* Incrementado el gap-8 para mejor distribución de las columnas ampliadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-left">
            
            {/* Esencia 1: Cosmic Architect */}
            {/* p-8 para marcos expandidos, text-sm para el título y text-base para el cuerpo */}
            <div className="p-8 rounded-xl bg-neutral-950/50 border border-neutral-900/60 hover:border-cyan-950 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">
                     📜 Cosmic Architect
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed tracking-wide">
                    The pure transmutation of the word. Through this quantum engine, you can **discover the hidden geometric pattern behind words**, revealing the mathematical signature and metaphysical element that governs your thoughts.
                </p>
            </div>

            {/* Esencia 2: Cosmic Symphony */}
            <div className="p-8 rounded-xl bg-neutral-950/50 border border-neutral-900/60 hover:border-cyan-950 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">
                    ⚛️ Cosmic Symphony
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed tracking-wide">
                    The ancient art of **cymatics** made code. Here you interact directly with elemental vibration, injecting acoustic frequencies to **give visual form to sound** in real time, tuning your brainwaves to states of focus, relaxation, or orbital sleep.
                </p>
            </div>

            {/* Esencia 3: Divine Flow */}
            <div className="p-8 rounded-xl bg-neutral-950/50 border border-neutral-900/60 hover:border-cyan-950 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                <h4 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">
                    ⭐ Divine Flow
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed tracking-wide">
                    Visualizing the cosmic order. Using the sacred structure of the star, this system allows you to map and **observe the different types of divine and universal flows**, translating quantum entanglement and the interconnectedness of everything into harmonic visual currents.
                </p>
            </div>

        </div>

        {/* Cierre Técnico Premium */}
        <div className="flex justify-center items-center gap-3 pt-8">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-cyan-950" />
            <span className="text-[10px] font-mono text-cyan-600 tracking-[0.4em] uppercase animate-pulse drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]">
                // CORE SYSTEM ACTIVE //
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-cyan-950" />
        </div>
        
    </div>
</div>
        </div>
      </div>
    
  );
}