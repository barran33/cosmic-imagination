'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  createUserWithEmailAndPassword, // <-- 1. IMPORTACIÓN AÑADIDA
  User as FirebaseUser,
} from 'firebase/auth';
// RUTA DE IMPORTACIÓN DE FIREBASE (Verificada)
import { auth } from '../../lib/firebase'; 

// === Tipos de Datos ===
interface User {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialLoading: boolean; 
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>; // <-- 2. AÑADIDA A LA INTERFAZ
}

// === Creación del Contexto ===
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// === Hook Personalizado ===
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Función auxiliar para mapear el objeto de usuario de Firebase a nuestro tipo interno
const mapFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
  };
};

// === Componente Proveedor de Autenticación (AuthProvider) ===

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicializado correctamente como NULL
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(false);
  // Estado de carga inicial (clave para que el formulario no aparezca antes de verificar la sesión)
  const [initialLoading, setInitialLoading] = useState(true); 

  // --- 1. Función de INICIO DE SESIÓN ---
  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
        let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = 'Credenciales incorrectas o usuario no encontrado.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El formato del email es inválido.';
        }
        console.error("Firebase Sign In Error:", error.code, error.message);
        throw new Error(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Función de CIERRE DE SESIÓN ---
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Firebase Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // --- 3. NUEVA FUNCIÓN DE REGISTRO (SIGN UP) ---
  const signUp = async (email: string, pass: string) => {
    setLoading(true);
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
        let errorMessage = 'Error al intentar registrar el usuario.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este email ya está en uso. Intenta iniciar sesión.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El formato del email es inválido.';
        }
        console.error("Firebase Sign Up Error:", error.code, error.message);
        throw new Error(errorMessage); 
    } finally {
        setLoading(false);
    }
  };

  // --- Listener Principal de Firebase ---
  useEffect(() => {
    // onAuthStateChanged es la ÚNICA fuente de verdad sobre el estado del usuario
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // 1. Siempre que cambia el estado de auth (login, logout, o inicio de app), esto se ejecuta
      setUser(mapFirebaseUser(firebaseUser));
      
      // 2. Solo la primera vez, marcamos que la verificación inicial ha terminado
      if (initialLoading) {
        setInitialLoading(false);
      }
    });

    // Limpia el listener
    return () => unsubscribe();
  }, []); 

  // --- Valor del Contexto ---
  const value = {
    user,
    loading,
    initialLoading,
    signIn,
    signOut,
    signUp, // <-- 4. EXPORTAMOS LA NUEVA FUNCIÓN
  };

  // 5. Renderizado: Muestra 'Cargando...' mientras Firebase verifica la sesión
  if (initialLoading) {
    return <div className="flex items-center justify-center h-screen text-lg font-medium text-neon-cyan/80 bg-[#0A0E13]">Conectando con la fuente cósmica...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};