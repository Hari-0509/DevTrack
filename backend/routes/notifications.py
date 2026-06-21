from flask import Blueprint
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.notification import (
    Notification
)

from database.db import db

notifications = Blueprint(
    "notifications",
    __name__
)


@notifications.route(
    "/notifications",
    methods=["GET"]
)
@jwt_required()
def get_notifications():

    user_id = int(
        get_jwt_identity()
    )

    data = (
        Notification.query
        .filter_by(
            user_id=user_id
        )
        .order_by(
            Notification.id.desc()
        )
        .all()
    )

    return [
        n.to_dict()
        for n in data
    ]


@notifications.route(
    "/notifications/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def mark_read(id):

    notification = (
        Notification.query.get(
            id
        )
    )

    if not notification:
        return {
            "message":
                "Notification not found"
        }, 404

    notification.is_read = True

    db.session.commit()

    return {
        "message":
            "Notification updated"
    }