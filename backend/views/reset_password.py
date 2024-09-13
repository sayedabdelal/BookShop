import bcrypt
from flask import Blueprint, request, jsonify
from backend.models.user import User
from backend import db

reset = Blueprint('reset', __name__)

@reset.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    '''Request a password reset token.

    This route allows users to request a password reset by providing their email address.
    If the email address is associated with a user, a reset token is generated and sent 
    back in the response.

    JSON Body:
        - **email** (str): The email address of the user requesting the password reset.

    Returns:
        Response:
            - **200 OK**: If the request is successful, returns a JSON object with a success message and the reset token.
            - **404 Not Found**: If no user is found with the provided email.
    '''
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User does not exist'}), 404
    
    # Get new token for this user
    token = user.get_reset_token()

    # Pass the token to the frontend
    return jsonify({
        'message': 'An email has been sent with instructions to reset your password',
        'reset_token': token
    })

@reset.route('/reset_password/<token>', methods=['POST'])
def reset_password_token(token):
    '''Reset the user's password using a reset token.

    This route allows users to reset their password using a token received from the
    password reset request. The new password is hashed and saved in the database.

    Args:
        token (str): The reset token received from the password reset request.

    JSON Body:
        - **password** (str): The new password for the user account.

    Returns:
        Response:
            - **200 OK**: If the password is successfully updated, returns a JSON object with a success message.
            - **400 Bad Request**: If the token is invalid or expired.
            - **500 Internal Server Error**: If an unexpected error occurs during the process.
    '''
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
