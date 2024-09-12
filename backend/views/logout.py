from flask import Blueprint, session, jsonify, redirect, url_for

logout = Blueprint('logout', __name__)

@logout.route('/logout', methods=['POST', 'GET'])
def logout_view():
    print(f"Session before logout: {session}")

    if 'admin_id' in session:
        session.pop('admin_id', None)
        print(f"Session after admin logout: {session}")
        return jsonify({'message': 'Admin logout successful'}), 200

    elif 'user_id' in session:
        session.pop('user_id', None)
        print(f"Session after logout: {session}")
        return jsonify({'message': 'Logout successful'}), 200
    
    else:
        return jsonify({'error': 'You are not logged in'}), 401
