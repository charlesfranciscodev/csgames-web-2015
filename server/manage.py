import json
import dateutil.parser

from flask.cli import FlaskGroup

from project import create_app, db
from project.api.models import User, Tag

app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command("recreate_db")
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    """Seeds the database."""
    with open("tags.json") as f:
        tags = json.load(f)
        for tag in tags:
            tag_object = Tag()
            tag_object.name = tag["name"]
            db.session.add(tag_object)
    db.session.commit()

    with open("users.json") as f:
        users = json.load(f)
        for user in users:
            user_object = User()
            user_object.email = user["email"]
            user_object.name = user["name"]
            user_object.birthdate = dateutil.parser.parse(user["birthdate"])
            user_object.gender = user["gender"]
            user_object.interested_in = user["interestedIn"]
            user_object.picture_url= user["pictureURL"]
            user_object.hashed_password = user["hashedPassword"]
            user_object.description = user["description"]
            for tag_id in user["tags"]:
                tag_object = Tag.query.filter_by(tag_id=tag_id).first()
                user_object.tags.append(tag_object)
            db.session.add(user_object)
    db.session.commit()


if __name__ == "__main__":
    cli()