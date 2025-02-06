from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from db_context import db
from routes.account_route import account_blueprint
from routes.guess_route import guess_blueprint

app = Flask(__name__)

CORS(app)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()


app.register_blueprint(account_blueprint)
app.register_blueprint(guess_blueprint)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
