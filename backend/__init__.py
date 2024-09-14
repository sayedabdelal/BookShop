import os
from dotenv import load_dotenv
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()
session = Session()

# Load environment variables from the .env file
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE')
    app.config['SESSION_COOKIE_SAMESITE'] = os.getenv('SESSION_COOKIE_SAMESITE')
    app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=int(os.getenv('PSLT')))

    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  #! Allow HTTP requests, not HTTPS

    session.init_app(app)
    db.init_app(app)

    from .views.login import login as login_blueprint
    from .views.register import register as register_blueprint
    from .views.logout import logout as logout_blueprint
    from .views.dashboard import dashboard as dashboard_blueprint
    from .views.home import home as home_blueprint
    from .views.cart import cart as cart_blueprint
    from .views.book import book as book_blueprint
    from .views.category import category as category_blueprint
    from .views.cart_items import cart_items as cart_items_blueprint
    from .views.shop import shop as shop_blueprint
    from .views.wishlist import wishlist as wishlist_blueprint
    from .views.details import details as details_blueprint
    from .views.reset_password import reset as reset_blueprint
    from .views.admin import admin as admin_blueprint

    app.register_blueprint(login_blueprint, url_prefix='/')
    app.register_blueprint(register_blueprint, url_prefix='/')
    app.register_blueprint(logout_blueprint, url_prefix='/')
    app.register_blueprint(dashboard_blueprint, url_prefix='/')
    app.register_blueprint(home_blueprint, url_prefix='/')
    app.register_blueprint(cart_blueprint, url_prefix='/')
    app.register_blueprint(book_blueprint, url_prefix='/')
    app.register_blueprint(category_blueprint, url_prefix='/')
    app.register_blueprint(cart_items_blueprint, url_prefix='/')
    app.register_blueprint(shop_blueprint, url_prefix='/')
    app.register_blueprint(wishlist_blueprint, url_prefix='/')
    app.register_blueprint(details_blueprint, url_prefix='/')
    app.register_blueprint(reset_blueprint, url_prefix='/')
    app.register_blueprint(admin_blueprint, url_prefix='/')

    with app.app_context():
        db.create_all()
        
    return app
