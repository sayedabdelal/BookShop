import bcrypt
from flask import Blueprint, request, jsonify
from flask_mail import Message
from backend.models.user import User
from backend import db, mail


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
    reset_link = f'http://localhost:5173/forgot-password/{token}'
    html_content = f"""
    <html>
    <head>
    <style>
    body {{ font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }}
    .container {{ width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
    h2 {{ color: #333; }}
    p {{ font-size: 16px; color: #555; }}
    a.button {{ display: inline-block; padding: 12px 25px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px; }} 
    a.button:hover {{ background-color: #0056b3; }}
    .footer {{ margin-top: 20px; font-size: 14px; color: #777; }}
    </style>
    </head>
    <body>
    <div class="container">
    <h2>Password Reset Request</h2>
    <p>Dear {user.email},</p>
    <p>We received a request to reset your password on <strong>BookCorner</strong>. If you requested this change, please click the button below to reset your password:</p>
    <p><a href="{reset_link}" class="button">Reset Password</a></p>
    <p style="font-size: 14px; color: #555;">This link will expire in 10 minutes.</p>
    <p>If you did not request a password reset, please ignore this email. Your password will not be changed.</p>
    <div class="footer">
    <p>Thank you,<br>The BookCorner Team</p>
    <p>For any assistance, please contact us at <a href="mailto:support@bookcorner.com">support@bookcorner.com</a></p>
    </div>
    </div>
    </body>
    </html>
    """

    msg = Message(
        subject='Password Reset Request',
        recipients=[email],
        html=html_content
    )

    mail.send(msg)

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
