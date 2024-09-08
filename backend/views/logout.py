from flask import Blueprint, session, jsonify, redirect, url_for

logout = Blueprint('logout', __name__)

@logout.route('/logout', methods=['POST', 'GET'])
def logout_view():
    print(f"Session before logout: {session}")
    if 'user_id' in session:
        session.pop('user_id', None)
        print(f"Session after logout: {session}")
        return jsonify({'message': 'Logout successful'}), 200
    else:
        return jsonify({'error': 'You are not logged in'}), 401
