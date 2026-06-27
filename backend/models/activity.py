from database.db import db


class Activity(db.Model):

    __tablename__ = "activities"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        nullable=False
    )

    action = db.Column(
        db.String(255),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=
        db.func.now()
    )

    def to_dict(self):
        return {
            "id":
                self.id,
            "user_id":
                self.user_id,
            "action":
                self.action,
            "created_at":
                str(
                    self.created_at
                )
        }