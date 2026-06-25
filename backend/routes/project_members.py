from flask import Blueprint
from flask_jwt_extended import (
    jwt_required
)
from models.project import Project
from models.project_member import (
    ProjectMember
)
from models.user import User

project_members = Blueprint(
    "project_members",
    __name__
)


@project_members.route(
    "/projects/<int:project_id>/members"
)
@jwt_required()
def get_members(project_id):

    project = Project.query.get(
        project_id
    )

    if not project:
        return [], 404

    result = []

    # Add owner
    owner = User.query.get(
        project.user_id
    )

    if owner:
        result.append({
            "id": owner.id,
            "username":
                owner.username,
            "email":
                owner.email,
            "role":
                "Owner"
        })

    # Add invited members
    members = (
        ProjectMember.query.filter_by(
            project_id=project_id
        ).all()
    )

    for member in members:

        user = User.query.get(
            member.user_id
        )

        if user:
            result.append({
                "id":
                    user.id,
                "username":
                    user.username,
                "email":
                    user.email,
                "role":
                    member.role
            })

    return result