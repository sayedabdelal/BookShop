from flask import Blueprint, request, jsonify, session
from models.user_model import db, User

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST', 'GET'])
def login_view():
    if request.method == 'POST':
        data = request.form
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'All fields are required'}), 400
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['email'] = user.email
            return jsonify({'message': 'Login successful!'}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    return jsonify({'message': 'Please provide login credentials.'}), 200
