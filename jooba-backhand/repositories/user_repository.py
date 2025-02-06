from flask import jsonify
from models import Guess, db, AppUser

class UserRepository:

    @staticmethod
    def create_user(username, password_hash, password_salt):
        user = AppUser(username=username, password_hash=password_hash, password_salt=password_salt)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_user_by_username(username):
        user = AppUser.query.filter_by(username=username).first()
        return user
    
    @staticmethod
    def save_guess(user_id, country, guessed_time, timestamp, result):
        """ Save user's guess in the database with a foreign key reference. """
        new_guess = Guess(
            user_id=user_id,
            country=country,
            guessed_time=guessed_time,
            timestamp=timestamp,
            result=result
        )
        db.session.add(new_guess)
        db.session.commit()
        return new_guess
    
    @staticmethod
    def get_wins_by_username(username):
        user_id = UserRepository.get_user_by_username(username).id
        wins_list = Guess.query.filter_by(user_id=user_id)
        return jsonify(wins_list)
