import datetime
import jwt

from flask import current_app
from project import db
from sqlalchemy.ext.hybrid import hybrid_property

user_tag = db.Table(
    "user_tag",
    db.Column(
        "user_id", db.Integer,
        db.ForeignKey(
            "user.user_id", onupdate="CASCADE", ondelete="CASCADE"
        ),
        primary_key=True
    ),
    db.Column(
        "tag_id", db.Integer,
        db.ForeignKey(
            "tag.tag_id", onupdate="CASCADE", ondelete="CASCADE"
        ),
        primary_key=True
    )
)


class Rating(db.Model):
    __tablename__ = "rating"
    from_user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.user_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    )
    to_user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.user_id", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True
    )
    stars = db.Column(db.Integer, nullable=False)


class User(db.Model):
    __tablename__ = "user"
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    interested_in = db.Column(db.String(1), nullable=False)
    description = db.Column(db.Text, nullable=False)
    picture_url = db.Column(db.Text, nullable=False)
    hashed_password = db.Column(db.String(64), nullable=False)
    tags = db.relationship(
        "Tag", secondary=user_tag, lazy="subquery",
        backref=db.backref("users", lazy=True)
    )
    ratings = db.relationship(
        "Rating",
        secondary="rating",
        primaryjoin="rating.c.to_user_id == user.c.user_id",
        secondaryjoin="rating.c.from_user_id == user.c.user_id"
    )

    def to_json(self):
        user_dict = {
            "userId": self.user_id,
            "email": self.email,
            "name": self.name,
            "birthdate": self.birthdate.date().isoformat(),
            "gender": self.gender,
            "interestedIn": self.interested_in,
            "description": self.description,
            "pictureUrl": self.picture_url,
            "tags": [tag.name for tag in self.tags],
            "averageRating": self.average_rating
        }
        return user_dict

    @hybrid_property
    def average_rating(self):
        stars = [rating.stars for rating in self.ratings]
        if len(stars) == 0:
            return 0
        return round(sum(stars) / len(stars))

    def encode_auth_token(self):
        """Generates the auth token"""
        now = datetime.datetime.utcnow()
        delta = datetime.timedelta(
            days=current_app.config.get("TOKEN_EXPIRATION_DAYS"),
            seconds=current_app.config.get("TOKEN_EXPIRATION_SECONDS")
        )
        try:
            payload = {
                "exp": now + delta,
                "iat": now,
                "sub": self.user_id
            }
            return jwt.encode(
                payload,
                current_app.config.get("SECRET_KEY"),
                algorithm="HS256"
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """Decodes the auth token"""
        try:
            payload = jwt.decode(
                auth_token,
                current_app.config.get("SECRET_KEY")
            )
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."


class Tag(db.Model):
    __tablename__ = "tag"
    tag_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def to_json(self):
        tag_dict = {
            "tagId": self.tag_id,
            "name": self.name
        }
        return tag_dict
