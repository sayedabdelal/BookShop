from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = 'database.db'

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['SECRET_KEY'] = 'dd1f3185a968df717b4deb6d45ba46ce2cdd67c198c0741f1b768token'
    
    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        from .User_Models import User  # Import here to avoid circular import
        return User.query.get(int(user_id))

    
    CORS(app)
    db.init_app(app)

    Create_database(app)

    return app

def Create_database(app):
    if not path.exists(DB_NAME):
        with app.app_context():
            db.create_all()
        print('Database created successfully!')
