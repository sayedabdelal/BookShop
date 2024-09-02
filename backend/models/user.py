from backend import db
import bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    carts = db.relationship('Cart', back_populates='user', lazy=True)  # Use back_populates here

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
            'carts': [{'id': cart.id, 'total_price': cart.total_price} for cart in self.carts]
        }
