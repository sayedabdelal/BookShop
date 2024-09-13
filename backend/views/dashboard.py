from flask import Blueprint, jsonify, session
from backend.models.user import User

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard', methods=['GET'])
def dashboard_view():
    '''Retrieve user information for the dashboard.

    This route provides the logged-in user's details such as ID, name, and email.

    Returns:
        Response: 
            - **200 OK**: A JSON object containing the user data (ID, name, email) if the user is found.
            - **401 Unauthorized**: If the user is not logged in (no email in session).
            - **404 Not Found**: If no user is found with the email in the session.
    '''
    if 'email' in session:
        user = User.query.filter_by(email=session['email']).first()
        if user:
            user_data = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
            }
            return jsonify(user_data), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Unauthorized access'}), 401
