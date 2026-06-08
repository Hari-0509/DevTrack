from flask import Blueprint

dashboard = Blueprint(
    "dashboard",
    __name__
)

@dashboard.route("/dashboard")
def dashboard_api():
    return {
        "projects": 0,
        "completed_tasks": 0,
        "pending_tasks": 0
    }