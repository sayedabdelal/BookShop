from flask import Blueprint, request, jsonify, session
from backend.models.user import User
from backend import db

import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def login_view():
    '''Authenticate a user and establish a session.

    This route allows users to log in by providing their email and password. 
    On successful login, the user is assigned to a session, and a response 
    is returned indicating whether the login was successful or not.

    JSON Body:
        email (str): The email address of the user.
        password (str): The password of the user.

    Returns:
        Response:
            - **200 OK**: If login is successful, returns a JSON object with a success message and user or admin ID.
            - **400 Bad Request**: If any of the required fields (email or password) are missing.
            - **401 Unauthorized**: If the email or password is incorrect.
    '''
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        print(session)

        if user.email == 'admin@gmail.com':
            session['admin_id'] = user.id
            person = 'admin'
            personId = '208634126028967943186493182004377585117'
        else:
            session['user_id'] = user.id
            person = 'user_id'
            personId = user.id

        print(f"Session after login: {session}")
        response = jsonify({'message': 'Login successful!', person: personId})
        return response, 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@login.route('/check-session', methods=['GET'])
def check_session():
    '''Check if the session is active.

    This route verifies if the current session is active and whether the user 
    is authenticated as an admin or a regular user.

    Returns:
        Response:
            - **200 OK**: If a session is active, returns a JSON object with authentication status and user or admin ID.
            - **401 Unauthorized**: If no session is active.
    '''
    if 'admin_id' in session:
        return jsonify({
            'isAuthenticated': True,
            'isAdmin': True,
            'admin_id': session.get('admin_id')
        }), 200

    if 'user_id' in session:
        return jsonify({
            'isAuthenticated': True,
            'user_id': session.get('user_id')
            }), 200
    else:
        return jsonify({'isAuthenticated': False}), 401


#todo login by google

GOOGLE_CLIENT_ID = "492815053989-css65qnm2e4r9k4ek3s3qndl2fk15r3t.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "../client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)   

@login.route('/oauth-login', methods=['POST','GET'])
def oauth_login():
    '''Initiate Google OAuth login'''
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return jsonify({'authorization_url': authorization_url}), 200


@login.route("/callback", methods=['GET'])
def callback():
    '''Handle Google OAuth callback'''
    state_from_request = request.args.get("state")
    if session.get("state") != state_from_request:
        return jsonify({'error': 'CSRF Warning! State not equal in request and response.'}), 500

    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"] = id_info.get("email")
    session["picture"] = id_info.get("picture")

    # Check if user exists in your database
    user = User.query.filter_by(email=id_info.get("email")).first()
    if not user:
        # Create a new user in the database
        new_user = User(fname=id_info.get("name"), email=id_info.get("email"), password="")
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
    else:
        session['user_id'] = user.id

    return jsonify({
        'message': 'Google OAuth login successful!',
        'google_id': session["google_id"],
        'user_id': session.get('user_id'),
        'name': session["name"],
        'picture': session["picture"]
    }), 200
