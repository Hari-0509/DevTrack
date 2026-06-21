from flask import (
    Blueprint,
    request
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db
from models.user import User
from models.project import Project
from models.task import Task

from utils.password import bcrypt

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
        "id":
            user.id,
        "name":
            user.username,
        "email":
            user.email,
        "role":
            user.role,
        "projects":
            projects,
        "completed":
            completed
    }


@profile.route(
    "/profile",
    methods=["PUT"]
)
@jwt_required()
def update_profile():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    user = User.query.get(
        user_id
    )

    user.username = data.get(
        "username",
        user.username
    )

    user.email = data.get(
        "email",
        user.email
    )

    user.role = data.get(
        "role",
        user.role
    )

    db.session.commit()

    return {
        "message":
            "Profile updated successfully"
    }

@profile.route(
    "/profile/password",
    methods=["PUT"]
)
@jwt_required()
def change_password():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    current_password = data.get(
        "currentPassword"
    )

    new_password = data.get(
        "newPassword"
    )

    user = User.query.get(
        user_id
    )

    if not bcrypt.check_password_hash(
        user.password,
        current_password
    ):
        return {
            "message":
            "Current password is incorrect"
        }, 400

    user.password = (
        bcrypt.generate_password_hash(
            new_password
        ).decode("utf-8")
    )

    db.session.commit()

    return {
        "message":
        "Password updated successfully"
    }