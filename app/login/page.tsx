import LoginForm from '@/app/components/LoginForm';
import React from 'react';


export default function LoginPage() {
  return (
    // Fondo oscuro con el estilo de tu sitio
    <div className="min-h-screen flex flex-col justify-center items-center p-4" style={{ backgroundColor: '#0A0E13' }}>
      {/* Espacio para el Navbar. 
        Esto empuja el contenido hacia abajo para que el formulario no quede oculto bajo la barra de navegación fija. 
      */}
      <div className="h-20 w-full" /> 
      
      {/* Contenedor principal que centra el formulario vertical y horizontalmente */}
      <main className="flex-grow flex items-center justify-center w-full">
        {/* Aquí se carga el formulario que utiliza el contexto de Firebase */}
        <LoginForm />
      </main>

      {/* Pie de página simple */}
      <footer className="py-4 text-center text-sm text-gray-600">
        © 2024 Cosmic Imagination. 
      </footer>
    </div>
  );
}