from flask import Blueprint, request, jsonify, session
from flask_mail import Message
import bcrypt
from backend.models.user import User
from backend import mail, db


reset = Blueprint('reset', __name__)


# def send_email_to_reset(user):
#     token = user.get_reset_token()

#     msg = Message(
#         'Password Reset Request',
#         sender='noreply@demo.com',
#         recipients=[user.email]
#     )

#     msg.body = f'''To set your password, visit the following link:
# {url_for('reset_token', token=token, _external=True)}

# If you did not make this request simply ignore this email and no changes will be made.
# '''
#     mail.send(msg)

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

@reset.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password_token(token):
    data = request.get_json()
    password = data.get('password')
    user = User.verify_reset_token(token)
    if not user:
        return jsonify({'Error: Invalid or expired token!'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password = hashed_password
    db.session.commit()
    return jsonify({'message': 'Your password has been updated! You are now able to log in'})
