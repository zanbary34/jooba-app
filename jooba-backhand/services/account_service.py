import bcrypt
from repositories.user_repository import UserRepository
from flask_jwt_extended import create_access_token

class AccountService:
    def __init__(self, user_repository=None):
        self.user_repository = user_repository or UserRepository()

    def register_user(self, data):
        username = data.get("username")
        password = data.get("password")

        if not username or len(username) < 3:
            return {"error": "Username must be at least 3 characters long"}, 400
        if not password or len(password) < 6:
            return {"error": "Password must be at least 6 characters long"}, 400

        if self.user_repository.get_user_by_username(username):
            return {"error": "Username already exists"}, 400

        password_hash, password_salt = self.hash_password(password)

        user = self.user_repository.create_user(username, password_hash, password_salt)
        return {"message": "User registered successfully", "user_id": user.id}, 201

    def login_user(self, data):
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"error": "Username and password are required"}, 400

        user = self.user_repository.get_user_by_username(username)
        if not user or not self.check_password(password, user.password_hash, user.password_salt):
            return {"error": "Invalid credentials"}, 401

        access_token = create_access_token(identity={"username": user.username})
        return {"access_token": access_token}, 200

    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8'), salt.decode('utf-8')

    def check_password(self, password, hashed_password, salt):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
