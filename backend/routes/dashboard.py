from flask import Blueprint
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.project import Project
from models.task import Task

dashboard = Blueprint(
    "dashboard",
    __name__
)


@dashboard.route(
    "/dashboard/stats"
)
@jwt_required()
def get_stats():

    current_user = int(
        get_jwt_identity()
    )

    projects = Project.query.filter_by(
        user_id=current_user
    ).all()

    project_ids = [
        p.id
        for p in projects
    ]

    tasks = Task.query.filter(
        Task.project_id.in_(
            project_ids
        )
    ).all()

    completed = len([
        task
        for task in tasks
        if task.status ==
        "Completed"
    ])

    pending = (
        len(tasks)
        - completed
    )

    return {
        "projects":
            len(projects),

        "tasks":
            len(tasks),

        "completed":
            completed,

        "pending":
            pending
    }


@dashboard.route(
    "/dashboard/charts"
)
@jwt_required()
def get_charts():

    current_user = int(
        get_jwt_identity()
    )

    projects = Project.query.filter_by(
        user_id=current_user
    ).all()

    project_ids = [
        p.id
        for p in projects
    ]

    tasks = Task.query.filter(
        Task.project_id.in_(
            project_ids
        )
    ).all()

    todo = len([
        t
        for t in tasks
        if t.status ==
        "Todo"
    ])

    progress = len([
        t
        for t in tasks
        if t.status ==
        "In Progress"
    ])

    completed = len([
        t
        for t in tasks
        if t.status ==
        "Completed"
    ])

    return {
        "todo":
            todo,

        "progress":
            progress,

        "completed":
            completed
    }