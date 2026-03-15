import pandas as pd
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# --- RUTA ABSOLUTA ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)

# --- CONFIGURACIÓN ---
DATASET_PATH = os.path.join(PROJECT_DIR, 'data', 'user_responses.csv')
MODEL_PATH = os.path.join(PROJECT_DIR, 'models', 'user_classifier_model.joblib')

def train_model():
    """
    Carga el dataset, entrena un modelo de clasificación y lo guarda.
    """
    # 1. Cargar el dataset
    try:
        df = pd.read_csv(DATASET_PATH)
        print(f"Dataset cargado desde '{DATASET_PATH}'.")
    except FileNotFoundError:
        print(f"Error: No se encontró el dataset en '{DATASET_PATH}'.")
        print("Asegúrate de ejecutar 'prepare_data.py' primero.")
        return

    # 2. Separar características (X) y etiqueta (y)
    X = df.drop('clasificacion', axis=1)
    y = df['clasificacion']
    
    # 3. Dividir los datos en conjuntos de entrenamiento y prueba
    #    80% para entrenar, 20% para evaluar
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print("Datos divididos en conjuntos de entrenamiento y prueba.")

    # 4. Inicializar y entrenar el modelo
    #    RandomForestClassifier es una buena opción para empezar: es potente y versátil.
    print("Entrenando el modelo RandomForestClassifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42, oob_score=True)
    model.fit(X_train, y_train)
    print("¡Modelo entrenado!")

    # 5. Evaluar el modelo con los datos de prueba
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print("-" * 50)
    print("Evaluación del Modelo:")
    print(f"Precisión (Accuracy) en el conjunto de prueba: {accuracy:.4f}")
    
    # OOB score es una estimación de la precisión en datos no vistos, calculada durante el entrenamiento.
    print(f"Precisión OOB (Out-of-Bag) estimada: {model.oob_score_:.4f}")
    
    print("\nReporte de Clasificación:")
    print(classification_report(y_test, y_pred))
    print("-" * 50)

    # 6. Guardar el modelo entrenado
    joblib.dump(model, MODEL_PATH)
    print(f"Modelo guardado exitosamente en: {MODEL_PATH}")


if __name__ == "__main__":
    train_model()
