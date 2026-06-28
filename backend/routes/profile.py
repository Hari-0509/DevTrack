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
from models.project_member import (
    ProjectMember
)

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

    # Projects created by me
    owned_projects = (
        Project.query.filter_by(
            user_id=user_id
        ).all()
    )

    # Projects shared with me
    member_projects = (
        Project.query.join(
            ProjectMember,
            Project.id ==
            ProjectMember.project_id
        )
        .filter(
            ProjectMember.user_id ==
            user_id
        )
        .all()
    )

    # Remove duplicates
    projects = list({
        p.id: p
        for p in (
            owned_projects +
            member_projects
        )
    }.values())

    project_ids = [
        project.id
        for project in projects
    ]

    if project_ids:
        completed = (
            Task.query.filter(
                Task.project_id.in_(
                    project_ids
                ),
                Task.status ==
                "Completed"
            ).count()
        )
    else:
        completed = 0

    total_tasks = (
    Task.query.filter(
        Task.project_id.in_(
            project_ids
        )
    ).count()
    if project_ids
    else 0
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
        len(projects),
    "completed":
        completed,
    "total_tasks":
        total_tasks
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
    