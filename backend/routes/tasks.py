from flask import Blueprint, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db

from models.task import Task
from models.project import Project
from models.project_member import (
    ProjectMember
)

tasks = Blueprint(
    "tasks",
    __name__
)


# ==========================================
# CREATE TASK
# ==========================================
@tasks.route(
    "/tasks",
    methods=["POST"]
)
@jwt_required()
def create_task():

    current_user = int(
        get_jwt_identity()
    )

    data = request.get_json()

    project = Project.query.get(
        data.get(
            "project_id"
        )
    )

    if not project:
        return {
            "message":
                "Project not found"
        }, 404

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=
                project.id,
            user_id=
                current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
                "Access denied"
        }, 403

    task = Task(
        task_name=data.get(
            "task_name"
        ),

        description=data.get(
            "description"
        ),

        status=data.get(
            "status",
            "Todo"
        ),

        priority=data.get(
            "priority",
            "Medium"
        ),

        due_date=data.get(
            "due_date"
        ),

        project_id=
            project.id,

        assigned_to=
            data.get(
                "assigned_to"
            )
    )

    db.session.add(task)
    db.session.commit()

    return {
        "message":
            "Task created successfully"
    }, 201


# ==========================================
# GET ALL TASKS
# ==========================================
@tasks.route(
    "/tasks",
    methods=["GET"]
)
@jwt_required()
def get_tasks():

    current_user = int(
        get_jwt_identity()
    )

    owned_projects = (
        Project.query.filter_by(
            user_id=current_user
        ).all()
    )

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

    all_projects = list({
        p.id: p
        for p in (
            owned_projects +
            member_projects
        )
    }.values())

    project_ids = [
        project.id
        for project
        in all_projects
    ]

    if project_ids:
        task_list = (
            Task.query.filter(
                Task.project_id.in_(
                    project_ids
                )
            ).all()
        )
    else:
        task_list = []

    return [
        task.to_dict()
        for task
        in task_list
    ]


# ==========================================
# UPDATE TASK
# ==========================================
@tasks.route(
    "/tasks/<int:task_id>",
    methods=["PUT"]
)
@jwt_required()
def update_task(task_id):

    current_user = int(
        get_jwt_identity()
    )

    task = Task.query.get(
        task_id
    )

    if not task:
        return {
            "message":
                "Task not found"
        }, 404

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=
                project.id,
            user_id=
                current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
                "Access denied"
        }, 403

    data = request.get_json()

    task.task_name = data.get(
        "task_name",
        task.task_name
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.status = data.get(
        "status",
        task.status
    )

    task.priority = data.get(
        "priority",
        task.priority
    )

    task.due_date = data.get(
        "due_date",
        task.due_date
    )

    task.assigned_to = data.get(
        "assigned_to",
        task.assigned_to
    )

    db.session.commit()

    return {
        "message":
            "Task updated successfully"
    }


# ==========================================
# DELETE TASK
# ==========================================
@tasks.route(
    "/tasks/<int:task_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_task(task_id):

    current_user = int(
        get_jwt_identity()
    )

    task = Task.query.get(
        task_id
    )

    if not task:
        return {
            "message":
                "Task not found"
        }, 404

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=
                project.id,
            user_id=
                current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
                "Access denied"
        }, 403

    db.session.delete(task)
    db.session.commit()

    return {
        "message":
            "Task deleted successfully"
    }