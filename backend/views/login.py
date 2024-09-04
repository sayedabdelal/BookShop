from flask import Blueprint, request, jsonify, session
# from models.user_model import db, User
from backend import db
from backend.models.user import User


login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def login_view():
    if request.method == 'POST':
        data = request.get_json()  # Use get_json() for JSON payload
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'All fields are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            return jsonify({'message': 'Login successful!'}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    return jsonify({'message': 'Please provide login credentials.'}), 400
