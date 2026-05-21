from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse 
from pydantic import BaseModel
from typing import List, Literal, Optional 
import firebase_admin
from firebase_admin import credentials, firestore
import os 
from dotenv import load_dotenv 
import time
import random
import math
import asyncio
import json
# --- Importaciones para el motor de arte (Optimizadas) ---
import numpy as np 
from PIL import Image 
from io import BytesIO 
import requests 
import base64
import re 

# --- IMPORTACIONES DE TENSORFLOW (Eliminar o comentar todas estas) ---
# import tensorflow as tf                                           ### COMENTAR ESTO
# import tensorflow.keras.applications.inception_v3 as inception    ### COMENTAR ESTO
# from tensorflow.keras.models import Model                         ### COMENTAR ESTO
# from tensorflow.python.framework.errors_impl import NotFoundError as TFNotFoundError ### COMENTAR ESTO

# --- Importaciones añadidas para el puente SMTP de Zoho ---
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# -----------------------------------------------------
# 1. SETUP INICIAL
# -----------------------------------------------------

load_dotenv() 
app = FastAPI(title="Cosmic Imagination API - Divine Flow Interstellar", version="5.1.0")

# Inicialización de Firebase
try:
    SERVICE_ACCOUNT_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH")
    db = None 
    if SERVICE_ACCOUNT_PATH and os.path.exists(SERVICE_ACCOUNT_PATH):
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("✅ Conexión a Firebase (Firestore) exitosa.")
    else:
        print("❌ Firebase no inicializado.")
except Exception as e:
    print(f"❌ Error CRÍTICO Firebase: {e}")
    db = None


# --- INICIALIZACIÓN SEGURA DE FIREBASE ---
def inicializar_firebase():
    try:
        # Intentamos obtener las variables de entorno
        # Si estás en Render, estas deben estar definidas en la pestaña 'Environment'
        project_id = os.getenv("FIREBASE_PROJECT_ID")
        
        if project_id:
            # Opción A: Configuración desde variables individuales
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": project_id,
                "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
                "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
                "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
                "client_id": os.getenv("FIREBASE_CLIENT_ID"),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
            })
            firebase_admin.initialize_app(cred)
            print("✅ Firebase inicializado desde variables de entorno.")
        else:
            # Opción B: Fallback (solo si el archivo existiera, pero no es tu caso)
            print("⚠️ No se encontraron variables de entorno para Firebase.")
            
    except Exception as e:
        print(f"❌ Error al inicializar Firebase: {e}")

inicializar_firebase()
db = firestore.client()


# -----------------------------------------------------
# 2. CONFIGURACIÓN DE CORS
# -----------------------------------------------------

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://cosmic-imagination.vercel.app",
    "https://cosmic-imagination.com",
    "https://www.cosmic-imagination.com",
    "https://cosmic-imagination-4fju0gyy5-cosmic369.vercel.app" # <--- Agrega el subdominio de preview exacto si estás probando desde ahí
]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, 
    allow_methods=["*"], allow_headers=["*"],
)

# -----------------------------------------------------
# 2.5. CONSTANTES DE INFERENCIA EN LA NUBE
# -----------------------------------------------------



# -----------------------------------------------------
# 3. MODELOS DE DATOS (ACTUALIZADOS PARA COSMIC ARCHITECT)
# -----------------------------------------------------

class TransmutationRequest(BaseModel):
    text: str

# Nuevo Modelo de Datos para el Formulario de Contacto Cósmico
class ContactMessageInput(BaseModel):
    name: str
    email: str
    phone: Optional[str] = "No registrado"
    subject: str
    message: str

# Nuevos Modelos de Datos para el Oráculo de Divine Flow
class HologramResponse(BaseModel):
    text: str
    physics_mode: str
    duration: int

class MysteryResponse(BaseModel):
    title: str
    content: str

# --- Conservados para compatibilidad con módulos dependientes si aplica ---
class DeepDreamRequest(BaseModel):
    width: int
    height: int
    seedImageId: str 
    steps: int = 10 
    stepSize: float = 0.007
    isProcessed: bool = False
    neuralLayer: str = "mixed5" 

class SceneGenerationRequest(BaseModel):
    prompt: str 
    negative_prompt: str = ""

class HybridSynthesisRequest(BaseModel):
    scene: SceneGenerationRequest
    dream: DeepDreamRequest

