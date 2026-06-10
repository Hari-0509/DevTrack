from flask import Blueprint
from flask import request
from flask_jwt_extended import create_access_token
from database.db import db
from models.user import User
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.password import bcrypt

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
@auth.route("/profile")
@jwt_required()
def profile():

    current_user = get_jwt_identity()

    return {
        "message": "Profile accessed successfully",
        "user_id": current_user
    }