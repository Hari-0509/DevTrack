from flask import (
    Blueprint,
    request
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db

from models.project import Project
from models.project_member import (
    ProjectMember
)
from models.task import Task

projects = Blueprint(
    "projects",
    __name__
)


@projects.route(
    "/projects",
    methods=["POST"]
)
@jwt_required()
def create_project():

    current_user = int(
        get_jwt_identity()
    )

    data = request.get_json()

    project = Project(
        title=data.get(
            "title"
        ),
        description=data.get(
            "description"
        ),
        status=data.get(
            "status",
            "In Progress"
        ),
        user_id=current_user
    )

    db.session.add(
        project
    )
    db.session.commit()

    return {
        "message":
            "Project created successfully"
    }, 201


@projects.route(
    "/projects",
    methods=["GET"]
)
@jwt_required()
def get_projects():

    current_user = int(
        get_jwt_identity()
    )

    # Projects created by me
    owned_projects = (
        Project.query.filter_by(
            user_id=current_user
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
            current_user
        )
        .all()
    )

    # Remove duplicates
    all_projects = {
        p.id: p
        for p in (
            owned_projects +
            member_projects
        )
    }.values()

    result = []

    for project in all_projects:

        tasks = (
            Task.query.filter_by(
                project_id=project.id
            ).all()
        )

        total_tasks = len(
            tasks
        )

        completed_tasks = len([
            task
            for task in tasks
            if task.status ==
            "Completed"
        ])

        progress = (
            round(
                (
                    completed_tasks /
                    total_tasks
                ) * 100
            )
            if total_tasks > 0
            else 0
        )

        project_data = (
            project.to_dict()
        )

        project_data[
            "total_tasks"
        ] = total_tasks

        project_data[
            "completed_tasks"
        ] = completed_tasks

        project_data[
            "progress"
        ] = progress

        result.append(
            project_data
        )

    return result