from flask import Blueprint, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db
from models.task import Task
from models.project import Project
from datetime import datetime

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

    project = Project.query.filter_by(
        id=data.get("project_id"),
        user_id=current_user
    ).first()

    if not project:
        return {
            "message":
                "Project not found"
        }, 404

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

    project_id=project.id
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

    user_projects = (
        Project.query.filter_by(
            user_id=current_user
        ).all()
    )

    project_ids = [
        project.id
        for project
        in user_projects
    ]

    task_list = (
        Task.query.filter(
            Task.project_id.in_(
                project_ids
            )
        ).all()
    )

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

    task = (
        Task.query.join(Project)
        .filter(
            Task.id == task_id,
            Project.user_id
            == current_user
        )
        .first()
    )

    if not task:
        return {
            "message":
                "Task not found"
        }, 404

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

    task = (
        Task.query.join(Project)
        .filter(
            Task.id == task_id,
            Project.user_id
            == current_user
        )
        .first()
    )

    if not task:
        return {
            "message":
                "Task not found"
        }, 404

    db.session.delete(task)
    db.session.commit()

    return {
        "message":
            "Task deleted successfully"
    }

