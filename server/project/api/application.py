from flask import Blueprint, jsonify, request

from project import db

from project.api.models import User, Tag, Rating
from project.api.auth import authenticate

app_blueprint = Blueprint("app_blueprint", __name__)


@app_blueprint.route("/tags")
def tags():
    tags = Tag.query.all()
    response = [tag.to_json() for tag in tags]
    return jsonify(response)


@app_blueprint.route("/users")
def users():
    users = User.query.all()
    response = [user.to_json() for user in users]
    return jsonify(response)


@app_blueprint.route("/user/<int:user_id>")
def user(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if user is None:
        response = {}
        response["message"] = "Invalid user id"
        return jsonify(response), 404
    return jsonify(user.to_json())


@app_blueprint.route("/rating", methods=["POST"])
@authenticate
def rating(user_id):
    response = {}
    request_json = request.get_json()

    # Validation
    keys = ["fromUserId", "toUserId", "stars", "comment"]
    for key in keys:
        if key not in request_json:
            response["message"] = "Missing {} key in request body".format(key)
            return jsonify(response), 400

    from_user_id = request_json["fromUserId"]
    to_user_id = request_json["toUserId"]
    if from_user_id == to_user_id or user_id != from_user_id:
        response["message"] = "Invalid user id"
        return jsonify(response), 401

    from_user = User.query.filter_by(user_id=from_user_id).first()
    to_user = User.query.filter_by(user_id=to_user_id).first()
    if from_user is None or to_user is None:
        response["message"] = "Invalid user id"
        return jsonify(response), 404

    # Create or Update rating
    rating = Rating.query.filter_by(from_user_id=from_user_id, to_user_id=to_user_id).first()
    create = rating is None
    if create:
        rating = Rating()
        rating.from_user_id = from_user_id
        rating.to_user_id = to_user_id
    rating.stars = request_json["stars"]
    rating.comment = request_json["comment"]
    if create:
        db.session.add(rating)
        response["message"] = "Rating created successfully"
    else:
        response["message"] = "Rating updated successfully"
    db.session.commit()

    return jsonify(response), 200
