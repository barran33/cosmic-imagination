'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from './AuthContext'; // Importa desde el mismo directorio de componentes



const LoginForm = () => {
  // Obtenemos las funciones y estados del contexto de autenticación
  const { signIn, signUp, loading, user, initialLoading } = useAuth();
  
  // Estado para alternar entre 'login' y 'register'
  const [isLogin, setIsLogin] = useState(true);

  // Estado local para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  // Si aún se está cargando la sesión inicial, mostramos un indicador
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-neon-cyan animate-pulse">
        Verificando estado de la aplicación...
      </div>
    );
  }

  // Si el usuario ya está autenticado, mostramos un mensaje de bienvenida
  if (user) {
    return (
      <div className="max-w-md mx-auto p-8 border border-green-500 rounded-lg shadow-2xl bg-dark-space/70 text-white text-center">
        <h2 className="text-xl font-bold mb-4 text-neon-cyan">¡Bienvenido de vuelta!</h2>
        <p className="mb-6">Has iniciado sesión como: <strong className="text-white drop-shadow-neon-light">{user.email}</strong></p>
      </div>
    );
  }

  // Manejador del envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Por favor, ingresa tu email y contraseña.');
      return;
    }

    try {
      if (isLogin) {
        // Modo INICIAR SESIÓN
        await signIn(email, password);
        setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
      } else {
        // Modo REGISTRARSE
        await signUp(email, password);
        setSuccess('¡Registro exitoso! Has iniciado sesión automáticamente.');
      }
      
    } catch (err: any) {
      // Usa el error propagado desde el AuthContext 
      setError(err.message || 'Error desconocido. Intenta de nuevo.');
    }
  };

  // Título dinámico
  const title = isLogin ? 'Acceso Cósmico (Iniciar Sesión)' : 'Creación de Cuenta (Registro)';

  // Renderizado del formulario
  return (
    <div className="w-full max-w-md p-8 border-2 border-neon-cyan/70 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.6)] bg-gray-900/95 transition-all duration-500">
        
        <h2 className="text-2xl font-extrabold mb-8 text-neon-glow-css text-center text-neon-cyan drop-shadow-lg shadow-neon-light whitespace-nowrap">
        {title}
        </h2>
            
      
      <form onSubmit={handleSubmit}>
        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-cosmic-gray text-neon-glow-css text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@cosmic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6">
          <label className="block text-cosmic-gray text-neon-glow-css text-sm font-semibold mb-2" htmlFor="password">
            Contraseña (mínimo 6 caracteres)
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña Secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition"
          />
        </div>
        
        {/* Mensajes de Estado */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-900/30 p-2 rounded-lg border border-red-500/50">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 bg-green-900/30 p-2 rounded-lg border border-green-500/50">{success}</p>
        )}

        {/* Botón de Envío (DETERMINADO POR isLogin) */}
        <div className="w-full mt-6 text-sm font-medium text-neon-glow-css  transition duration-200">
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 px-4 text-neon-glow-css rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ${
              loading 
                ? 'bg-blue-800/50 text-cyan-400 shadow-neon-light text-neon-glow-css cursor-not-allowed' 
                : 'bg-neon-cyan text-neon-glow-css text-dark-space hover:bg-cyan-400 shadow-neon-light'
            }`}
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrar Cuenta')}
          </button>
        </div>

            <button
            type="button"
            onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccess(null);
                setEmail('');
                setPassword('');
            }}
            // CLASE MODIFICADA: Usa un color diferente para cada modo
            className={`w-full mt-6 text-sm font-medium transition duration-200 hover:underline ${
                isLogin ? 'text-cyan-600 text-neon-glow-css3 hover:text-gray-400' : 'text-cyan-600 text-neon-glow-css3 hover:text-gray-400'
            }`}
            >
            {isLogin 
                ? '¿Eres nuevo? | ¡Regístrate aquí!' 
                : '¿Ya navegaste por estos cielos? | ¡Inicia sesión!'
            }
            </button>
      </form>
    </div>
  );
};

export default LoginForm;