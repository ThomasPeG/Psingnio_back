import json
import pandas as pd
import random

import os

# --- RUTA ABSOLUTA --- 
# Esto hace que el script funcione sin importar desde dónde lo ejecutemos
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)

# --- CONFIGURACIÓN ---
# Ruta al archivo JSON con las preguntas
JSON_FILE_PATH = os.path.join(PROJECT_DIR, 'data', 'psignios_db.questions.json')
# Ruta donde guardaremos el dataset CSV generado
CSV_FILE_PATH = os.path.join(PROJECT_DIR, 'data', 'user_responses.csv')
# Número de usuarios simulados que queremos generar
NUM_USERS = 1000
# Número de arquetipos (basado en los 'values' de las respuestas, 1 a 7)
ARCHETYPES = range(1, 8)


def simulate_dataset():
    """
    Lee el archivo JSON de preguntas, simula respuestas de usuarios
    y genera un archivo CSV listo para el entrenamiento.
    """
    # 1. Cargar las preguntas desde el archivo JSON
    try:
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
            questions_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo de preguntas en '{JSON_FILE_PATH}'")
        return

    all_responses = []
    print(f"Simulando {NUM_USERS} respuestas de usuarios...")

    # 2. Simular un usuario por cada iteración
    for i in range(NUM_USERS):
        # Asignamos un "arquetipo verdadero" a este usuario simulado
        user_archetype = random.choice(ARCHETYPES)
        user_answers = {}

        # 3. El usuario responde cada pregunta
        for question in questions_data:
            question_id = f"pregunta_{question['id']}"

            # Creamos una probabilidad alta (85%) de que elija la respuesta
            # que corresponde a su arquetipo. Esto crea patrones claros para la IA.
            if random.random() < 0.85:
                answer_value = user_archetype
            else:
                # Si no, elige cualquier otra respuesta al azar
                possible_values = [opt['value'] for opt in question['options']]
                answer_value = random.choice(possible_values)
            
            user_answers[question_id] = answer_value

        # 4. Asignamos la etiqueta final (la clasificación) que la IA deberá aprender
        user_answers['clasificacion'] = f"Tipo_{user_archetype}"
        all_responses.append(user_answers)

    # 5. Crear un DataFrame de pandas y guardarlo como CSV
    df = pd.DataFrame(all_responses)

    # Opcional: Reordenar columnas para que 'clasificacion' quede al final
    cols = [col for col in df.columns if col != 'clasificacion'] + ['clasificacion']
    df = df[cols]

    df.to_csv(CSV_FILE_PATH, index=False)
    
    print("-" * 50)
    print(f"¡Éxito! Dataset simulado guardado en: {CSV_FILE_PATH}")
    print(f"Dimensiones del dataset: {df.shape[0]} filas, {df.shape[1]} columnas")
    print("Ejemplo de las primeras 5 filas:")
    print(df.head())
    print("-" * 50)


if __name__ == "__main__":
    simulate_dataset()
