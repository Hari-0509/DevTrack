from flask import Blueprint
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.activity import Activity

activity = Blueprint(
    "activity",
    __name__
)


@activity.route(
    "/activities"
)
@jwt_required()
def get_activities():

    user_id = int(
        get_jwt_identity()
    )

    activities = (
        Activity.query.filter_by(
            user_id=user_id
        )
        .order_by(
            Activity.id.desc()
        )
        .limit(10)
        .all()
    )

    return [
        a.to_dict()
        for a
        in activities
    ]