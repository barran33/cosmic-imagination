from fastapi import FastAPI, HTTPException
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
app = FastAPI(title="Sinfonia Cosmica API - Deep Dream Focus", version="4.0.0 - Hybrid Synthesis Ready")

# Inicialización de Firebase (Mantenemos por StarTrip)
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
        print("❌ Firebase no inicializado. La ruta de las credenciales no es válida o está vacía.")
except Exception as e:
    print(f"❌ Error CRÍTICO al inicializar Firebase: {e}")
    db = None

# -----------------------------------------------------
# 2. CONFIGURACIÓN DE CORS (MANTENER IGUAL)
# -----------------------------------------------------

origins = ["http://localhost:3000", "http://127.0.0.1:3000", "*"] 

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, 
    allow_methods=["*"], allow_headers=["*"],
)

# -----------------------------------------------------
# 2.5. CONSTANTES DE INFERENCIA EN LA NUBE (NUEVO)
# -----------------------------------------------------


HUGGINGFACE_API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0"

HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_TOKEN") 

if HUGGINGFACE_API_TOKEN:
    print("✅ TOKEN DE HUGGING FACE CARGADO EXITOSAMENTE por os.getenv.")
else:
    print("❌ ERROR CRÍTICO DE ENTORNO: HUGGING FACE TOKEN NO FUE LEÍDO DE .env.local.")

# -----------------------------------------------------
# 3. MODELOS DE DATOS Y ARTE (DEEP DREAM)
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


# MODELOS DE STAR TRIP (EXISTENTES)
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
# 4. MODELO DE ARTE NEURONAL (DEEP DREAM) - INICIALIZACIÓN GLOBAL
# -----------------------------------------------------
BASE_INCEPTION_MODEL = None
try:
    if tf.__version__.startswith('2'):
        BASE_INCEPTION_MODEL = inception.InceptionV3(include_top=False, weights='imagenet')
        print("✅ Modelo Base InceptionV3 cargado exitosamente.")
        
        # 💡 Lista de capas válidas para Deep Dream (para el frontend)
        VALID_LAYERS = ["mixed3", "mixed4", "mixed5", "mixed6", "mixed7", "mixed8", "mixed9", "mixed10"]
        print(f"Capas válidas sugeridas: {VALID_LAYERS}")
        
    else:
        print("❌ Versión de TensorFlow no compatible. Deep Dream estará deshabilitado.")
except Exception as e:
    print(f"❌ Error CRÍTICO al cargar modelo Base InceptionV3 (TensorFlow): {e}")
    BASE_INCEPTION_MODEL = None


# 5. FUNCIONES CORE DE DEEP DREAM (EXISTENTES)

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


# 6. FUNCIÓN DE INFERENCIA EN LA NUBE (Stable Diffusion) (NUEVO)
def generate_scene_from_prompt(prompt: str, negative_prompt: str) -> bytes:
    if not HUGGINGFACE_API_TOKEN:
        raise HTTPException(status_code=500, detail="Token no configurado.")
    
 
    token = HUGGINGFACE_API_TOKEN.strip().replace('"', '').replace("'", "")
    headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    }
    
   
    payload = {
        "inputs": prompt,
        "parameters": {
            "negative_prompt": negative_prompt,
            "width": 1024, 
            "height": 1024
        },
        "options": {"wait_for_model": True}
    }
    
    max_retries = 3
    for attempt in range(max_retries):
        print(f"📡 Router HF - Intento {attempt + 1}...")
        try:
            response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload, timeout=120)
            
            if response.status_code == 200:
                print("✅ ¡ÉXITO! Imagen recibida desde el Router.")
                return response.content
            
            if response.status_code == 503:
                print("⏳ Modelo despertando, esperando 15s...")
                time.sleep(15)
                continue

            print(f"❌ Error {response.status_code}: {response.text}")
            response.raise_for_status()

        except Exception as e:
            if attempt == max_retries - 1:
                print(f"❌ Fallo definitivo: {e}")
                raise HTTPException(status_code=500, detail=f"Fallo tras reintentos: {str(e)}")
            time.sleep(5)
            
    raise HTTPException(status_code=503, detail="Hugging Face no respondió a tiempo.")
