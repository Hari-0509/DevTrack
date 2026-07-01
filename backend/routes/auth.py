from extensions import mail
from utils.mail import send_reset_email
from flask import Blueprint
from flask import request
from flask_jwt_extended import create_access_token
from database.db import db
from models.user import User
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.password import bcrypt
from google.oauth2 import (
    id_token
)

from google.auth.transport import (
    requests
)

from itsdangerous import URLSafeTimedSerializer
from utils.password import bcrypt


import os

serializer = URLSafeTimedSerializer(
    os.getenv("SECRET_KEY")
)

auth = Blueprint(
    "auth",
    __name__
)

@auth.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "GET":
        return {
            "message": "Register endpoint working"
        }

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return {
            "message": "Email already exists"
        }, 400

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    new_user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return {
        "message": "User registered successfully"
    }, 201


@auth.route("/users")
def get_users():

    users = User.query.all()

    return [
        user.to_dict()
        for user in users
    ]
@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return {
            "message": "User not found"
        }, 404

    if not bcrypt.check_password_hash(
        user.password,
        password
    ):
        return {
            "message": "Invalid password"
        }, 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return {
        "message": "Login successful",
        "token": access_token
    }, 200

@auth.route(
    "/google-login",
    methods=["POST"]
)
def google_login():

    data = request.get_json()

    token = data.get(
        "token"
    )

    try:

        info = (
            id_token
            .verify_oauth2_token(
                token,
                requests.Request(),
                "339645643863-6ji4872gdoamm5fe7g3rtr9kcnfk4019.apps.googleusercontent.com",
                clock_skew_in_seconds=10
            )
        )

        email = info[
            "email"
        ]

        username = info.get(
            "name"
        )

        user = (
            User.query
            .filter_by(
                email=email
            )
            .first()
        )

        if not user:

            user = User(
                username=
                    username,

                email=
                    email,

                password=""
            )

            db.session.add(
                user
            )

            db.session.commit()

        access_token = (
            create_access_token(
                identity=
                    str(
                        user.id
                    )
            )
        )

        return {
            "token":
                access_token
        }

    except Exception as e:

        print(e)

        return {
            "message":
                "Google login failed"
        }, 401
    
@auth.route(
    "/forgot-password",
    methods=["POST"]
)
def forgot_password():

    data = request.get_json()

    email = data.get("email")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return {
            "message":
            "Email not found"
        },404

    token = serializer.dumps(
        email,
        salt="reset-password"
    )

    reset_link = (
        f"http://localhost:5173/reset-password/{token}"
    )

    print(
        "\nRESET LINK:\n",
        reset_link,
        "\n"
    )

    from utils.mail import send_reset_email

    send_reset_email(
    mail,
    user.email,
    reset_link
    )

    return {
        "message": "Password reset email sent."
    }, 200

# send_email(reset_link)

#return {
    #"message":
    ##    "Password reset email sent"
#}

@auth.route(
    "/reset-password",
    methods=["POST"]
)
def reset_password():

    data = request.get_json()

    token = data.get("token")

    new_password = data.get(
        "password"
    )

    try:

        email = serializer.loads(
            token,
            salt="reset-password",
            max_age=900
        )

    except Exception:

        return {
            "message":
            "Invalid or expired token"
        },400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return {
            "message":
            "User not found"
        },404

    user.password = bcrypt.generate_password_hash(
        new_password
    ).decode("utf-8")

    db.session.commit()

    return {
        "message":
        "Password updated successfully"
    }