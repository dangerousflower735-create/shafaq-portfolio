
from flask import Flask, request, jsonify, session, redirect, url_for, send_from_directory, render_template_string
import sqlite3
import os
from datetime import datetime
from werkzeug.utils import secure_filename

# =========================================================
# APP SETUP
# =========================================================

app = Flask(__name__)

# IMPORTANT:
# Change this to your own secret random text.
app.secret_key = "shaya-private-secret-2026-xyz"

# IMPORTANT:
# Change this to the password you want to use for /answers.
ADMIN_PASSWORD = "ShayaSeenu@" 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE = os.path.join(BASE_DIR, "answers.db")

UPLOAD_FOLDER = os.path.join(BASE_DIR, "answer_uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024


# =========================================================
# DATABASE
# =========================================================

def get_db():
    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


def init_database():

    connection = get_db()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_number INTEGER,
            question_number INTEGER,
            question TEXT,
            answer TEXT,
            created_at TEXT
        )
    """)

    connection.execute("""
        CREATE TABLE IF NOT EXISTS extra_terms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            term TEXT,
            created_at TEXT
        )
    """)

    connection.execute("""
        CREATE TABLE IF NOT EXISTS uploaded_photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            created_at TEXT
        )
    """)

    connection.commit()

    connection.close()


init_database()


# =========================================================
# MAIN WEBSITE
# =========================================================

@app.route("/")
def home():

    return send_from_directory(BASE_DIR, "index.html")


# =========================================================
# STATIC FILES
# =========================================================

@app.route("/<path:filename>")
def static_files(filename):

    # Don't allow access to private database/upload files
    if filename == "answers.db":
        return "Not found", 404

    if filename.startswith("answer_uploads/"):
        return "Not found", 404

    file_path = os.path.join(BASE_DIR, filename)

    if os.path.isfile(file_path):

        return send_from_directory(BASE_DIR, filename)

    return "File not found", 404


# =========================================================
# SAVE QUESTION ANSWER
# =========================================================

@app.route("/api/answer", methods=["POST"])
def save_answer():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received."
        }), 400

    session_number = data.get("session_number")
    question_number = data.get("question_number")
    question = data.get("question")
    answer = data.get("answer")

    if question is None or answer is None:

        return jsonify({
            "success": False,
            "message": "Question or answer missing."
        }), 400

    connection = get_db()

    connection.execute("""
        INSERT INTO answers
        (
            session_number,
            question_number,
            question,
            answer,
            created_at
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        session_number,
        question_number,
        question,
        str(answer),
        datetime.now().isoformat(timespec="seconds")
    ))

    connection.commit()

    connection.close()

    return jsonify({
        "success": True
    })


# =========================================================
# SAVE EXTRA CONTRACT TERM
# =========================================================

@app.route("/api/term", methods=["POST"])
def save_term():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False
        }), 400

    term = str(data.get("term", "")).strip()

    if not term:
        return jsonify({
            "success": False,
            "message": "Term is empty."
        }), 400

    connection = get_db()

    connection.execute("""
        INSERT INTO extra_terms
        (
            term,
            created_at
        )
        VALUES (?, ?)
    """, (
        term,
        datetime.now().isoformat(timespec="seconds")
    ))

    connection.commit()

    connection.close()

    return jsonify({
        "success": True
    })


# =========================================================
# UPLOAD SEENU PHOTO
# =========================================================

@app.route("/api/upload-photo", methods=["POST"])
def upload_photo():

    if "photo" not in request.files:

        return jsonify({
            "success": False,
            "message": "No photo received."
        }), 400

    photo = request.files["photo"]

    if not photo or photo.filename == "":

        return jsonify({
            "success": False,
            "message": "No photo selected."
        }), 400

    filename = secure_filename(photo.filename)

    if not filename:

        return jsonify({
            "success": False,
            "message": "Invalid filename."
        }), 400

    # Add timestamp so repeated uploads don't overwrite each other.
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    filename = f"{timestamp}_{filename}"

    save_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    photo.save(save_path)

    connection = get_db()

    connection.execute("""
        INSERT INTO uploaded_photos
        (
            filename,
            created_at
        )
        VALUES (?, ?)
    """, (
        filename,
        datetime.now().isoformat(timespec="seconds")
    ))

    connection.commit()

    connection.close()

    return jsonify({
        "success": True,
        "filename": filename
    })