# 7. RUTA HÍBRIDA: Generación de Escena + Deep Dream (NUEVO)
@app.post("/api/v1/cosmic-dream/hybrid-synthesis")
async def hybrid_synthesis(req: HybridSynthesisRequest):
    hybrid_start_time = time.time()
    
    
    try:
        scene_bytes = generate_scene_from_prompt(
            req.scene.prompt, 
            req.scene.negative_prompt
        )
        print("✅ Imagen Base generada por Stable Diffusion (HF).")

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fallo en el Paso 1 (Generación de Escena): {e}")

    # --- PASO 2: Ejecución de Deep Dream (Local) ---
    base64_encoded_scene = base64.b64encode(scene_bytes).decode('utf-8')
    
    dream_req = DeepDreamRequest(
        width=req.dream.width,
        height=req.dream.height,
        seedImageId=f"data:image/png;base64,{base64_encoded_scene}",
        steps=req.dream.steps,
        stepSize=req.dream.stepSize,
        isProcessed=True,
        neuralLayer=req.dream.neuralLayer
    )
    
    try:
        final_dream_response = await process_deepdream_core(dream_req, scene_bytes)
        
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=f"Fallo en el Paso 2 (Deep Dream): {e.detail}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error CRÍTICO en el motor Deep Dream: {e}")


    hybrid_end_time = time.time()
    hybrid_duration = round(hybrid_end_time - hybrid_start_time, 3)
    print(f"🚀 SÍNTESIS HÍBRIDA COMPLETADA en {hybrid_duration}s.")
    return final_dream_response


# 8. RUTA ÚNICA PARA ARTE DEEP DREAM (Refactorizada y EXISTENTE)

@app.post("/api/v1/cosmic-dream/image") 
async def get_deepdream_image(req: DeepDreamRequest):
    return await process_deepdream_core(req)


async def process_deepdream_core(req: DeepDreamRequest, initial_image_bytes: Optional[bytes] = None):
    start_time = time.time()
    
    if not BASE_INCEPTION_MODEL:
        raise HTTPException(status_code=503, detail="El motor Deep Dream no está disponible (Error de carga de TensorFlow).")
    
    if not req.seedImageId:
        raise HTTPException(status_code=400, detail="Se requiere 'seedImageId' (URL o Base64).")
        
    # VALIDACIÓN Y CREACIÓN DEL MODELO DINÁMICO (Mantenido)
    try:
        layer_output = BASE_INCEPTION_MODEL.get_layer(req.neuralLayer).output
        DEEPDREAM_MODEL = tf.keras.Model(inputs=BASE_INCEPTION_MODEL.input, outputs=layer_output)
        print(f"MODO DEEP DREAM: Optimizado para la capa '{req.neuralLayer}'.")

    except ValueError as e:
        existing_layers = [layer.name for layer in BASE_INCEPTION_MODEL.layers]
        raise HTTPException(
            status_code=400, 
            detail=f"Capa Neuronal no válida: '{req.neuralLayer}'. Capas disponibles: {', '.join(existing_layers)}"
        )
    
    # --- LÓGICA DE OBTENCIÓN Y PROCESAMIENTO DE IMAGEN BASE ---
    try:
        # 1. OBTENER LA IMAGEN BASE: Maneja Híbrido, Iterativo, y URL
        if initial_image_bytes:
            img_data = BytesIO(initial_image_bytes)
            print("MODO DEEP DREAM HÍBRIDO: Usando imagen base generada por SD.")
        
        elif req.isProcessed:
            print(f"MODO DEEP DREAM ITERATIVO: Procesando {req.steps} pasos sobre Base64.")
            match = re.search(r'base64,(.*)', req.seedImageId)
            img_string = match.group(1) if match else req.seedImageId
            img_bytes = base64.b64decode(img_string)
            img_data = BytesIO(img_bytes)
            
        else:
            print(f"MODO DEEP DREAM INICIAL: Descargando URL: {req.seedImageId}")
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
            response = requests.get(req.seedImageId, headers=headers, timeout=30) 
            response.raise_for_status() 
            img_data = BytesIO(response.content)

        # 2. PROCESAMIENTO, TENSOR Y EJECUCIÓN (Mantenido)
        seed_image = Image.open(img_data).convert("RGB")
        seed_image_resized = seed_image.resize((req.width, req.height))
        seed_array_rgb = np.array(seed_image_resized, dtype=np.uint8)

        image_tensor = tf.constant(seed_array_rgb, dtype=tf.float32)
        image_tensor = inception.preprocess_input(image_tensor)
        
        dream_image = tf.Variable(tf.expand_dims(image_tensor, axis=0)) 
        
        for i in range(req.steps):
             loss, dream_image = deepdream_step(DEEPDREAM_MODEL, dream_image[0], req.stepSize)
             print(f"   -> Deep Dream Step {i+1}/{req.steps}, Loss: {loss.numpy():.2f}")
        
        # 3. POS-PROCESAR Y SALIDA (Mantenido)
        final_rgb_numpy = deprocess(dream_image[0]).numpy().astype(np.uint8)
        
        rgba_image_data = np.stack([
            final_rgb_numpy[:, :, 0], final_rgb_numpy[:, :, 1], final_rgb_numpy[:, :, 2], 
            np.full((req.height, req.width), 255, dtype=np.uint8)
        ], axis=2)
        
    except requests.exceptions.HTTPError as e:
        error_code = response.status_code if 'response' in locals() else 'N/A'
        print(f"❌ Error HTTP al descargar imagen (Código {error_code}): {e}")
        raise HTTPException(status_code=500, detail=f"Fallo al descargar la imagen semilla (HTTP Error: {error_code}).")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error de Conexión/Timeout al descargar: {e}")
        raise HTTPException(status_code=500, detail="Fallo de conexión o timeout al descargar la imagen semilla.")
    except Exception as e:
        print(f"❌ Error CRÍTICO en el proceso Deep Dream: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno del motor Deep Dream: {e}")

    # 4. Generar Respuesta PNG (Blob)
    img = Image.fromarray(rgba_image_data.astype(np.uint8), mode='RGBA') 
    buffer = BytesIO()
    img.save(buffer, format="PNG") 
    buffer.seek(0)
    
    end_time = time.time()
    processing_duration = round(end_time - start_time, 3)
    print(f"Deep Dream Lote Render Time: {processing_duration}s (Steps: {req.steps}, Layer: {req.neuralLayer})")

    return Response(content=buffer.getvalue(), media_type="image/png")


