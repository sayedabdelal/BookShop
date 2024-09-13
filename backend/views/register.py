from flask import Blueprint, request, jsonify
from backend import db
from backend.models.user import User

register = Blueprint('register', __name__)

@register.route('/register', methods=['POST'])
def register_view():
    '''Register a new user.

    This route handles the registration of a new user. It requires a name, 
    email, and password. If the email is already registered, it returns an 
    error. Otherwise, it creates a new user record in the database.

    JSON Body:
        - **name** (str): The full name of the user.
        - **email** (str): The email address of the user.
        - **password** (str): The password for the user account.

    Returns:
        Response:
            - **201 Created**: If registration is successful, returns a JSON object with a success message.
            - **400 Bad Request**: If any field is missing or the email is already registered.
    '''
    data = request.get_json()
    fname = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if not fname or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    new_user = User(fname=fname, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'Registration successful! You can now log in.'})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 201