# =========================================================
# ADMIN LOGIN
# =========================================================

LOGIN_PAGE = """
<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Private Answers</title>

    <style>

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;

            display: flex;
            align-items: center;
            justify-content: center;

            font-family: Arial, sans-serif;

            background:
                linear-gradient(
                    135deg,
                    #ffd6e7,
                    #e8d4ff,
                    #ffc9a9
                );

            padding: 20px;
        }

        .login-box {

            width: 100%;
            max-width: 420px;

            padding: 35px;

            border-radius: 25px;

            background: rgba(255,255,255,0.75);

            backdrop-filter: blur(15px);

            box-shadow:
                0 20px 60px rgba(60,30,70,0.20);

            text-align: center;
        }

        h1 {
            margin-bottom: 10px;
            color: #44264f;
        }

        p {
            color: #6b536f;
        }

        input {

            width: 100%;

            padding: 14px 16px;

            border: 1px solid #d8bfdc;

            border-radius: 12px;

            font-size: 16px;

            margin: 15px 0;
        }

        button {

            width: 100%;

            padding: 14px;

            border: none;

            border-radius: 12px;

            background: #6c3d75;

            color: white;

            font-size: 16px;

            cursor: pointer;
        }

        button:hover {
            opacity: 0.9;
        }

        .error {
            color: #a52d4b;
            font-weight: bold;
        }

    </style>

</head>

<body>

    <div class="login-box">

        <h1>Private Answers 🔐</h1>

        <p>Only Shaya can enter.</p>

        <form method="POST">

            <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
            >

            <button type="submit">
                Enter 💜
            </button>

        </form>

        {% if error %}

            <p class="error">
                {{ error }}
            </p>

        {% endif %}

    </div>

</body>

</html>
"""


# =========================================================
# ANSWERS PAGE
# =========================================================

