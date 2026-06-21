from app import app
from models.project import Project

with app.app_context():
    for p in Project.query.all():
        print(
            p.id,
            p.title
        )