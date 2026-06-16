from flask import Blueprint
from flask import request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db
from models.project import Project

projects = Blueprint(
    "projects",
    __name__
)


@projects.route("/projects", methods=["POST"])
@jwt_required()
def create_project():

    current_user = int(
        get_jwt_identity()
    )

    data = request.get_json()

    project = Project(
        title=data.get("title"),
        description=data.get("description"),
        status=data.get(
            "status",
            "In Progress"
        ),
        user_id=current_user
    )

    db.session.add(project)
    db.session.commit()

    return {
        "message": "Project created successfully"
    }, 201


@projects.route("/projects", methods=["GET"])
@jwt_required()
def get_projects():

    current_user = int(
        get_jwt_identity()
    )

    projects_list = Project.query.filter_by(
        user_id=current_user
    ).all()

    return [
        project.to_dict()
        for project in projects_list
    ]