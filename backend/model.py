from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()


class User(db.Model):
    """
    User model for storing user information.

    Attributes:
        id (int): The primary key for the user.
        fname (str): First name of the user.
        lname (str): Last name of the user.
        username (str): Unique username for the user.
        email (str): Unique email address for the user.
        password (str): Password hash for the user.
    """

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)  # Ensure password is not nullable

    def __init__(self, fname, lname, username, email, password):
        """
        Initialize a new user with hashed password.

        Args:
            fname (str): First name of the user.
            lname (str): Last name of the user.
            username (str): Username of the user.
            email (str): Email address of the user.
            password (str): Password of the user (will be hashed).
        """
        self.fname = fname
        self.lname = lname
        self.username = username
        self.email = email
        # Hash the password before storing it
        self.password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, password):
        """
        Check if the provided password matches the stored hashed password.

        Args:
            password (str): Password to be checked.

        Returns:
            bool: True if password matches, False otherwise.
        """
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))
