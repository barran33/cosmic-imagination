
'use client'; 

import { motion } from 'framer-motion';

import Link from 'next/link'; 

import { useAuth } from './AuthContext'; 
import React, { useState } from 'react'; 
import { User, LogOut, LogIn, Menu, X } from 'lucide-react';


const UserAuthControls = () => {
  const { user, signOut, loading } = useAuth();
  
  if (user) {
    // Si el usuario está logueado, mostramos su email y el botón de Cerrar Sesión
    return (
      <div className="flex items-center space-x-2">
        {/* Email del Usuario - Oculto en sm/md para ahorrar espacio, visible solo en lg */}
        <span className="text-l font-medium text-neon-glow-css text-cyan-300/80 hidden lg:block">
          {user.email || 'Usuario Cósmico'}
        </span>
        
        {/* Botón de Cerrar Sesión */}
        <button
          onClick={signOut}
          disabled={loading}
          className={`flex items-center gap-1 px-3 py-1 bg-red-600 text-white font-semibold rounded-full text-l transition-all duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
        >
          <LogOut className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    );
  }

  
  return (
    // USANDO LINK: Navegación rápida a la página de login
    <Link href="/login" passHref legacyBehavior> 
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-1 bg-transparent border border-cyan-300 text-neon-glow-css text-cyan-300 font-semibold rounded-full text-l transition-all duration-300 hover:bg-cyan-300 hover:text-black flex items-center gap-1 whitespace-nowrap"
      >
        <LogIn className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Login</span>
      </motion.div>
    </Link>
  );
};


const NavLinks = [
  { name: 'Cosmovisión', href: '/cosmovision' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Especialistas', href: '/especialistas' }, 
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const { user } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false); 

  // Función para manejar el fallback del logo si la imagen no carga
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Revertir a texto si la imagen falla
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.textContent = 'Co§mic Imagination';
      parent.className = "text-2xl font-black text-cyan-300 drop-shadow-neon-light transition-all duration-300 hover:text-white";
    }
  };

  return (
    // CLASES DE POSICIONAMIENTO FIJO: fixed top-0 z-50
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 text-neon-glow-css border-b border-cyan-300/20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Neón */}
          <div className="flex items-center flex-shrink-0">
            {/* USANDO LINK: Navegación rápida al inicio */}
            <Link 
              href="/" 
              className="flex items-center" // Las clases de estilo se aplican aquí
            >
              <img
                src="https://i.ibb.co/5xX2BghC/logo33.jpg" // Placeholder seguro
                alt="Co§mic Imagination Logo"
                className="h-12 w-auto shadow-neon-light drop-shadow-lg transition-all duration-300 hover:opacity-80"
                onError={handleLogoError}
              />
            </Link>
          </div>

          {/* Enlaces de Navegación (Solo escritorio) */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8"> 
            {NavLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, color: '#00FFFF' }}
                className="text-gray-300 transition-colors duration-200 hover:text-cyan-300 text-l font-medium whitespace-nowrap"
              >
                {/* USANDO LINK */}
                <Link href={link.href}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* --- ZONA DERECHA: Control de Autenticación y CTA Principal (Desktop) --- */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4"> 
            
            {/* 1. Componente de Control de Login/Logout (ya usa Link) */}
            <UserAuthControls />

            {/* 2. BOTÓN CTA PRINCIPAL */}
            {/* USANDO LINK */}
            <Link 
              href={user ? '/premium-diagnostic' : '/cosmic-diagnostic'} 
              passHref 
              legacyBehavior
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px #00FFFF, 0 0 40px #00FFFF' }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-cyan-300 text-black font-semibold rounded-full text-xs lg:text-sm shadow-neon-light transition-all duration-300 whitespace-nowrap"
              >
                {user ? 'Premium Diagnostic' : 'Cosmic Portal'}
              </motion.div>
            </Link>
          </div>

          {/* Botón de Menú (Hamburguesa) para móvil y botones de acción rápida */}
          <div className="flex items-center md:hidden space-x-3">
             {/* Botón de Autenticación Móvil (ya usa Link) */}
            <UserAuthControls />

            {/* Botón Hamburguesa */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-300 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-300"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="h-6 w-6 text-cyan-300" />
              ) : (
                <Menu className="h-6 w-6 text-cyan-300" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable (Mobile) */}
      {isOpen && (
        <div className="md:hidden border-t border-cyan-300/20 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {NavLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-cyan-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300 bg-gray-800/50"
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer click
              >
                {link.name}
              </Link>
            ))}
            
           
             <Link 
                href={user ? '/premium-diagnostic' : '/cosmic-diagnostic'} 
                passHref 
                legacyBehavior
             >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="mt-4 block w-full text-center px-3 py-2 bg-cyan-300 text-black font-bold rounded-md text-base shadow-neon-light transition-all duration-300 hover:bg-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {user ? 'Premium Diagnostic' : 'Diagnóstico Cósmico'}
              </motion.div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}