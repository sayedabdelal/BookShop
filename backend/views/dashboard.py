from flask import Blueprint, jsonify, session
from backend.models.user import User


dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard', methods=['GET'])
def dashboard_view():
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