class StarTripDataInput(BaseModel): 
    user_id: str                   
    session_id: str                
    raw_frequency_points: List[float] 
    algorithm_version: str = "STV1" 
    max_duration_minutes: int = 5 
    mode: Literal["Focus", "Relax", "Sleep"] = "Focus" 

class CosmicSymphonyOutput(BaseModel):
    pitch: List[int] 
    duration_ms: List[int] 
    tempo_bpm: int 
    instrument: str 

class StarTripOutput(BaseModel):
    user_id: str
    session_id: str
    processed_points: int
    duration_s: float
    result_score: float
    message: str
    symphony_data: CosmicSymphonyOutput

# -----------------------------------------------------
# 4. MOTOR MEJORADO: DIVINE FLOW (DENSIDAD ALTA - SIN CAMBIOS)
# -----------------------------------------------------

class QuantumEngine:
    """Motor de partículas de alta densidad para efectos neuronales/Interestelares"""
    def __init__(self, count=200): 
        self.particles = [
            {
                "id": i,
                "x": random.uniform(0, 100),
                "y": random.uniform(0, 100),
                "vx": random.uniform(-0.15, 0.15),
                "vy": random.uniform(-0.15, 0.15),
                "energy": random.uniform(0.6, 2.2)
            } for i in range(count)
        ]

engine = QuantumEngine()

