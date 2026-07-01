from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from config import Config
from database.db import db
from utils.password import bcrypt

# Models
from models.user import User
from models.project import Project
from models.task import Task
from models.project_member import ProjectMember
from models.invitation import Invitation
from models.task_attachment import TaskAttachment
from models.activity import Activity

# Routes
from routes.auth import auth
from routes.projects import projects
from routes.tasks import tasks
from routes.dashboard import dashboard
from routes.profile import profile
from routes.notifications import notifications
from routes.invitations import invitations
from routes.project_members import project_members
from routes.activity import activity
from routes.attachments import attachments

from flask_mail import Mail
from extensions import mail
load_dotenv()

app = Flask(__name__)

# ==========================
# Configuration
# ==========================

app.config.from_object(Config)

# ==========================
# CORS
# ==========================

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173"
            ]
        }
    }
)

# ==========================
# Extensions
# ==========================

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
mail.init_app(app)

# ==========================
# JWT Error Handlers
# ==========================

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {
        "message": error
    }, 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return {
        "message": error
    }, 401


# ==========================
# Register Blueprints
# ==========================

app.register_blueprint(auth)
app.register_blueprint(projects)
app.register_blueprint(tasks)
app.register_blueprint(dashboard)
app.register_blueprint(profile)
app.register_blueprint(notifications)
app.register_blueprint(invitations)
app.register_blueprint(project_members)
app.register_blueprint(activity)
app.register_blueprint(attachments)

# ==========================
# Create Database
# ==========================

with app.app_context():
    db.create_all()

# ==========================
# Home Route
# ==========================

@app.route("/")
def home():
    return {
        "project": "DevTrack",
        "status": "Running",
        "version": "1.0.0"
    }

# ==========================
# Run Server
# ==========================

if __name__ == "__main__":
    app.run(debug=True)