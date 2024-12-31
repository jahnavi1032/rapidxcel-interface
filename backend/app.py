import sqlite3
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS


app = Flask(__name__)
app.secret_key = 'rapidXcel'
CORS(app)
JWTManager(app)

DATABASE = "rapidXcel.db"

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()

        # Create a table if it doesn't exist
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            role TEXT NOT NULL,
                            username TEXT NOT NULL,
                            email TEXT NOT NULL UNIQUE,
                            password TEXT NOT NULL)''')
        conn.commit()


def get_db_connection():
    conn = sqlite3.connect('rapidXcel.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    role = data["role"]
    email = data["email"]
    username = data['username']
    password = data['password']
    
    conn = get_db_connection()
    
    user_exists = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    if user_exists:
        return jsonify({"warning": "Username already exists."}), 400
    
    hashed_password = generate_password_hash(password)
    
    conn.execute('INSERT INTO users (role,username,email, password) VALUES (?, ?, ?, ?)', (role, username, email, hashed_password))
    conn.commit()
    conn.close()
    
    return jsonify({"success": "User created successfully."}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    conn = get_db_connection()
    user_row = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    
    if user_row and check_password_hash(user_row['password'], password):
        access_token = create_access_token(identity=user_row['id'])
        return jsonify(access_token=access_token), 200

    return jsonify({"danger": "Invalid credentials."}), 401


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
