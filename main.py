from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

WNIOSEK_PATH = os.path.join('data', 'wnioski.json')

def load_wnioski():
    if not os.path.exists(WNIOSEK_PATH):
        with open(WNIOSEK_PATH, 'w') as f:
            json.dump([], f)
    with open(WNIOSEK_PATH, 'r') as f:
        return json.load(f)

def save_wnioski(data):
    with open(WNIOSEK_PATH, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def hello():
    return '🧠 TO TEN PRAWDZIWY BACKEND!'

@app.route('/api/test')
def test_api():
    return jsonify({"message": "Działa poprawnie!"})

@app.route('/api/wnioski', methods=['GET'])
def get_wnioski():
    print("✅ [FLASK] Odpowiadam na GET /api/wnioski")
    return jsonify(load_wnioski())

@app.route('/api/wnioski', methods=['POST'])
def add_wniosek():
    wnioski = load_wnioski()
    nowy = {
        "id": str(len(wnioski) + 1).zfill(3),
        "typ": request.json.get("typ"),
        "opis": request.json.get("opis"),
        "email": request.json.get("email"),  # Dodane
        "status": "oczekuje"
    }
    wnioski.append(nowy)
    save_wnioski(wnioski)
    print("DODANO:", nowy)
    return jsonify(nowy), 201

@app.route('/api/wnioski/<id>', methods=['PATCH'])
def zmien_status(id):
    wnioski = load_wnioski()
    for w in wnioski:
        if w["id"] == id:
            w["status"] = request.json.get("status", w["status"])
            save_wnioski(wnioski)
            return jsonify(w)
    return jsonify({"error": "Nie znaleziono"}), 404

if __name__ == '__main__':
    app.run(debug=True)
