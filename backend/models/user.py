from backend import db
import bcrypt
from uuid import uuid4

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
