from database.db import db


class Task(db.Model):

    __tablename__ = "tasks"

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

    priority = db.Column(
        db.String(20),
        default="Medium"
    )

    due_date = db.Column(
        db.String(50)
    )

    completed = db.Column(
        db.Boolean,
        default=False
    )

    project_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "projects.id"
        ),
        nullable=False
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
            "priority":
                self.priority,
            "due_date":
                self.due_date,
            "completed":
                self.completed,
            "project_id":
                self.project_id
        }