from flask import Flask

from config import Config
from database.db import db

from routes.auth import auth
from routes.projects import projects
from routes.tasks import tasks
from routes.dashboard import dashboard

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

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