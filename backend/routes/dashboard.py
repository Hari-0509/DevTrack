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
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def get_dashboard():

    current_user = int(
        get_jwt_identity()
    )

    projects = Project.query.filter_by(
        user_id=current_user
    ).all()

    project_ids = [
        project.id
        for project in projects
    ]

    tasks = Task.query.filter(
        Task.project_id.in_(
            project_ids
        )
    ).all()

    total_tasks = len(tasks)

    todo = len([
        task
        for task in tasks
        if task.status == "Todo"
    ])

    progress = len([
        task
        for task in tasks
        if task.status ==
        "In Progress"
    ])

    completed = len([
        task
        for task in tasks
        if task.status ==
        "Completed"
    ])

    high = len([
        task
        for task in tasks
        if task.priority ==
        "High"
    ])

    medium = len([
        task
        for task in tasks
        if task.priority ==
        "Medium"
    ])

    low = len([
        task
        for task in tasks
        if task.priority ==
        "Low"
    ])

    productivity = (
        round(
            (
                completed
                / total_tasks
            ) * 100,
            1
        )
        if total_tasks > 0
        else 0
    )

    upcoming = sorted(
        [
            task.to_dict()
            for task in tasks
            if task.due_date
        ],
        key=lambda x:
            x["due_date"]
    )[:5]

    return {
        "projects":
            len(projects),

        "tasks":
            total_tasks,

        "todo":
            todo,

        "progress":
            progress,

        "completed":
            completed,

        "high":
            high,

        "medium":
            medium,

        "low":
            low,

        "productivity":
            productivity,

        "upcoming":
            upcoming
    }