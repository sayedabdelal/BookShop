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
        print(session)

        if user.email == 'admin@gmail.com':
            session['admin_id'] = user.id
            person = 'admin'
            personId = '208634126028967943186493182004377585117'
        else:
            session['user_id'] = user.id
            person = 'user_id'
            personId = user.id

        print(f"Session after login: {session}")
        response = jsonify({'message': 'Login successful!', person: personId})
        return response, 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@login.route('/check-session', methods=['GET'])
def check_session():
    '''cehck for session is active or not'''
    if 'admin_id' in session:
        return jsonify({
            'isAuthenticated': True,
            'isAdmin': True,
            'admin_id': session.get('admin_id')
        }), 200

    if 'user_id' in session:
        return jsonify({
            'isAuthenticated': True,
            'user_id': session.get('user_id')
            }), 200
    else:
        return jsonify({'isAuthenticated': False}), 401
