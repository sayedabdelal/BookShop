from flask import Blueprint, jsonify

home = Blueprint('home', __name__)

@home.route('/')
def index():
    data = {'message': 'Welcome to the home page!',}
    return jsonify(data), 200