@app.websocket("/ws/divine-flow")
async def websocket_divine_flow(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            obs_x = data.get("x", 50)
            obs_y = data.get("y", 50)
            is_active = data.get("active", False)

            for p in engine.particles:
                dx = obs_x - p["x"]
                dy = obs_y - p["y"]
                dist = math.sqrt(dx**2 + dy**2) + 0.1
                
                force = (4.5 if is_active else 0.3) / dist
                p["vx"] += (dx / dist) * force
                p["vy"] += (dy / dist) * force
                
                p["x"] += p["vx"]
                p["y"] += p["vy"]
                
                p["vx"] *= 0.94
                p["vy"] *= 0.94
                
                if p["x"] < 0 or p["x"] > 100: p["vx"] *= -1
                if p["y"] < 0 or p["y"] > 100: p["vy"] *= -1

            await websocket.send_json({"particles": engine.particles})
            await asyncio.sleep(0.02)
    except WebSocketDisconnect:
        print("🌑 Conexión de Divine Flow cerrada.")


# -----------------------------------------------------
# 6. LÓGICA DE GEOMETRÍA CUÁNTICA ARMÓNICA (COSMIC ARCHITECT)
# -----------------------------------------------------

VIBRATIONAL_DICT = {
    "miedo": {"freq": 174, "polaridad": -1, "elemento": "tierra"},
    "Magia": {"freq": 369, "polaridad": -1, "elemento": "eter"},
    "caos": {"freq": 396, "polaridad": -1, "elemento": "fuego"},
    "bloqueo": {"freq": 417, "polaridad": -1, "elemento": "agua"},
    "amor": {"freq": 528, "polaridad": 1, "elemento": "éter"},
    "abundancia": {"freq": 639, "polaridad": 1, "elemento": "aire"},
    "creacion": {"freq": 741, "polaridad": 1, "elemento": "fuego"},
    "conciencia": {"freq": 852, "polaridad": 1, "elemento": "éter"},
    "iluminacion": {"freq": 963, "polaridad": 1, "elemento": "éter"},
}

def generate_sacred_geometry(frequency: float, nodes_count: int) -> list:
    points = []
    center_x, center_y = 150, 150
    phi = (1 + math.sqrt(5)) / 2  # Proporción Áurea para escalado armónico
    
    # Dividimos los nodos en 2 órbitas concéntricas perfectas (Efecto Merkaba / Matriz Sagrada)
    layers = [0.55, 1.0] # Órbita interna y órbita externa
    nodes_per_layer = max(nodes_count // 2, 4)
    
    base_radius = 65 + (frequency % 35) # Radio balanceado para que no toque los bordes
    
    for layer_idx, scale in enumerate(layers):
        current_radius = base_radius * scale
        angular_offset = (layer_idx * math.pi / nodes_per_layer) * phi if layer_idx > 0 else 0
        
        for i in range(nodes_per_layer):
            angle = (i * 2 * math.pi / nodes_per_layer) + angular_offset
            r = current_radius * (1 + 0.06 * math.sin(i * phi + (frequency * 0.02)))
            
            x = center_x + r * math.cos(angle)
            y = center_y + r * math.sin(angle)
            points.append({"x": round(x, 2), "y": round(y, 2)})
            
    return points

# --- NUEVOS ALGORITMOS MULTI-GEOMÉTRICOS INTEGRADOS SIN ALTERACIÓN DE FIRMA ---
def generate_advanced_cosmic_geometry(geometry_type: str, frequency: float, nodes_count: int) -> list:
    points = []
    center_x, center_y = 150, 150
    phi = (1 + math.sqrt(5)) / 2
    base_radius = 75 + (frequency % 30)

    if geometry_type == "fractal_starburst":
        for i in range(nodes_count):
            angle = (i * 2 * math.pi / nodes_count)
            # Oscilación armónica pura para pétalos estelares entrelazados de alta definición
            r = base_radius * (1.2 if i % 2 == 0 else 0.45) * (1 + 0.12 * math.sin(i * phi + frequency))
            x = center_x + r * math.cos(angle)
            y = center_y + r * math.sin(angle)
            points.append({"x": round(x, 2), "y": round(y, 2)})

    elif geometry_type == "rose_of_grandi":
        # Ecuación de Rosa Espectral Sagrada: R = cos(k * theta) + armónicos polares distribuidos
        k = max(3, int((frequency % 5) + 3))
        for i in range(nodes_count):
            angle = (i * 2 * math.pi / nodes_count)
            r = base_radius * (math.cos(k * angle) * 0.85 + 0.45)
            x = center_x + r * math.cos(angle)
            y = center_y + r * math.sin(angle)
            points.append({"x": round(x, 2), "y": round(y, 2)})

    elif geometry_type == "fermat_spiral":
        # Remapeo de espirales polares de difracción multifacetada
        for i in range(nodes_count):
            theta = i * (2 * math.pi / nodes_count) * phi
            r = math.sqrt(i + 1) * (base_radius / math.sqrt(nodes_count)) * 1.3
            # Inyección de modulación armónica simétrica para evitar formas rocosas
            r = r * (1 + 0.15 * math.sin(i * 2.0 + frequency))
            x = center_x + r * math.cos(theta)
            y = center_y + r * math.sin(theta)
            points.append({"x": round(x, 2), "y": round(y, 2)})

    elif geometry_type == "chaotic_glitch":
        # Geometría de torsión fractal hipercompleja basada en interferencia cuántica
        for i in range(nodes_count):
            angle = (i * 2 * math.pi / nodes_count) + (math.cos(frequency + i) * 0.25)
            r = base_radius * (0.55 + 0.65 * math.cos(i * phi + (frequency * 0.05)))
            x = center_x + r * math.cos(angle)
            y = center_y + r * math.sin(angle)
            points.append({"x": round(x, 2), "y": round(y, 2)})

    elif geometry_type == "merkaba_matrix":
        # Solución al Bug de Caída: Ejecución de matriz estelar de doble órbita densa con entrelazado áureo
        layers = [0.45, 0.75, 1.1]  # Triple anillo de difracción cuántica para el patrón por defecto
        nodes_per_layer = max(nodes_count // len(layers), 4)
        for l_idx, scale in enumerate(layers):
            current_radius = base_radius * scale
            offset = (l_idx * math.pi / nodes_per_layer) * phi
            for i in range(nodes_per_layer):
                angle = (i * 2 * math.pi / nodes_per_layer) + offset
                r = current_radius * (1 + 0.08 * math.cos(i * phi + frequency))
                x = center_x + r * math.cos(angle)
                y = center_y + r * math.sin(angle)
                points.append({"x": round(x, 2), "y": round(y, 2)})
    else:
        return generate_sacred_geometry(frequency, nodes_count)

    return points

# Auxiliar para construir colores infinitos pseudo-aleatorios basados en hashes
def get_infinite_color_profile(text: str, vibe: str):
    text_hash = sum(ord(c) * (idx + 1) for idx, c in enumerate(text))
    
    if vibe == "DARK_EMOTION":
        # Paleta roja/carmesí/oscura infinita
        hue = (text_hash % 20) + (340 if text_hash % 2 == 0 else 0) 
        sat = 90 + (text_hash % 11)
        light = 40 + (text_hash % 15)
    elif vibe == "FUN_EMOTION":
        # Paleta JoyBoy: Colores ultra enérgicos, neones, eléctricos fosforescentes
        hue = (text_hash % 60) + 180 if text_hash % 2 == 0 else (text_hash % 40) + 40 # Cianos eléctricos o Amarillos/Naranjas pop
        sat = 95 + (text_hash % 6)
        light = 50 + (text_hash % 10)
    elif vibe == "CHAOTIC_VOID":
        # Púrpuras profundos, magentas cuánticos y negros
        hue = (text_hash % 50) + 270
        sat = 85 + (text_hash % 15)
        light = 45 + (text_hash % 10)
    elif vibe == "HARMONIC_LIGHT":
        # Blancos divinos, dorados sutiles y destellos celestiales
        hue = (text_hash % 30) + 45
        sat = 80 + (text_hash % 21)
        light = 75 + (text_hash % 15)
    else:
        # SACRED_GEOMETRY / Estándar: Espectro cian/azul cuántico infinito
        hue = (text_hash % 50) + 160
        sat = 90 + (text_hash % 11)
        light = 50 + (text_hash % 10)

    # Conversión sutil de HSL a Hexadecimal para no romper compatibilidad nativa de tipos
    h = hue / 360.0
    s = sat / 100.0
    l = light / 100.0
    
    def hsl_to_hex(h, s, l):
        def q(p, q, t):
            if t < 0: t += 1
            if t > 1: t -= 1
            if t < 1/6: return p + (q - p) * 6 * t
            if t < 1/2: return q
            if t < 2/3: return p + (q - p) * (2/3 - t) * 6
            return p
        _q = l * (1 + s) if l < 0.5 else l + s - l * s
        _p = 2 * l - _q
        r = max(0, min(255, int(q(_p, _q, h + 1/3) * 255)))
        g = max(0, min(255, int(q(_p, _q, h) * 255)))
        b = max(0, min(255, int(q(_p, _q, h - 1/3) * 255)))
        return f"#{r:02x}{g:02x}{b:02x}"

    primary_hex = hsl_to_hex(h, s, l)
    secondary_hex = hsl_to_hex((h + 0.15) % 1.0, s, max(0.3, l - 0.1))
    
    return primary_hex, secondary_hex

@app.post("/api/v1/cosmic-architect/transmute")
async def transmute_energy(payload: TransmutationRequest):
    text_lower = payload.text.lower()
    final_frequency = 432.0 
    detected_elements = []
    nodes = 12  # Elevada la base inicial para dar mayor densidad y entrelazado como el de ayer
    matched_words = 0
    
    # Conservación estricta de la lógica analítica original para no dañar retrocompatibilidad
    for word, data in VIBRATIONAL_DICT.items():
        if word in text_lower:
            matched_words += 1
            if data["polaridad"] == -1:
                final_frequency += (data["freq"] * 0.5)
                nodes += 4
            else:
                final_frequency += data["freq"]
                nodes += 6
            if data["elemento"] not in detected_elements:
                detected_elements.append(data["elemento"])
                
    if matched_words == 0:
        text_hash = sum(ord(char) for char in text_lower)
        final_frequency = 432 + (text_hash % 531)
        nodes = 12 + (text_hash % 12)

    nodes = min(max(nodes, 12), 36) # Rango de nodos optimizado para mandalas densos
    if nodes % 2 != 0:
        nodes += 1
        
    final_frequency = round(final_frequency, 1)

    # --- INYECCIÓN DEL MOTOR SEMÁNTICO JOYBOY VIBE ---
    # Diccionario expandido de intenciones emocionales
    dark_keywords = ["dolor", "ira", "miedo", "muerte", "tristeza", "odio", "caos", "sufrimiento", "oscuridad", "bloqueo", "pain"]
    fun_keywords = ["joyboy", "musica", "baile", "risa", "fiesta", "alegria", "ritmo", "flow", "rap", "fuego", "magia"]
    light_keywords = ["amor", "paz", "luz", "iluminacion", "conciencia", "abundancia", "divino", "esencia", "creacion", "dios"]
    void_keywords = ["vacio", "nada", "abismo", "quantum", "singularidad", "entropia"]

    if any(dk in text_lower for dk in dark_keywords):
        vibe_category = "DARK_EMOTION"
        geometry_type = "fractal_starburst" if final_frequency % 2 == 0 else "chaotic_glitch"
        alchemy_status = "⚔️ Calcinación Extrema: Desintegrando densidades y mutando el dolor profundo"
    elif any(fk in text_lower for fk in fun_keywords):
        vibe_category = "FUN_EMOTION"
        geometry_type = "rose_of_grandi" if final_frequency % 2 == 0 else "fractal_starburst"
        alchemy_status = "⚡ Ritmo JoyBoy Sónico: Frecuencias dinámicas elevando el pulso creativo"
    elif any(lk in text_lower for lk in light_keywords):
        vibe_category = "HARMONIC_LIGHT"
        geometry_type = "fermat_spiral"
        alchemy_status = "✨ Crisopeya Pura: Transmutación completa hacia el espectro áureo"
    elif any(vk in text_lower for vk in void_keywords):
        vibe_category = "CHAOTIC_VOID"
        geometry_type = "chaotic_glitch"
        alchemy_status = "🕳️ Inversión de Espacio-Tiempo: Reconfigurando la matriz en el vacío absoluto"
    else:
        vibe_category = "SACRED_GEOMETRY"
        geometry_type = "merkaba_matrix"
        alchemy_status = "💠 Geometría Matricial Estándar: Alineando estructuras vectoriales estables"

    # Generación dinámica avanzada e infinitas combinaciones de color
    geometry_points = generate_advanced_cosmic_geometry(geometry_type, final_frequency, nodes)
    glow_color, secondary_color = get_infinite_color_profile(payload.text, vibe_category)

    # Mantener los retornos estructurales exactamente idénticos para no romper el tipado del page.tsx original
    return {
        "original_text": payload.text,
        "frequency_hz": final_frequency,
        "geometry_nodes": geometry_points,
        "glow_color": glow_color,
        "secondary_color": secondary_color,
        "elements": detected_elements if detected_elements else ["éter"],
        "alchemy_status": f"[{vibe_category}] {alchemy_status}"
    }

# -----------------------------------------------------
# 7. MÓDULO STAR TRIP (MANTENIDO SIN CAMBIOS)
# -----------------------------------------------------

@app.post("/api/v1/star-trip/analyze-data", response_model=StarTripOutput)
async def analyze_star_trip_data(input_data: StarTripDataInput):
    user_id = input_data.user_id
    mode = input_data.mode
    start_time = time.time()
    star_trip_score = round(random.uniform(93.0, 99.5), 2)
    symphony_data = {
        "pitch": [random.randint(60, 90) for _ in range(80)],
        "duration_ms": [200 for _ in range(80)],
        "tempo_bpm": 120 if mode == "Focus" else 85,
        "instrument": f"Cosmic Synth - {mode}"
    }
    if db:
        db.collection('star_trip_results').document(user_id).collection('sessions').document(input_data.session_id).set({
            "timestamp": int(time.time()), "score": star_trip_score, "mode": mode
        })
    return {
        "user_id": user_id, "session_id": input_data.session_id,
        "processed_points": len(input_data.raw_frequency_points),
        "duration_s": round(time.time() - start_time, 3),
        "result_score": star_trip_score, "message": "Success",
        "symphony_data": symphony_data
    }

# -----------------------------------------------------
# 8. PUENTE SMTP NATIVO PARA ZOHO MAIL (AMORTIGUADO - SIN CAMBIOS)
# -----------------------------------------------------

@app.post("/api/v1/contact")
async def submit_contact_form(payload: ContactMessageInput):
    zoho_user = os.getenv("ZOHO_USER")
    zoho_password = os.getenv("ZOHO_PASSWORD")
    
    if not zoho_user or not zoho_password:
        raise HTTPException(
            status_code=500, 
            detail="Error crítico de infraestructura: Credenciales SMTP no detectadas."
        )
        
    try:
        msg = MIMEMultipart()
        msg['From'] = f'"Cosmic Portal" <{zoho_user}>'
        msg['To'] = zoho_user
        msg['Subject'] = f"⚡ NUEVA MISIÓN: {payload.subject}"
        
        msg.add_header('reply-to', payload.email)
        
        html_body = f"""
        <div style="background-color: #030303; color: #ffffff; padding: 40px; font-family: monospace; border: 2px solid #00FFFF; border-radius: 16px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00FFFF; margin-bottom: 25px; font-size: 20px; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(0,255,255,0.2); padding-bottom: 10px;">
            // BRIEF DE MISIÓN ENTRANTE //
          </h2>
          <div style="margin-bottom: 15px; font-size: 14px;">
            <p><span style="color: #555;">[REMITENTE]:</span> <strong style="color: #fff;">{payload.name}</strong></p>
            <p><span style="color: #555;">[CANAL_EMAIL]:</span> <a href="mailto:{payload.email}" style="color: #00FFFF; text-decoration: none;">{payload.email}</a></p>
            <p><span style="color: #555;">[TELEMETRÍA_TEL]:</span> <span style="color: #fff;">{payload.phone}</span></p>
          </div>
          <div style="background-color: #0c0c0c; border: 1px dashed #9333ea; padding: 20px; border-radius: 8px; margin-top: 25px;">
            <p style="color: #9333ea; margin-top: 0; font-weight: bold; font-size: 12px;">// TRANSMISIÓN DE DATOS //</p>
            <p style="color: #e5e5e5; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">{payload.message}</p>
          </div>
          <p style="font-size: 9px; color: #444; margin-top: 40px; text-align: center; letter-spacing: 1px;">
            STATUS: SECURE_SMTP_TRANSMISSION // CORE_SYSTEM_ACTIVE
          </p>
        </div>
        """
        
        msg.attach(MIMEText(html_body, 'html'))
        
        def send_email_sync():
            with smtplib.SMTP_SSL('smtp.zoho.com', 465) as server:
                server.login(zoho_user, zoho_password)
                server.sendmail(zoho_user, zoho_user, msg.as_string())
        
        await asyncio.to_thread(send_email_sync)
        return {"success": True, "message": "Transmisión enviada correctamente."}
        
    except Exception as e:
        print(f"Error crítico en el túnel SMTP de Zoho: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Interferencia en el puente SMTP del servidor."
        )

# -----------------------------------------------------
# 8.5. SISTEMA DEL ORÁCULO INTERACTIVO DE DIVINE FLOW (SIN CAMBIOS)
# -----------------------------------------------------

COSMIC_HOLOGRAMS = [
    {"text": "[ EXPANSION ]: El tejido del espacio se expande de forma acelerada.", "physics_mode": "EXPANSION_FORCE", "duration": 200},
    {"text": "[ ENTANGLEMENT ]: Two minds entangled breach lightspeed limits concurrently.", "physics_mode": "QUANTUM_MIRROR", "duration": 250},
    {"text": "[ BLACK_HOLE ]: Infinite density devours radiation, bending space matrices.", "physics_mode": "GRAVITATIONAL_COLLAPSE", "duration": 180},
    {"text": "[ ENTROPICO ]: Order is a momentary delusion of macroscopic observation.", "physics_mode": "CHAOS_DRIFT", "duration": 220}
]

COSMIC_MYSTERIES = [
    {
        "title": "Quantum Tunneling Effect",
        "content": "Particles breach insurmountable energetic walls via probabilistic fields. If your architectures hit an absolute barrier, remember spatial restrictions are mathematically soft core-side."
    },
    {
        "title": "The Uncertainty Principle",
        "content": "Position and momentum cannot resolve simultaneously with absolute precision. Embracing structural variance yields organic aesthetic dominion."
    },
    {
        "title": "Sacred Flower Geometry",
        "content": "All structural cosmic data aggregates into repeating vector grids. Apparent chaos is merely high-order processing waiting for focal synchronization."
    }
]

@app.get("/api/v1/cosmic-hologram", response_model=HologramResponse)
async def get_cosmic_hologram():
    return random.choice(COSMIC_HOLOGRAMS)

@app.get("/api/v1/cosmic-mystery", response_model=MysteryResponse)
async def get_cosmic_mystery():
    return random.choice(COSMIC_MYSTERIES)

# -----------------------------------------------------
# 9. ENDPOINTS DE CONTROL INTERNO
# -----------------------------------------------------

@app.api_route("/", methods=["GET", "HEAD"])
def read_root():
    return {"status": "Cosmic Imagination 5.1 Online"}

@app.get("/api/v1/ping-db")
def ping_db():
    if not db: return {"status": "error"}
    db.collection('users').limit(1).get() 
    return {"status": "success"}

# -----------------------------------------------------
# 10. INICIALIZACIÓN DINÁMICA DEL PUERTO (ÚNICO CAMBIO REALIZADO)
# -----------------------------------------------------
import uvicorn

if __name__ == "__main__":
    # 1. Busca el puerto asignado por la nube (producción)
    # 2. Si no existe, busca FASTAPI_PORT en tu archivo .env (desarrollo local)
    # 3. Si tampoco existe, usa el puerto 8000 por defecto
    puerto = int(os.environ.get("PORT", os.environ.get("FASTAPI_PORT", 8000)))
    
    # Arranca el servidor de manera segura con el puerto dinámico y host global
    uvicorn.run("main:app", host="0.0.0.0", port=puerto, reload=False)