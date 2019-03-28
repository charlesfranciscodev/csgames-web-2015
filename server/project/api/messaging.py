import sys

from flask import Blueprint, request, jsonify, render_template
from flask_socketio import emit, join_room, leave_room, close_room, disconnect

from project import socketio, db
from project.api.models import User, Message


messaging_blueprint = Blueprint("messaging_blueprint", __name__, template_folder="./templates")


@messaging_blueprint.route("/")
def index():
    return render_template("index.html")


@socketio.on("message_from_user", namespace="/messages")
def receive_message(payload):
    emit("message_from_server", payload, broadcast=True)


@socketio.on("disconnect_me", namespace="/private")
def disconnect_me(message):
    disconnect()


@messaging_blueprint.route("/messages")
def messages():
    messages = Message.query.all()
    response = [message.to_json() for message in messages]
    return jsonify(response)
