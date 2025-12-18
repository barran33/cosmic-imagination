// /lib/api/fastApi.ts

// Define la interfaz (estructura) de los datos que le envías a FastAPI
interface CosmicDataInput {
    user_id: string;
    session_id: string;
    raw_frequency_points: number[]; // Array de números flotantes (Ej: Datos Astrofísicos)
    algorithm_version?: string;
    max_duration_minutes?: number;
}

// Define la interfaz de la respuesta que esperas de FastAPI
interface CosmicProcessResult {
    user_id: string;
    session_id: string;
    processed_points: number;
    duration_s: number;
    result_score: number; // El score o resultado principal del análisis de Star Trip
    message: string;
    error?: string;
}

const FASTAPI_URL = "http://localhost:8000"; // URL base de tu backend


export const sendStarTripDataForProcessing = async (data: CosmicDataInput): Promise<CosmicProcessResult> => {
    
    // Aseguramos que data.session_id tenga un valor por si acaso no se pasó
    const session_id = data.session_id || Date.now().toString(); 

    try {
        // RUTA CORREGIDA: Usando Star Trip en lugar de Ascension
        const response = await fetch(`${FASTAPI_URL}/api/v1/star-trip/analyze-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Enviamos los datos como un JSON string
            body: JSON.stringify({ ...data, session_id }),
        });

        const result: CosmicProcessResult = await response.json();

        if (!response.ok || result.error) {
            // Maneja fallos de CORS o errores devueltos por la API
            console.error("❌ Fallo en la API de FastAPI (Star Trip):", result.error || response.statusText);
            return { error: result.error || response.statusText, user_id: data.user_id, session_id, processed_points: 0, duration_s: 0, result_score: 0, message: "" };
        }

        console.log("✅ Proceso de Star Trip completado:", result);
        return result;

    } catch (error) {
        const message = error instanceof Error ? error.message : "Error de red o conexión";
        console.error("❌ Falló la llamada de red al backend:", message);
        return { error: message, user_id: data.user_id, session_id, processed_points: 0, duration_s: 0, result_score: 0, message: "" };
    }
};