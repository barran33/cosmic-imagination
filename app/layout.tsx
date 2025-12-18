// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// La ruta que ahora funciona con globals.css en la raíz
import "../globals.css"; 

// Importa los componentes de la interfaz
import { AuthProvider } from './components/AuthContext'
import Navbar from './components/Navbar'; 

const inter = Inter({ subsets: ["latin"] }); 

export const metadata: Metadata = {
  title: "Cosmic Imagination",
  description: "Consciousness-assisted AI, Data, and Wellness platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 🎯 CLASES CLAVE: Usamos las clases definidas en tailwind.config.js
        // La clase `h-full` ayuda a la altura de toda la página si `min-h-screen` falla.
        className={`bg-dark-space text-cyan-400 antialiased h-full ${inter.className}`} 
      >
        
        <AuthProvider>
          
          <Navbar />
          
          {/* pt-16 para espacio bajo el Navbar, min-h-screen asegura la altura mínima */}
          <main className="pt-16 min-h-screen"> 
              {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}