from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from the correct Python Service!"

@app.route('/api/python-data')
def get_data():
    return {"message": "This is data from the existing Python API"}
