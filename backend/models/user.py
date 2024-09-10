from time import time
from uuid import uuid4
import bcrypt
import jwt
from flask import current_app
from backend import db


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    fname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    cart = db.relationship('Cart', back_populates='user', uselist=False)  # Use uselist=False for one-to-one

    def __init__(self, fname, email, password):
        self.fname = fname
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'fname': self.fname,
            'email': self.email,
            'cart': self.cart.to_dict() if self.cart else None
        }
    
    def get_reset_token(self, expires_in_sec=20):
        '''This method return token to reset password'''
        encoded_data = jwt.encode(
            {'user_id': self.id, 'expire': time() + expires_in_sec},
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )

        return encoded_data


    @staticmethod
    def verify_reset_token(token):
        '''This method verify the JWT token and return the user associated with it'''
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

        # User.query.get(user_id)
        return db.session.get(User, user_id)
