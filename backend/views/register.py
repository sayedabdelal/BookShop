from flask import Blueprint, request, jsonify
from backend import db
from backend.models.user import User

register = Blueprint('register', __name__)


@register.route('/register', methods=['POST'])
def register_view():
    data = request.get_json()
    fname = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if not fname or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    new_user = User(fname=fname, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'Registration successful! You can now log in.'})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 201
