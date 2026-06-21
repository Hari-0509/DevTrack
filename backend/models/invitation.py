from database.db import db


class Invitation(
    db.Model
):
    __tablename__ = (
        "invitations"
    )

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    project_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "projects.id"
        ),
        nullable=False
    )

    sender_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "users.id"
        ),
        nullable=False
    )

    receiver_email = db.Column(
        db.String(100),
        nullable=False
    )

    role = db.Column(
        db.String(50),
        default="Member"
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "project_id":
                self.project_id,
            "sender_id":
                self.sender_id,
            "receiver_email":
                self.receiver_email,
            "role":
                self.role,
            "status":
                self.status
        }