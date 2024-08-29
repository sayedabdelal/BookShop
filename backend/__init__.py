from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import path

db = SQLAlchemy()
DB_NAME = 'database.db'

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = 'b1c7960dce797a332056f8347d56439b'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    
    db.init_app(app)

    from .views.login import login as login_blueprint
    from .views.register import register as register_blueprint
    from .views.logout import logout as logout_blueprint
    from .views.dashboard import dashboard as dashboard_blueprint
    from .views.home import home as home_blueprint

    app.register_blueprint(login_blueprint, url_prefix='/')
    app.register_blueprint(register_blueprint, url_prefix='/')
    app.register_blueprint(logout_blueprint, url_prefix='/')
    app.register_blueprint(dashboard_blueprint, url_prefix='/')
    app.register_blueprint(home_blueprint, url_prefix='/')

    # from models.user_model import User

    with app.app_context():
        db.create_all()

    return app
