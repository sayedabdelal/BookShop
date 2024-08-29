from flask import Blueprint, request, jsonify
# from models.user_model import db, User
from backend import db
from backend.models.user import User
import bcrypt

register = Blueprint('register', __name__)


@register.route('/register', methods=['POST'])
def register_view():
    data = request.get_json()
    fname = data.get('name')
    email = data.get('email')
    password1 = data.get('password')
    
    if not fname or not email or not password1:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = bcrypt.hashpw(password1.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    new_user = User(fname=fname, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'Registration successful! You can now log in.'})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 201