# 9. RUTAS ADICIONALES (STAR TRIP Y DB) - MANTENIDAS

@app.get("/")
def read_root():
    return {"message": "Motor FastAPI de Cosmic Imagination (Deep Dream Focus) operativo!", "status": "running"}

@app.get("/api/v1/ping-db")
def ping_db():
    if not db:
        return {"status": "error", "db_check": "Firebase no inicializado."}
    
    try:
        db.collection('users').limit(1).get() 
        return {"status": "success", "db_check": "Conexión a Firestore verificada."}
    except Exception as e:
        return {"status": "error", "db_check": f"Error de lectura: {e}"}

@app.post("/api/v1/star-trip/analyze-data", response_model=StarTripOutput)
async def analyze_star_trip_data(input_data: StarTripDataInput):
    user_id = input_data.user_id
    data_points = input_data.raw_frequency_points
    processed_count = len(data_points)
    
    print(f"[StarTrip:{user_id}:{input_data.mode}] - Iniciando análisis masivo de {processed_count} puntos.")
    
    start_time = time.time()
    time.sleep(min(processed_count / 5000, 3.0)) 
    star_trip_score = round(random.uniform(90.0, 99.9), 2) 
    mode = input_data.mode
    
    if mode == "Focus":
        base_tempo = 130
        note_range = (65, 90)
        note_complexity = 5
        base_duration = 150
    elif mode == "Relax":
        base_tempo = 100
        note_range = (55, 80)
        note_complexity = 3
        base_duration = 300
    elif mode == "Sleep":
        base_tempo = 60
        note_range = (40, 60)
        note_complexity = 2
        base_duration = 600
        
    score_normalized = (star_trip_score - 90.0) / 9.9 
    tempo = int(base_tempo + score_normalized * 10) 
    num_notes = int(100 + score_normalized * 100)
    pitch_data = []
    duration_data = []
    current_pitch = random.randint(note_range[0], note_range[1])
    
    for _ in range(num_notes):
        current_pitch += random.randint(-note_complexity, note_complexity) 
        current_pitch = max(min(current_pitch, note_range[1]), note_range[0]) 
        pitch_data.append(current_pitch)
        duration_data.append(random.choice([base_duration, int(base_duration * 0.5), int(base_duration * 1.5)]))
        
    end_time = time.time()
    processing_duration = round(end_time - start_time, 3)
    
    symphony_output_data = {
        "pitch": pitch_data,
        "duration_ms": duration_data,
        "tempo_bpm": tempo,
        "instrument": f"Cosmic Pulse Synthesizer - Mode {mode}"
    }
    
    # Lógica de guardado en Firestore
    if db:
        result_ref = db.collection('star_trip_results').document(user_id).collection('sessions').document(input_data.session_id)
        try:
            result_ref.set({
                "timestamp": int(time.time()),
                "input_count": processed_count,
                "processing_time_s": processing_duration,
                "star_trip_score": star_trip_score,
                "symphony_pitch_data_count": len(pitch_data), 
                "symphony_tempo_bpm": tempo,
                "mode": mode,
                "status": "COMPLETADO",
                "algorithm": input_data.algorithm_version
            })
        except Exception as e:
            print(f"❌ Error al guardar en Firestore: {e}")
    
    return {
        "user_id": user_id,
        "session_id": input_data.session_id,
        "processed_points": processed_count,
        "duration_s": processing_duration,
        "result_score": star_trip_score,
        "message": f"Análisis Estelar de Star Trip: Modo {mode} y partitura generada.",
        "symphony_data": symphony_output_data
    }