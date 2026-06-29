from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from werkzeug.utils import (
    secure_filename
)

import os
import uuid

from database.db import db

from models.task import Task
from models.project import Project
from models.project_member import (
    ProjectMember
)
from models.task_attachment import (
    TaskAttachment
)

attachments = Blueprint(
    "attachments",
    __name__
)

UPLOAD_FOLDER = "uploads"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "pdf",
    "doc",
    "docx",
    "txt"
}


def allowed_file(filename):

    return (
        "." in filename
        and
        filename.rsplit(
            ".",
            1
        )[1].lower()
        in
        ALLOWED_EXTENSIONS
    )


# =====================================
# GET ATTACHMENTS
# =====================================

@attachments.route(
    "/tasks/<int:task_id>/attachments",
    methods=["GET"]
)
@jwt_required()
def get_attachments(task_id):

    current_user = int(
        get_jwt_identity()
    )

    task = Task.query.get(task_id)

    if not task:
        return {
            "message":
            "Task not found"
        },404

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=project.id,
            user_id=current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
            "Access denied"
        },403

    files = TaskAttachment.query.filter_by(
        task_id=task_id
    ).all()

    return jsonify(
        [
            file.to_dict()
            for file in files
        ]
    )


# =====================================
# UPLOAD FILE
# =====================================

@attachments.route(
    "/tasks/<int:task_id>/attachments",
    methods=["POST"]
)
@jwt_required()
def upload_attachment():

    current_user = int(
        get_jwt_identity()
    )

    task_id = request.view_args[
        "task_id"
    ]

    task = Task.query.get(task_id)

    if not task:
        return {
            "message":
            "Task not found"
        },404

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=project.id,
            user_id=current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
            "Access denied"
        },403

    if "file" not in request.files:

        return {
            "message":
            "No file selected"
        },400

    file = request.files[
        "file"
    ]

    if file.filename == "":

        return {
            "message":
            "No file selected"
        },400

    if not allowed_file(
        file.filename
    ):

        return {
            "message":
            "Unsupported file"
        },400

    task_folder = os.path.join(
        UPLOAD_FOLDER,
        f"task_{task_id}"
    )

    os.makedirs(
        task_folder,
        exist_ok=True
    )

    extension = file.filename.split(
        "."
    )[-1]

    filename = (
        str(uuid.uuid4())
        +
        "."
        +
        extension
    )

    filepath = os.path.join(
        task_folder,
        filename
    )

    file.save(filepath)

    attachment = TaskAttachment(

        task_id=task_id,

        filename=file.filename,

        filepath=filepath,

        uploaded_by=current_user

    )

    db.session.add(
        attachment
    )

    db.session.commit()

    return {

        "message":
        "File uploaded successfully",

        "attachment":
        attachment.to_dict()

    },201

from flask import send_from_directory


# =====================================
# DOWNLOAD / VIEW FILE
# =====================================

@attachments.route(
    "/attachments/<int:attachment_id>",
    methods=["GET"]
)
@jwt_required()
def download_attachment(attachment_id):

    current_user = int(
        get_jwt_identity()
    )

    attachment = TaskAttachment.query.get(
        attachment_id
    )

    if not attachment:
        return {
            "message":
            "Attachment not found"
        },404

    task = Task.query.get(
        attachment.task_id
    )

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=project.id,
            user_id=current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
            "Access denied"
        },403

    directory = os.path.dirname(
        attachment.filepath
    )

    filename = os.path.basename(
        attachment.filepath
    )

    return send_from_directory(
        directory,
        filename,
        as_attachment=False
    )


# =====================================
# DELETE ATTACHMENT
# =====================================

@attachments.route(
    "/attachments/<int:attachment_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_attachment(attachment_id):

    current_user = int(
        get_jwt_identity()
    )

    attachment = TaskAttachment.query.get(
        attachment_id
    )

    if not attachment:
        return {
            "message":
            "Attachment not found"
        },404

    task = Task.query.get(
        attachment.task_id
    )

    project = Project.query.get(
        task.project_id
    )

    is_owner = (
        project.user_id ==
        current_user
    )

    is_member = (
        ProjectMember.query.filter_by(
            project_id=project.id,
            user_id=current_user
        ).first()
    )

    if (
        not is_owner and
        not is_member
    ):
        return {
            "message":
            "Access denied"
        },403

    if os.path.exists(
        attachment.filepath
    ):
        os.remove(
            attachment.filepath
        )

    db.session.delete(
        attachment
    )

    db.session.commit()

    return {
        "message":
        "Attachment deleted successfully"
    }