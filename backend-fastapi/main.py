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

# --- Importaciones para el motor de arte ---
import numpy as np 
from PIL import Image 
from io import BytesIO 
import requests 
import tensorflow as tf
import tensorflow.keras.applications.inception_v3 as inception 
import base64
import re 
from tensorflow.keras.models import Model 
from tensorflow.python.framework.errors_impl import NotFoundError as TFNotFoundError

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

# -----------------------------------------------------
# 2. CONFIGURACIÓN DE CORS
# -----------------------------------------------------

origins = ["http://localhost:3000", "http://127.0.0.1:3000", "*"] 

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, 
    allow_methods=["*"], allow_headers=["*"],
)

# -----------------------------------------------------
# 2.5. CONSTANTES DE INFERENCIA EN LA NUBE
# -----------------------------------------------------

HUGGINGFACE_API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0"
HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_TOKEN") 

# -----------------------------------------------------
# 3. MODELOS DE DATOS (MANTENIDOS)
# -----------------------------------------------------

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
# 4. MOTOR MEJORADO: DIVINE FLOW (DENSIDAD ALTA)
# -----------------------------------------------------

class QuantumEngine:
    """Motor de partículas de alta densidad para efectos neuronales/Interestelares"""
    def __init__(self, count=200): # Aumentado para generar la 'red' de hilos
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
                
                # Atracción gravitacional masiva al hacer clic (Colapso)
                force = (4.5 if is_active else 0.3) / dist
                p["vx"] += (dx / dist) * force
                p["vy"] += (dy / dist) * force
                
                # Aplicar movimiento
                p["x"] += p["vx"]
                p["y"] += p["vy"]
                
                # Fricción líquida ambiental
                p["vx"] *= 0.94
                p["vy"] *= 0.94
                
                # Rebote en bordes (Mantiene las partículas en el canvas)
                if p["x"] < 0 or p["x"] > 100: p["vx"] *= -1
                if p["y"] < 0 or p["y"] > 100: p["vy"] *= -1

            await websocket.send_json({"particles": engine.particles})
            await asyncio.sleep(0.02) # Sincronización a 50Hz para suavidad total
    except WebSocketDisconnect:
        print("🌑 Conexión de Divine Flow cerrada.")

# -----------------------------------------------------
# 5. MOTOR DEEP DREAM (TENSORFLOW) - SIN CAMBIOS
# -----------------------------------------------------
BASE_INCEPTION_MODEL = None
try:
    if tf.__version__.startswith('2'):
        BASE_INCEPTION_MODEL = inception.InceptionV3(include_top=False, weights='imagenet')
except Exception:
    BASE_INCEPTION_MODEL = None

def deprocess(image):
    image = tf.clip_by_value(image, -1.0, 1.0)
    image = 255 * (image + 1.0) / 2.0
    return tf.cast(image, tf.uint8)

def calc_loss(image, model: Model):
    img_batch = tf.expand_dims(image, axis=0) 
    layer_activations = model(img_batch)
    if not isinstance(layer_activations, (list, tuple)):
        layer_activations = [layer_activations]
    losses = [tf.math.reduce_mean(act) for act in layer_activations]
    return tf.reduce_sum(losses) 

@tf.function
def deepdream_step(model, image, step_size):
    with tf.GradientTape() as tape:
        tape.watch(image)
        loss = calc_loss(image, model)
    gradients = tape.gradient(loss, image)
    gradients /= tf.math.reduce_std(gradients) + 1e-8
    image = image + gradients * step_size
    return loss, tf.expand_dims(image, axis=0)

# -----------------------------------------------------
# 6. ESTABLE DIFFUSION Y RUTAS HÍBRIDAS - SIN CAMBIOS
# -----------------------------------------------------

async def process_deepdream_core(req: DeepDreamRequest, initial_image_bytes: Optional[bytes] = None):
    if not BASE_INCEPTION_MODEL: raise HTTPException(status_code=503, detail="TF Motor Offline")
    try:
        layer_output = BASE_INCEPTION_MODEL.get_layer(req.neuralLayer).output
        DEEPDREAM_MODEL = tf.keras.Model(inputs=BASE_INCEPTION_MODEL.input, outputs=layer_output)
        
        if initial_image_bytes:
            img_data = BytesIO(initial_image_bytes)
        elif req.isProcessed:
            match = re.search(r'base64,(.*)', req.seedImageId)
            img_bytes = base64.b64decode(match.group(1) if match else req.seedImageId)
            img_data = BytesIO(img_bytes)
        else:
            response = requests.get(req.seedImageId, timeout=30)
            response.raise_for_status()
            img_data = BytesIO(response.content)

        seed_img = Image.open(img_data).convert("RGB").resize((req.width, req.height))
        tensor = inception.preprocess_input(tf.constant(np.array(seed_img), dtype=tf.float32))
        dream_img = tf.Variable(tf.expand_dims(tensor, axis=0)) 
        
        for _ in range(req.steps):
             _, dream_img = deepdream_step(DEEPDREAM_MODEL, dream_img[0], req.stepSize)
        
        final_rgb = deprocess(dream_img[0]).numpy().astype(np.uint8)
        img = Image.fromarray(final_rgb)
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        return Response(content=buffer.getvalue(), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/cosmic-dream/hybrid-synthesis")
async def hybrid_synthesis(req: HybridSynthesisRequest):
    # Lógica SD -> DeepDream
    token = HUGGINGFACE_API_TOKEN.strip().replace('"', '').replace("'", "")
    headers = {"Authorization": f"Bearer {token}"}
    payload = {"inputs": req.scene.prompt, "parameters": {"width": 1024, "height": 1024}}
    res = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload)
    if res.status_code != 200: raise HTTPException(status_code=500, detail="HF Error")
    
    scene_bytes = res.content
    base64_scene = base64.b64encode(scene_bytes).decode('utf-8')
    dream_req = DeepDreamRequest(
        width=req.dream.width, height=req.dream.height,
        seedImageId=f"data:image/png;base64,{base64_scene}",
        steps=req.dream.steps, stepSize=req.dream.stepSize,
        isProcessed=True, neuralLayer=req.dream.neuralLayer
    )
    return await process_deepdream_core(dream_req, scene_bytes)

@app.post("/api/v1/cosmic-dream/image") 
async def get_deepdream_image(req: DeepDreamRequest):
    return await process_deepdream_core(req)

# -----------------------------------------------------
# 7. MÓDULO STAR TRIP (MANTENIDO)
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

@app.get("/")
def read_root():
    return {"status": "Cosmic Imagination 5.1 Online"}

@app.get("/api/v1/ping-db")
def ping_db():
    if not db: return {"status": "error"}
    db.collection('users').limit(1).get() 
    return {"status": "success"}