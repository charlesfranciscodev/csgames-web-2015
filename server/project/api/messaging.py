import sys

from flask import Blueprint, request, render_template
from flask_socketio import send, emit, join_room, leave_room, close_room, disconnect

from project import socketio, db
from project.api.models import User


messaging_blueprint = Blueprint("messaging_blueprint", __name__, template_folder="./templates")


@messaging_blueprint.route("/")
def index():
    return render_template("index.html")


@socketio.on("message from user", namespace="/messages")
def receive_message_from_user(message):
    emit("from flask", message, broadcast=True)


@socketio.on("username", namespace="/private")
def receive_username(username):
    #users[username] = request.sid
    print("Username added!")


# payload = {"username" : recipient, "message" : message_to_send}
@socketio.on("private_message", namespace="/private")
def private_message(payload):
    recipient_session_id = users[payload["username"]]
    message = payload["message"]
    emit("new_private_message", message, room=recipient_session_id)


@socketio.on("join_room", namespace="/private")
def handle_join_room(room):
    join_room(room)
    emit("room_message", "a new user has joined", room=room)


@socketio.on("leave_the_room", namespace="/private")
def handle_leave_room(room):
    leave_room(room)
    emit("room_message", "a user has left the room", room=room)


@socketio.on('disconnect_me', namespace='/private')
def disconnect_me(message):
    disconnect()
