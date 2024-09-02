from backend import db
from sqlalchemy.sql import func
from uuid import uuid4



class CartItems(db.Model):
    __tablename__ = 'CartItems'
    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    cart_id = db.Column(db.String(32), db.ForeignKey('cart.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    book = db.relationship('Book', backref='cart_items', lazy=True)

    def __init__(self, quantity, cart_id, user_id, book_id):
        self.quantity = quantity
        self.cart_id = cart_id
        self.user_id = user_id
        self.book_id = book_id

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'quantity': self.quantity,
            'book': self.book.to_dict() if self.book else None
        }
