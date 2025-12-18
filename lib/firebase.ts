import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth"; 

const firebaseConfig = {
  // Las variables deben coincidir exactamente con el nombre en .env.local
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID, // Opcional
};

// 2. **INICIALIZACIÓN SEGURA**: 
// Se inicializa la aplicación solo si no existe ya (necesario en Next.js)
const app: FirebaseApp = !getApps().length 
  // Forzamos el tipo 'as any' para evitar errores de TypeScript con 'process.env'
  ? initializeApp(firebaseConfig as any) 
  : getApp();

// 3. Obtén el servicio de autenticación
const auth: Auth = getAuth(app);

// Exporta la aplicación y la autenticación
export { app, auth };