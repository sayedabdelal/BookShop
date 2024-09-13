from time import time
from uuid import uuid4
import bcrypt
import jwt
from flask import current_app
from backend import db


class User(db.Model):
    '''User model representing a registered user.
    
    Attributes:
        id (str): A unique identifier for the user, generated as a 32-character UUID.
        fname (str): The user's first name.
        email (str): The user's email address, which must be unique.
        password (str): The user's hashed password, stored as a bcrypt hash.
        cart (relationship): A one-to-one relationship with the Cart model, representing the user's shopping cart.
    '''

    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    fname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    cart = db.relationship('Cart', back_populates='user', uselist=False)  # Use uselist=False for one-to-one

    def __init__(self, fname, email, password):
        '''Initializes a User instance with the provided first name, email, and password.
        
        Args:
            fname (str): The user's first name.
            email (str): The user's email address.
            password (str): The user's raw password, which is hashed using bcrypt before being stored.
        '''
        self.fname = fname
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        '''Checks if the provided password matches the stored hashed password.
        
        Args:
            password (str): The raw password to be checked.
        
        Returns:
            bool: True if the password matches, False otherwise.
        '''
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def to_dict(self):
        '''Converts the User object into a dictionary format.
        
        Returns:
            dict: A dictionary representation of the user's attributes, including the cart (if available).
        '''
        return {
            'id': self.id,
            'fname': self.fname,
            'email': self.email,
            'cart': self.cart.to_dict() if self.cart else None
        }
    
    def get_reset_token(self, expires_in_sec=600):
        '''Generates a JWT token for resetting the user's password.
        
        Args:
            expires_in_sec (int): The expiration time of the token in seconds. Defaults to 600 seconds.
        
        Returns:
            str: A JWT token that encodes the user's ID and an expiration timestamp.
        '''
        encoded_data = jwt.encode(
            {'user_id': self.id, 'expire': time() + expires_in_sec},
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )

        return encoded_data

    @staticmethod
    def verify_reset_token(token):
        '''Verifies the JWT token and retrieves the user associated with it.
        
        Args:
            token (str): The JWT token to verify.
        
        Returns:
            User or None: The User object if the token is valid and not expired, otherwise None.
        '''
        try:
            decoded_data = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )
            user_id = decoded_data['user_id']
            expiration = decoded_data['expire']

            if expiration < time():
                print('Token expired')
                return None

        except Exception:
            print('Token expired or invalid')
            return None

        return db.session.get(User, user_id)
