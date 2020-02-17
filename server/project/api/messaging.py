import sys
import datetime

from flask import Blueprint, request, jsonify, render_template
from flask_socketio import emit, disconnect

from project import socketio, db
from project.api.models import User, Message

from sqlalchemy import asc

messaging_blueprint = Blueprint("messaging_blueprint", __name__, template_folder="./templates")


@messaging_blueprint.route("/")
def index():
    return render_template("index.html")


@socketio.on("message_from_user", namespace="/messages")
def receive_message(payload):
    message = Message()
    message.from_user_id = payload["fromUserId"]
    message.content = payload["content"]
    message.date_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db.session.add(message)
    db.session.commit()
    emit("message_from_server", message.to_json(), broadcast=True)


@socketio.on("disconnect_me", namespace="/messages")
def disconnect_me():
    disconnect()


@messaging_blueprint.route("/messages")
def messages():
    messages = Message.query.order_by(asc(Message.date_time)).all()
    response = [message.to_json() for message in messages]
    return jsonify(response)