ANSWERS_PAGE = """
<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Seenu's Answers</title>

    <style>

        * {
            box-sizing: border-box;
        }

        body {

            margin: 0;

            font-family:
                Arial,
                sans-serif;

            background:
                linear-gradient(
                    135deg,
                    #f9d6e5,
                    #e7d7ff,
                    #ffd2b5,
                    #d7d9ff
                );

            min-height: 100vh;

            padding: 30px 15px;
        }

        .container {

            width: 100%;
            max-width: 950px;

            margin: auto;
        }

        .header {

            background:
                rgba(255,255,255,0.75);

            backdrop-filter: blur(15px);

            border-radius: 25px;

            padding: 25px;

            margin-bottom: 25px;

            box-shadow:
                0 15px 45px rgba(60,30,70,0.15);
        }

        h1 {
            color: #44264f;
            margin-top: 0;
        }

        h2 {
            color: #573461;
        }

        .answer-card {

            background:
                rgba(255,255,255,0.78);

            border-radius: 18px;

            padding: 20px;

            margin-bottom: 15px;

            box-shadow:
                0 8px 25px rgba(60,30,70,0.10);
        }

        .number {

            color: #8a5a91;

            font-size: 13px;

            font-weight: bold;

            text-transform: uppercase;
        }

        .question {

            color: #3f2945;

            font-weight: bold;

            margin: 8px 0;
        }

        .answer {

            color: #6c3d75;

            font-size: 17px;

            white-space: pre-wrap;

            word-break: break-word;
        }

        .date {

            color: #927d96;

            font-size: 12px;

            margin-top: 10px;
        }

        .term {

            padding: 12px 15px;

            background: rgba(255,255,255,0.65);

            border-radius: 12px;

            margin-bottom: 10px;

            color: #4b3153;
        }

        .photo-card {

            background:
                rgba(255,255,255,0.78);

            border-radius: 20px;

            padding: 20px;

            margin-bottom: 20px;

        }

        .photo-card img {

            display: block;

            max-width: 320px;

            max-height: 420px;

            width: auto;

            height: auto;

            border-radius: 18px;

            margin-top: 15px;

            box-shadow:
                0 10px 30px rgba(50,30,60,0.18);
        }

        .logout {

            display: inline-block;

            margin-top: 15px;

            padding: 10px 18px;

            border-radius: 10px;

            background: #6c3d75;

            color: white;

            text-decoration: none;
        }

        .empty {

            color: #7e687f;

            font-style: italic;
        }

    </style>

</head>

<body>

<div class="container">

    <div class="header">

        <h1>
            Seenu's Answers 💜
        </h1>

        <p>
            Everything he answered on the website.
        </p>

        <a
            class="logout"
            href="{{ url_for('logout') }}"
        >
            Logout
        </a>

    </div>


    <h2>Questions & Answers 💌</h2>


    {% if answers %}

        {% for item in answers %}

            <div class="answer-card">

                <div class="number">

                    Session
                    {{ item["session_number"] }}
                    —
                    Question
                    {{ item["question_number"] }}

                </div>

                <div class="question">

                    {{ item["question"] }}

                </div>

                <div class="answer">

                    {{ item["answer"] }}

                </div>

                <div class="date">

                    {{ item["created_at"] }}

                </div>

            </div>

        {% endfor %}

    {% else %}

        <p class="empty">
            No answers have been saved yet.
        </p>

    {% endif %}


    <h2>Extra Contract Terms 📝</h2>


    {% if terms %}

        {% for term in terms %}

            <div class="term">

                {{ loop.index }}.
                {{ term["term"] }}

            </div>

        {% endfor %}

    {% else %}

        <p class="empty">
            No extra terms yet.
        </p>

    {% endif %}


    <h2>Uploaded Pictures 📸</h2>


    {% if photos %}

        {% for photo in photos %}

            <div class="photo-card">

                <div class="date">

                    Uploaded:
                    {{ photo["created_at"] }}

                </div>

                <img
                    src="{{ url_for(
                        'answer_photo',
                        filename=photo['filename']
                    ) }}"
                    alt="Uploaded picture"
                >

            </div>

        {% endfor %}

    {% else %}

        <p class="empty">
            No picture uploaded yet.
        </p>

    {% endif %}

</div>

</body>

</html>
"""


@app.route("/answers", methods=["GET", "POST"])
def answers():

    if not session.get("admin_logged_in"):

        if request.method == "POST":

            password = request.form.get(
                "password",
                ""
            )

            if password == ADMIN_PASSWORD:

                session["admin_logged_in"] = True

                return redirect(
                    url_for("answers")
                )

            return render_template_string(
                LOGIN_PAGE,
                error="Wrong password."
            )

        return render_template_string(
            LOGIN_PAGE,
            error=None
        )


    connection = get_db()

    answers_data = connection.execute("""
        SELECT *
        FROM answers
        ORDER BY id ASC
    """).fetchall()

    terms_data = connection.execute("""
        SELECT *
        FROM extra_terms
        ORDER BY id ASC
    """).fetchall()

    photos_data = connection.execute("""
        SELECT *
        FROM uploaded_photos
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    return render_template_string(
        ANSWERS_PAGE,
        answers=answers_data,
        terms=terms_data,
        photos=photos_data
    )


# =========================================================
# PRIVATE PHOTO ROUTE
# =========================================================

@app.route("/answer-photos/<filename>")
def answer_photo(filename):

    if not session.get("admin_logged_in"):

        return "Unauthorized", 401

    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )


# =========================================================
# LOGOUT
# =========================================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("answers")
    )


# =========================================================
# RUN LOCALLY
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )

