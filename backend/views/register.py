from flask import Blueprint, request, jsonify
from models.user_model import db, User
import bcrypt

register = Blueprint('register', __name__)

@register.route('/register', methods=['POST', 'GET'])
def register_view():
    data = request.form
    fname = data.get('name')
    email = data.get('email')
    password1 = data.get('password')
    
    if not fname or not email or not password1:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password1.encode('utf-8'), bcrypt.gensalt())
    
    new_user = User(fname=fname, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful! You can now log in.'}), 201
