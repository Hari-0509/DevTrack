from flask import Blueprint

auth = Blueprint(
    "auth",
    __name__
)

@auth.route("/register")
def register():
    return {
        "message": "Register API Working"
    }

@auth.route("/login")
def login():
    return {
        "message": "Login API Working"
    }