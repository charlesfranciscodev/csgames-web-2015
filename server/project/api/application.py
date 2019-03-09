import sys

from flask import Blueprint, jsonify, request

from project import db

from project.api.models import Tag
from project.api.auth import authenticate

app_blueprint = Blueprint("app_blueprint", __name__)


@app_blueprint.route("/ping", methods=["GET"])
@authenticate
def ping(user_id):
    response = {"message": "pong, {}".format(user_id)}
    return jsonify(response)


@app_blueprint.route("/hello")
def hello():
    response = {"message": "Hello world!"}
    return jsonify(response)


@app_blueprint.route("/tags")
def tags():
    tags = Tag.query.all()
    response = [tag.to_json() for tag in tags]
    return jsonify(response)
