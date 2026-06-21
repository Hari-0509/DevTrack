from flask import (
    Blueprint,
    request
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db

from models.user import User
from models.project import Project
from models.invitation import (
    Invitation
)
from models.project_member import (
    ProjectMember
)

invitations = Blueprint(
    "invitations",
    __name__
)


# Invite User
@invitations.route(
    "/projects/<int:project_id>/invite",
    methods=["POST"]
)
@jwt_required()
def invite_member(project_id):

    sender_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    email = data.get(
        "email"
    )

    role = data.get(
        "role",
        "Member"
    )

    project = Project.query.get(
        project_id
    )

    if not project:
        return {
            "message":
                "Project not found"
        }, 404

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return {
            "message":
                "User not found"
        }, 404

    existing = Invitation.query.filter_by(
        project_id=project_id,
        receiver_email=email,
        status="Pending"
    ).first()

    if existing:
        return {
            "message":
                "Invitation already sent"
        }, 400

    invitation = Invitation(
        project_id=project_id,
        sender_id=sender_id,
        receiver_email=email,
        role=role
    )

    db.session.add(
        invitation
    )

    db.session.commit()

    return {
        "message":
            "Invitation sent successfully"
    }


# Get My Invitations
@invitations.route(
    "/invitations",
    methods=["GET"]
)
@jwt_required()
def get_invitations():

    user_id = int(
        get_jwt_identity()
    )

    user = User.query.get(
        user_id
    )

    invitations_data = (
        Invitation.query.filter_by(
            receiver_email=user.email,
            status="Pending"
        ).all()
    )

    return [
        invitation.to_dict()
        for invitation
        in invitations_data
    ]


# Accept Invitation
@invitations.route(
    "/invitations/<int:id>/accept",
    methods=["POST"]
)
@jwt_required()
def accept_invitation(id):

    user_id = int(
        get_jwt_identity()
    )

    invitation = (
        Invitation.query.get(id)
    )

    if not invitation:
        return {
            "message":
                "Invitation not found"
        }, 404

    member = ProjectMember(
        project_id=
            invitation.project_id,
        user_id=user_id,
        role=
            invitation.role
    )

    db.session.add(
        member
    )

    invitation.status = (
        "Accepted"
    )

    db.session.commit()

    return {
        "message":
            "Invitation accepted"
    }


# Decline Invitation
@invitations.route(
    "/invitations/<int:id>/decline",
    methods=["POST"]
)
@jwt_required()
def decline_invitation(id):

    invitation = (
        Invitation.query.get(id)
    )

    if not invitation:
        return {
            "message":
                "Invitation not found"
        }, 404

    invitation.status = (
        "Declined"
    )

    db.session.commit()

    return {
        "message":
            "Invitation declined"
    }