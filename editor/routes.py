from flask import Blueprint, render_template, request, jsonify
from flask_cors import CORS
import sqlite3
import json, os, requests
from datetime import datetime

# Criando o Blueprint
flow_bp = Blueprint(
    'flow',
    __name__,
    template_folder='templates',
    static_folder='static'
)

# Ativando CORS dentro do Blueprint
CORS(flow_bp)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, 'flow.db')

#Minify(app=app, html=False, js=True, cssless=False)

CONFIG_FILE = os.path.join(BASE_DIR, 'config.json')

# Configuração padrão
DEFAULT_CONFIG = {
    "PERSEO_URL": "http://perseo-fe:9090/rules",
    "FIWARE_SERVICE": "titania",
    "FIWARE_SERVICEPATH": "/"
}

def load_config():
    if not os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'w') as f:
            json.dump(DEFAULT_CONFIG, f, indent=4)
        return DEFAULT_CONFIG

    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return DEFAULT_CONFIG

CONFIG = load_config()


def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS flows (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                flow_json TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        ''')
        conn.commit()

init_db()

@flow_bp.route('/')
def index():
    return render_template('index.html')

@flow_bp.route('/gerar_epl', methods=['POST'])
def gerar_epl():
    data = request.json
    
    if not data or 'rule_name' not in data or 'epl' not in data or 'action' not in data:
        return jsonify({'error': 'Invalid payload'}), 400

    payload = {
        "name": data["rule_name"],
        "text": data["epl"],
        "action": data["action"]
    }

    try:
        # NOTE: Update the 'perseo-fe' hostname and the 'fiware-service' parameter
        # to match your FIWARE Perseo CEP deployment and service configuration.
        resp = requests.post(
            "http://perseo-fe:9090/rules",
            json=payload,
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "fiware-service": "titania", # change this to your FIWARE service 
                "fiware-servicepath": "/"    # adjust service path if needed
            },
            timeout=5
        )

        if resp.status_code not in (200, 201):
            return jsonify({
                "error": "Error sending request to Perseo",
                "perseo_status": resp.status_code,
                "perseo_response": resp.text
            }), 500

        return jsonify({
            "status": "ok",
            "rule_name": data["rule_name"],
            "perseo_response": resp.json(),
            "received": data
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "Unable to connect to Perseo",
            "details": str(e)
        }), 500
    

@flow_bp.route('/saveFlow', methods=['POST'])
def save_flow():
    data = request.get_json()
    name = data.get('name')
    flow = data.get('flow')

    if not name or not flow:
        return jsonify({'error': 'The parameters "name" and "flow" are required'}), 400

    flow_json = json.dumps(flow)
    created_at = datetime.now().isoformat()

    try:
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO flows (name, flow_json, created_at) VALUES (?, ?, ?)',
                (name, flow_json, created_at)
            )
            flow_id = cursor.lastrowid
            conn.commit()
        return jsonify({'message': 'Flow saved successfully', 'id': flow_id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@flow_bp.route('/getFlow/<int:flow_id>', methods=['GET'])
def get_flow(flow_id):
    try:
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, name, flow_json, created_at FROM flows WHERE id = ?', (flow_id,))
            row = cursor.fetchone()
            if row is None:
                return jsonify({'error': 'Flow not found'}), 404
            flow = json.loads(row[2])
            return jsonify({
                'id': row[0],
                'name': row[1],
                'flow': flow,
                'created_at': row[3]
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@flow_bp.route('/listFlows', methods=['GET'])
def list_flows():
    try:
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, name, created_at FROM flows ORDER BY created_at DESC')
            rows = cursor.fetchall()
            flows = [
                {'id': row[0], 'name': row[1], 'created_at': row[2]}
                for row in rows
            ]
            return jsonify(flows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
