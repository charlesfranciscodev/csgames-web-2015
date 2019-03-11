import sys
import hashlib
import dateutil.parser
from functools import wraps

from flask import Blueprint, jsonify, request

from project.api.models import User, Tag
from project import db

auth_blueprint = Blueprint("auth_blueprint", __name__)


def authenticate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        response = {
            "message": "Provide a valid auth token."
        }
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify(response), 403
        auth_token = auth_header.split(" ")[1]
        value = User.decode_auth_token(auth_token)
        if isinstance(value, str):
            response["message"] = value
            return jsonify(response), 401
        user = User.query.filter_by(user_id=value).first()
        if user is None:
            return jsonify(response), 401
        return f(value, *args, **kwargs)
    return decorated_function


@auth_blueprint.route("/login", methods=["POST"])
def login():
    """Logs in the user"""
    response = {}
    request_json = request.get_json()

    email = request_json["email"]
    password = request_json["password"].encode("utf-8")
    user_object = User.query.filter_by(email=email).first()
    if user_object is None:
        response["message"] = "Invalid email or password"
        return jsonify(response), 401
    hashed_password = hashlib.sha256(password).hexdigest()
    if hashed_password != user_object.hashed_password:
        response["message"] = "Invalid email or password"
        return jsonify(response), 401

    # Generate auth token
    auth_token = user_object.encode_auth_token()
    response = user_object.to_json()
    response["token"] = auth_token.decode()
    return jsonify(response)


@auth_blueprint.route("/register", methods=["POST"])
def register():
    """Creates a user account"""
    response = {}
    request_json = request.get_json()

    # Validation
    keys = ["email", "name", "birthdate", "gender", "interestedIn", "description", "pictureURL", "password", "tags"]
    for key in keys:
        if key not in request_json:
            response["message"] = "Missing {} key in request body".format(key)
            return jsonify(response), 400

    email = request_json["email"]
    user = User.query.filter_by(email=email).first()
    if user is not None:
        response["message"] = "Email already exists"
        return jsonify(response), 409

    # Create user
    user = User()
    user.email = email
    user.name = request_json["name"]
    user.birthdate = dateutil.parser.parse(request_json["birthdate"])
    user.gender = request_json["gender"]
    user.interested_in = request_json["interestedIn"]
    user.description = request_json["description"]
    user.picture_url = request_json["pictureURL"]
    password = request_json["password"].encode("utf-8")
    user.hashed_password = hashlib.sha256(password).hexdigest()
    for tag_id in request_json["tags"]:
        tag = Tag.query.filter_by(tag_id=tag_id).first()
        user.tags.append(tag)
    db.session.add(user)
    db.session.commit()
    response["message"] = "Account created successfully"
    return jsonify(response), 201


@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    response = {
        "message": "Logout successful"
    }

    return jsonify(response)


@auth_blueprint.route("/users")
def users():
    users = User.query.all()
    response = [user.to_json() for user in users]
    return jsonify(response)
