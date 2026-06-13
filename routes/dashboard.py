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

@dashboard.route("/dashboard")
@jwt_required()
def get_dashboard():

    user_id = int(
        get_jwt_identity()
    )

    projects = Project.query.filter_by(
        user_id=user_id
    ).count()

    project_ids = [
        p.id
        for p in Project.query.filter_by(
            user_id=user_id
        ).all()
    ]

    completed_tasks = Task.query.filter(
        Task.project_id.in_(project_ids),
        Task.completed == True
    ).count()

    pending_tasks = Task.query.filter(
        Task.project_id.in_(project_ids),
        Task.completed == False
    ).count()

    return {
        "projects": projects,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    }