from flask import Blueprint, request
from flask_restful import Api, Resource
from db_context import db
from services.account_service import AccountService

account_blueprint = Blueprint('api', __name__)
api = Api(account_blueprint)

account_service = AccountService()

class Signup(Resource):
    def post(self):
        print(request.data)
        data = request.json
        return account_service.register_user(data)

class Login(Resource):
    def post(self):
        data = request.json
        return account_service.login_user(data)
    
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
