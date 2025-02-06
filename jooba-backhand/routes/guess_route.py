from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from services.guess_service import GuessService

guess_blueprint = Blueprint('guess', __name__)
api = Api(guess_blueprint)

guess_service = GuessService()

class ProcessGuess(Resource):
    def post(self):
        data = request.json
        user_name = data.get("user")
        country = data.get("country")
        guessed_time = data.get("time")
        timestamp = datetime.utcnow()

        return guess_service.process_guess(user_name, country, guessed_time, timestamp)
    
class GetWins(Resource):
    def get(self):
        username = request.args.get("username")

        if not username:
            return jsonify({"message": "Username is required"}), 400

        return guess_service.get_wins(username)

api.add_resource(ProcessGuess, "/guess")
api.add_resource(GetWins, "/wins")

