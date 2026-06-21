from database.db import db


class Notification(
    db.Model
):
    __tablename__ = (
        "notifications"
    )

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    message = db.Column(
        db.String(255),
        nullable=False
    )

    is_read = db.Column(
        db.Boolean,
        default=False
    )

    user_id = db.Column(
        db.Integer,
        nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "message":
                self.message,
            "is_read":
                self.is_read
        }