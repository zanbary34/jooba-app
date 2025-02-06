from datetime import datetime
from db_context import db

class AppUser(db.Model):
    __tablename__ = "app_users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    password_salt = db.Column(db.String(200), nullable=False)
    guesses = db.relationship("Guess", backref="user", lazy=True)  # One-to-many relationship


class Guess(db.Model):
    __tablename__ = "guesses"

    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(100), nullable=False)
    guessed_time = db.Column(db.String(5), nullable=False)  # Format: "HH:MM"
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    result = db.Column(db.String(1), nullable=False)  # "W" (win) or "L" (lose)
    user_id = db.Column(db.Integer, db.ForeignKey('app_users.id'), nullable=False)  # Foreign Key to User

