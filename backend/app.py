from flask import Flask
from models.user_model import db
from views.login import login as login_blueprint
from views.register import register as register_blueprint
from views.logout import logout as logout_blueprint
from views.dashboard import dashboard as dashboard_blueprint
from views.home import home as home_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your_secret_key'

db.init_app(app)

app.register_blueprint(login_blueprint, url_prefix='/')
app.register_blueprint(register_blueprint, url_prefix='/')
app.register_blueprint(logout_blueprint, url_prefix='/')
app.register_blueprint(dashboard_blueprint, url_prefix='/')
app.register_blueprint(home_blueprint, url_prefix='/')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
