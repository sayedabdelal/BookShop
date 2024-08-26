from flask import Blueprint, session, jsonify, redirect, url_for

logout = Blueprint('logout', __name__)

@logout.route('/logout', methods=['POST', 'GET'])
def logout_view():
    if 'email' in session:
        session.pop('email', None)
        return jsonify({'message': 'Logout successful'}), 200
    else:
        return jsonify({'error': 'You are not logged in'}), 401
