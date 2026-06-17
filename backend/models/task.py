from database.db import db

class Task(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    task_name = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Todo"
    )

    completed = db.Column(
        db.Boolean,
        default=False
    )

    project_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "project.id"
        )
    )

    def to_dict(self):
        return {
            "id": self.id,
            "task_name":
                self.task_name,
            "description":
                self.description,
            "status":
                self.status,
            "completed":
                self.completed,
            "project_id":
                self.project_id,
        }