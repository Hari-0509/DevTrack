from flask import Flask
from flask_jwt_extended import JWTManager

from utils.password import bcrypt

from config import Config
from database.db import db

from routes.auth import auth
from routes.projects import projects
from routes.tasks import tasks
from routes.dashboard import dashboard

from models.user import User
from models.project import Project
from models.task import Task

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

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

app.config.from_object(Config)

jwt = JWTManager(app)

@jwt.invalid_token_loader
def invalid_token_callback(error):
    print("INVALID TOKEN:", error)
    return {"message": error}, 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    print("MISSING TOKEN:", error)
    return {"message": error}, 401

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(projects)
app.register_blueprint(tasks)
app.register_blueprint(dashboard)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {
        "project": "DevTrack",
        "status": "Running"
    }

if __name__ == "__main__":
    app.run(debug=True)