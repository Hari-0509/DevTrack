from flask import Blueprint

projects = Blueprint(
    "projects",
    __name__
)

@projects.route("/projects")
def get_projects():
    return {
        "message": "Projects API Working"
    }