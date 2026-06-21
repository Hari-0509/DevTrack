from flask import Blueprint
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.user import User
from models.project import Project
from models.task import Task

profile = Blueprint(
    "profile",
    __name__
)


@profile.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def get_profile():

    user_id = int(
        get_jwt_identity()
    )

    user = User.query.get(
        user_id
    )

    projects = (
        Project.query.filter_by(
            user_id=user_id
        ).count()
    )

    project_ids = [
        project.id
        for project in
        Project.query.filter_by(
            user_id=user_id
        ).all()
    ]

    completed = (
        Task.query.filter(
            Task.project_id.in_(
                project_ids
            ),
            Task.status ==
            "Completed"
        ).count()
    )

    return {
        "id": user.id,
        "name":
            user.username,
        "email":
            user.email,
        "projects":
            projects,
        "completed":
            completed
    }