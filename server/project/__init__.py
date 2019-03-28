import os

from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


socketio = SocketIO()
db = SQLAlchemy()  # instantiate the db
cors = CORS()


def create_app(script_info=None):
    # instantiate the app
    app = Flask(__name__)

    # set config
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # register blueprints
    from project.api.auth import auth_blueprint
    from project.api.application import app_blueprint
    from project.api.messaging import messaging_blueprint
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(app_blueprint)
    app.register_blueprint(messaging_blueprint)

    # set up extensions
    socketio.init_app(app)
    db.init_app(app)
    cors.init_app(app)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app
