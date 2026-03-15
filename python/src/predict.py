import joblib
import pandas as pd
import random
import os

# --- RUTA ABSOLUTA ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)

# --- CONFIGURACIÓN ---
MODEL_PATH = os.path.join(PROJECT_DIR, 'models', 'user_classifier_model.joblib')
NUM_QUESTIONS = 50 # Debe coincidir con el número de preguntas del dataset

def predict_new_user():
    """
    Carga el modelo entrenado y predice la clasificación para un nuevo
    conjunto de respuestas de un usuario simulado.
    """
    # 1. Cargar el modelo entrenado
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Modelo cargado desde '{MODEL_PATH}'")
    except FileNotFoundError:
        print(f"Error: No se encontró el modelo en '{MODEL_PATH}'.")
        print("Asegúrate de ejecutar 'train_model.py' primero.")
        return

    # 2. Simular las respuestas de un nuevo usuario
    #    Vamos a crear un usuario que claramente tiende al "Tipo 4"
    print("\nSimulando un nuevo usuario con tendencia al 'Tipo_4'...")
    new_user_answers = {}
    archetype_tendency = 1
    for i in range(1, NUM_QUESTIONS + 1):
        question_id = f"pregunta_{i}"
        # Hacemos que la mayoría de sus respuestas sean '4'
        if random.random() < 0.9:
            new_user_answers[question_id] = archetype_tendency
        else:
            new_user_answers[question_id] = random.randint(1, 7)
    
    # Convertimos las respuestas a un DataFrame, porque el modelo espera esa entrada
    new_user_df = pd.DataFrame([new_user_answers])

    print("Respuestas del nuevo usuario (primeras 5 preguntas):")
    print(new_user_df.iloc[:, :5])

    # 3. Usar el modelo para predecir la clasificación
    prediction = model.predict(new_user_df)
    prediction_probability = model.predict_proba(new_user_df)

    # 4. Mostrar el resultado
    print("-" * 50)
    print("Resultado de la Predicción:")
    print(f"El modelo clasifica al nuevo usuario como: {prediction[0]}")
    
    # También podemos ver la confianza que tiene el modelo en su predicción
    class_probabilities = list(zip(model.classes_, prediction_probability[0]))
    print("\nConfianza del modelo por cada clase:")
    for class_type, probability in class_probabilities:
        print(f"  - {class_type}: {probability:.2%}")
    print("-" * 50)

if __name__ == "__main__":
    predict_new_user()
