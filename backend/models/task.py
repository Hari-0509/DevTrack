from database.db import db

class Task(db.Model):

    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)

    task_name = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(db.Text)

    completed = db.Column(
        db.Boolean,
        default=False
    )

    project_id = db.Column(
        db.Integer,
        db.ForeignKey("projects.id"),
        nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "description": self.description,
            "completed": self.completed,
            "project_id": self.project_id
        }