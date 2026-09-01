from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# =========================
# CONFIGURATION
# =========================

app.secret_key = "shafaq-portfolio-secret-key"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///portfolio.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "static/uploads"

db = SQLAlchemy(app)

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


# =========================
# DATABASE MODELS
# =========================

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    percentage = db.Column(db.Integer, default=0)


class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(150), nullable=False)
    result = db.Column(db.String(100))
    status = db.Column(db.String(100))
    description = db.Column(db.Text)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    technologies = db.Column(db.String(300))
    github_link = db.Column(db.String(300))
    live_link = db.Column(db.String(300))


class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    organization = db.Column(db.String(150))
    date = db.Column(db.String(100))
    file_name = db.Column(db.String(300))


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(
        db.String(150),
        nullable=False,
        default="Shafaq Chaudhary"
    )
    title = db.Column(
        db.String(200),
        nullable=False,
        default="Software Engineering Student"
    )
    about = db.Column(db.Text)
    email = db.Column(db.String(200))
    photo = db.Column(db.String(300))
    github = db.Column(db.String(300))
    linkedin = db.Column(db.String(300))
    instagram = db.Column(db.String(300))


# =========================
# PUBLIC PORTFOLIO
# =========================

@app.route("/")
def home():

    education = Education.query.all()
    skills = Skill.query.all()
    projects = Project.query.all()
    certificates = Certificate.query.all()
    profile = Profile.query.first()

    return render_template(
        "index.html",
        education=education,
        skills=skills,
        projects=projects,
        certificates=certificates,
        profile=profile
    )


# =========================
# LOGIN
# =========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        if username == "Shafaq" and password == "Shafaq123":

            session["admin_logged_in"] = True

            return redirect(url_for("admin"))

        return render_template(
            "login.html",
            error="Invalid username or password."
        )

    return render_template("login.html")


# =========================
# LOGOUT
# =========================

@app.route("/logout")
def logout():

    session.pop("admin_logged_in", None)

    return redirect(url_for("login"))


# =========================
# ADMIN DASHBOARD
# =========================

@app.route("/admin")
def admin():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    education = Education.query.all()
    skills = Skill.query.all()
    projects = Project.query.all()
    certificates = Certificate.query.all()
    profile = Profile.query.first()

    return render_template(
        "admin.html",
        education=education,
        skills=skills,
        projects=projects,
        certificates=certificates,
        profile=profile
    )


# =========================
# PROFILE
# =========================

@app.route("/admin/profile/update", methods=["POST"])
def update_profile():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    profile = Profile.query.first()

    if not profile:

        profile = Profile()

        db.session.add(profile)

    profile.name = request.form["name"]
    profile.title = request.form["title"]
    profile.about = request.form["about"]
    profile.email = request.form["email"]
    profile.github = request.form["github"]
    profile.linkedin = request.form["linkedin"]
    profile.instagram = request.form["instagram"]

    photo = request.files.get("photo")

    if photo and photo.filename:

        filename = secure_filename(photo.filename)

        photo.save(
            os.path.join(
                app.config["UPLOAD_FOLDER"],
                filename
            )
        )

        profile.photo = filename

    db.session.commit()

    return redirect(url_for("admin"))

  


# =========================
# EDUCATION
# =========================

@app.route("/admin/education/add", methods=["POST"])
def add_education():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    degree = request.form["degree"]
    result = request.form["result"]
    status = request.form["status"]
    description = request.form["description"]

    new_education = Education(
        degree=degree,
        result=result,
        status=status,
        description=description
    )

    db.session.add(new_education)
    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/education/delete/<int:id>")
def delete_education(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    education = Education.query.get_or_404(id)

    db.session.delete(education)
    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/education/update/<int:id>", methods=["POST"])
def update_education(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    education = Education.query.get_or_404(id)

    education.degree = request.form["degree"]
    education.result = request.form["result"]
    education.status = request.form["status"]
    education.description = request.form["description"]

    db.session.commit()

    return redirect(url_for("admin"))


# =========================
# SKILLS
# =========================

@app.route("/admin/skill/add", methods=["POST"])
def add_skill():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    name = request.form["name"]

    percentage = int(request.form["percentage"])

    percentage = max(0, min(100, percentage))

    new_skill = Skill(
        name=name,
        percentage=percentage
    )

    db.session.add(new_skill)
    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/skill/update/<int:id>", methods=["POST"])
def update_skill(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    skill = Skill.query.get_or_404(id)

    skill.name = request.form["name"]

    percentage = int(request.form["percentage"])

    skill.percentage = max(0, min(100, percentage))

    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/skill/delete/<int:id>")
def delete_skill(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    skill = Skill.query.get_or_404(id)

    db.session.delete(skill)
    db.session.commit()

    return redirect(url_for("admin"))


# =========================
# PROJECTS
# =========================

@app.route("/admin/project/add", methods=["POST"])
def add_project():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    title = request.form["title"]
    description = request.form["description"]
    technologies = request.form["technologies"]
    github_link = request.form["github_link"]
    live_link = request.form["live_link"]

    new_project = Project(
        title=title,
        description=description,
        technologies=technologies,
        github_link=github_link,
        live_link=live_link
    )

    db.session.add(new_project)
    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/project/delete/<int:id>")
def delete_project(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    project = Project.query.get_or_404(id)

    db.session.delete(project)
    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/project/update/<int:id>", methods=["POST"])
def update_project(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    project = Project.query.get_or_404(id)

    project.title = request.form["title"]
    project.description = request.form["description"]
    project.technologies = request.form["technologies"]
    project.github_link = request.form["github_link"]
    project.live_link = request.form["live_link"]

    db.session.commit()

    return redirect(url_for("admin"))


# =========================
# CERTIFICATES
# =========================

@app.route("/admin/certificate/add", methods=["POST"])
def add_certificate():

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    title = request.form["title"]
    organization = request.form["organization"]
    date = request.form["date"]

    certificate_file = request.files.get("certificate_file")

    file_name = None

    if certificate_file and certificate_file.filename:

        file_name = secure_filename(
            certificate_file.filename
        )

        certificate_file.save(
            os.path.join(
                app.config["UPLOAD_FOLDER"],
                file_name
            )
        )

    new_certificate = Certificate(
        title=title,
        organization=organization,
        date=date,
        file_name=file_name
    )

    db.session.add(new_certificate)
    db.session.commit()

    return redirect(url_for("admin"))

@app.route("/admin/certificate/update/<int:id>", methods=["POST"])
def update_certificate(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    certificate = Certificate.query.get_or_404(id)

    certificate.title = request.form["title"]
    certificate.organization = request.form["organization"]
    certificate.date = request.form["date"]

    certificate_file = request.files.get("certificate_file")

    if certificate_file and certificate_file.filename:

        filename = secure_filename(
            certificate_file.filename
        )

        certificate_file.save(
            os.path.join(
                app.config["UPLOAD_FOLDER"],
                filename
            )
        )

        certificate.file_name = filename

    db.session.commit()

    return redirect(url_for("admin"))


@app.route("/admin/certificate/delete/<int:id>")
def delete_certificate(id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("login"))

    certificate = Certificate.query.get_or_404(id)

    if certificate.file_name:

        file_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            certificate.file_name
        )

        if os.path.exists(file_path):
            os.remove(file_path)

    db.session.delete(certificate)
    db.session.commit()

    return redirect(url_for("admin"))


# =========================
# DATABASE
# =========================

with app.app_context():
    db.create_all()


# =========================
# RUN
# =========================

if __name__ == "__main__":
   app.run(debug=True, port=5001)