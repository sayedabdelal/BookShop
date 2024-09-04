from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import path

db = SQLAlchemy()
DB_NAME = 'database.db'

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['SECRET_KEY'] = 'b1c7960dce797a332056f8347d56439b'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
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

    with app.app_context():
        db.create_all()

    return app
