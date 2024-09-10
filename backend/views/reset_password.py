import bcrypt
from flask import Blueprint, request, jsonify
from backend.models.user import User
from backend import db


reset = Blueprint('reset', __name__)


@reset.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User does not exists'}), 404
    
    # Get new token for this user
    token = user.get_reset_token()

    # pass the token to the frontend
    return jsonify({
        'message': 'An email has been sent with instructions to reset your password',
        'reset_token': token
        })


@reset.route('/reset_password/<token>', methods=['POST'])
def reset_password_token(token):
    try:
        data = request.get_json()
        password = data.get('password')
        user = User.verify_reset_token(token)

        if not user:
            return jsonify({'error': 'Invalid or expired token!'}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        return jsonify({'message': 'Your password has been updated! You can now log in'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
