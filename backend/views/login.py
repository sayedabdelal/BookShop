from flask import Blueprint, request, jsonify, session
from backend.models.user import User


login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def login_view():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'All fields are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        session.permanent = True
        session['user_id'] = user.id
        print(session)

        print(f"Session after login: {session}")
        response = jsonify({'message': 'Login successful!', 'user_id': user.id})
        return response, 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401



@login.route('/check-session', methods=['GET'])
def check_session():
    '''cehck for session is active or not'''
    print('arrive')
    print(session)
    if 'user_id' in session:
        print('yes')
        return jsonify({
            'isAuthenticated': True,
            'user_id': session.get('user_id')
            }), 200
    else:
        print('nooooo')
        return jsonify({'isAuthenticated': False}), 401