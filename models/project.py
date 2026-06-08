from database.db import db

class Project(db.Model):

    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="In Progress"
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )