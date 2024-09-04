from backend import db
from sqlalchemy.sql import func
from uuid import uuid4

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)  # Ensure type matches User id
    total_price = db.Column(db.Float, nullable=False, default=0)
    status = db.Column(db.String(30), nullable=False, default='active')
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    
    user = db.relationship('User', back_populates='cart')
    items = db.relationship('CartItems', back_populates='cart', lazy=True)

    def __init__(self, total_price, status, user_id):
        self.total_price = total_price
        self.status = status
        self.user_id = user_id

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'items': [item.to_dict() for item in self.items]
        }
