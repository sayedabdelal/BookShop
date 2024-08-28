from flask import Blueprint, request, jsonify
from models.user_model import db, User

register = Blueprint('register', __name__)

@register.route('/register', methods=['POST', 'GET'])
def register_view():
    data = request.form
    fname = data.get('fname')
    lname = data.get('lname')
    username = data.get('username')
    email = data.get('email')
    password1 = data.get('password1')
    password2 = data.get('password2')

    if not fname or not lname or not username or not email or not password1 or not password2:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already taken'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    if password1 != password2:
        return jsonify({'error': 'Passwords do not match'}), 400

    new_user = User(fname=fname, lname=lname, username=username, email=email, password=password1)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful! You can now log in.'}), 201
