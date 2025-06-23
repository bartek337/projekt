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
    last_id = max([int(w["id"]) for w in wnioski if w.get("id", "").isdigit()], default=0)
    nowy = {
        #"id": str(len(wnioski) + 1).zfill(3),
        "id": str(last_id + 1).zfill(3),  # np. "009"
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

ANKIETY_DIR = os.path.join("data")
ANKIETA1_PATH = os.path.join(ANKIETY_DIR, "ankieta1.json")
ANKIETA2_PATH = os.path.join(ANKIETY_DIR, "ankieta2.json")

def save_json(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def load_json(path):
    if not os.path.exists(path):
        return []
    with open(path, 'r') as f:
        return json.load(f)

@app.route('/api/ankiety/inwestycje', methods=['POST'])
def zapisz_ankiete1():
    dane = request.json
    wszystkie = load_json(ANKIETA1_PATH)
    wszystkie.append(dane)
    save_json(ANKIETA1_PATH, wszystkie)
    return jsonify({"message": "Odpowiedź zapisana"}), 201

@app.route('/api/ankiety/inwestycje', methods=['GET'])
def pobierz_ankieta1():
    return jsonify(load_json(ANKIETA1_PATH))

@app.route('/api/ankiety/ocena', methods=['POST'])
def zapisz_ankiete2():
    dane = request.json
    wszystkie = load_json(ANKIETA2_PATH)
    wszystkie.append(dane)
    save_json(ANKIETA2_PATH, wszystkie)
    return jsonify({"message": "Odpowiedź zapisana"}), 201

@app.route('/api/ankiety/ocena', methods=['GET'])
def pobierz_ankieta2():
    return jsonify(load_json(ANKIETA2_PATH))

KOMENTARZE_PATH = os.path.join("data", "komentarze.json")

def load_komentarze():
    if not os.path.exists(KOMENTARZE_PATH):
        with open(KOMENTARZE_PATH, 'w') as f:
            json.dump({}, f)
    with open(KOMENTARZE_PATH, 'r') as f:
        return json.load(f)

def save_komentarze(data):
    with open(KOMENTARZE_PATH, 'w') as f:
        json.dump(data, f, indent=2)

# Pobieranie komentarzy dla konkretnego wydarzenia
@app.route('/api/komentarze/<slug>', methods=['GET'])
def get_komentarze(slug):
    all_comments = load_komentarze()
    return jsonify(all_comments.get(slug, []))

# Dodawanie komentarza do konkretnego wydarzenia
@app.route('/api/komentarze/<slug>', methods=['POST'])
def add_komentarz(slug):
    all_comments = load_komentarze()
    new_comment = {
        "autor": request.json.get("autor", "Anonim"),
        "tresc": request.json.get("tresc", ""),
        "data": request.json.get("data", "")
    }
    if not new_comment["tresc"]:
        return jsonify({"error": "Komentarz pusty"}), 400

    if slug not in all_comments:
        all_comments[slug] = []
    all_comments[slug].append(new_comment)
    save_komentarze(all_comments)
    return jsonify(new_comment), 201


if __name__ == '__main__':
    app.run(debug=True)

