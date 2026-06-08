from flask import Blueprint

tasks = Blueprint(
    "tasks",
    __name__
)

@tasks.route("/tasks")
def get_tasks():
    return {
        "message": "Tasks API Working"
    }