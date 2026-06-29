from database.db import db
from datetime import datetime


class TaskAttachment(db.Model):

    __tablename__ = "task_attachments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    task_id = db.Column(
        db.Integer,
        db.ForeignKey("tasks.id"),
        nullable=False
    )

    filename = db.Column(
        db.String(255),
        nullable=False
    )

    filepath = db.Column(
        db.String(500),
        nullable=False
    )

    uploaded_by = db.Column(
        db.Integer,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):

        return {

            "id": self.id,

            "task_id": self.task_id,

            "filename": self.filename,

            "filepath": self.filepath,

            "uploaded_by": self.uploaded_by,

            "created_at": self.created_at.strftime(
                "%d %b %Y %I:%M %p"
            )

        }