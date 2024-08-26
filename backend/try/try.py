from flask import Flask, request, render_template, redirect, session, jsonify
from models.user_model import db, User
import bcrypt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SECRET_KEY"] = "your_secret_key"

# Initialize the database with the Flask application
db.init_app(app)


@app.route("/register", methods=["POST", "GET"])
def register():
    """
    Handles user registration.

    Expects JSON data with the following fields:
    - fname: First name of the user
    - lname: Last name of the user
    - email: Email address of the user
    - username: Username of the user
    - password1: Password of the user
    - password2: Confirm password

    Validates the data, checks for existing users, and creates a new user.
    Returns a JSON response indicating success or the nature of the error.
    """
    data = request.get_json()
    fname = data.get("fname")
    lname = data.get("lname")
    email = data.get("email")
    username = data.get("username")
    password1 = data.get("password1")
    password2 = data.get("password2")

    # Ensure none of the fields are empty
    if not fname or not lname or not email or not username or not password1:
        return jsonify({"error": "All fields are required!"}), 400

    # Ensure passwords match
    if password1 != password2:
        return jsonify({"error": "Passwords do not match!"}), 400

    # Check if email already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "Email already registered!"}), 400

    # Check if username already exists
    username = User.query.filter_by(username=username).first()
    if username:
        return jsonify({"error": "Username already taken!"}), 400

    # Hash password and create a new user
    new_user = User(
        fname=fname, lname=lname, username=username, email=email, password=password1
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful! You can now log in."}), 201


@app.route("/login", methods=["POST", "GET"])
def login():
    """
    Handles user login.

    Expects JSON data with the following fields:
    - email: Email address of the user
    - password: Password of the user

    Validates the credentials and sets a session for the logged-in user.
    Returns a JSON response with a success message and redirect URL or an error message.
    """
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        session["email"] = user.email
        return (
            jsonify({"message": "Login successful"}),
            200,
        )
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route("/dashboard", methods=["GET"])
def dashboard():
    """
    Retrieves user data for the logged-in user.

    Checks if the user is logged in by verifying the session.
    Returns user data as JSON if the user is logged in, otherwise returns an unauthorized error.
    """
    if "email" in session:
        user = User.query.filter_by(email=session["email"]).first()
        if user:
            # Return user data as JSON
            return (
                jsonify(
                    {
                        "success": True,
                        "user": {
                            "fname": user.fname,
                            "lname": user.lname,
                            "username": user.username,
                            "email": user.email,
                        },
                    }
                ),
                200,
            )

    return jsonify({"error": "Unauthorized access"}), 401


@app.route("/logout", methods=["POST"])
def logout():
    """
    Logs out the current user.

    Removes the user from the session and returns a JSON response indicating success.
    Returns an error if no user is logged in.
    """
    if "email" in session:
        session.pop("email", None)
        return jsonify({"message": "Logout successful"}), 200
    return jsonify({"error": "No user logged in"}), 400


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
