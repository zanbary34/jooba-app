from flask import jsonify
import pytz
from datetime import datetime
from repositories.user_repository import UserRepository

class GuessService:
    def __init__(self, user_repository=None):
        self.user_repository = user_repository or UserRepository()

    def process_guess(self, username, country, guessed_time, current_time):
        """
        Validate the user's time guess for a given country.
        Stores the guess and returns the result.
        """

        if not username or not country or not guessed_time:
            return {"error": "User ID, Country, and time are required"}, 400

        try:
            user_id = UserRepository.get_user_by_username(username).id
            if not user_id:
                return {"error": "Invalid username"}, 400
            # Get timezone for the given country
            timezone = pytz.country_timezones.get(country.lower())
            if not timezone:
                return {"error": "Invalid country code"}, 400

            # Get the current time in the selected country
            country_timezone = pytz.timezone(timezone[0])
            country_time = datetime.now(country_timezone).strftime("%H:%M")

            # Determine result (Win "W" or Lose "L")
            result = "W" if guessed_time == country_time else "L"

            # Store the guess in the DB via UserRepository
            saved_guess = self.user_repository.save_guess(user_id, country, guessed_time, current_time, result)

            return {
                "user_id": saved_guess.user_id,
                "country": saved_guess.country,
                "guessed_time": saved_guess.guessed_time,
                "current_time": saved_guess.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                "result": saved_guess.result
            }

        except Exception as e:
            return {"error": str(e)}, 500
    
    def get_wins(self, username):
        user = UserRepository.get_user_by_username(username)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user": user.username,
            "guesses": [
                {
                    "guessed_time": g.guessed_time,
                    "country": g.country,
                    "timestamp": g.timestamp.strftime("%Y-%m-%d %H:%M:%S")  # ✅ Convert datetime to string
                } for g in user.guesses if g.result == 'W'
            ]
        })


