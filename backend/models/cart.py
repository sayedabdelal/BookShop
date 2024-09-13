from backend import db
from sqlalchemy.sql import func
from uuid import uuid4

class Cart(db.Model):
    '''Cart model representing a user's shopping cart.
    
    Attributes:
        id (str): A unique identifier for the cart, generated as a 32-character UUID.
        user_id (str): Foreign key linking the cart to a specific user.
        total_price (float): The total price of all items in the cart. Defaults to 0.
        status (str): The current status of the cart (e.g., 'active'). Defaults to 'active'.
        created_at (datetime): The timestamp when the cart was created. Defaults to the current time.
        updated_at (datetime): The timestamp when the cart was last updated. Updates automatically.
        user (relationship): A relationship to the User model, linking the cart to its owner.
        items (relationship): A relationship to the CartItems model, representing the items in the cart.
    '''

    __tablename__ = 'cart'
    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)  # Ensure type matches User id
    total_price = db.Column(db.Float, nullable=False, default=0)
    status = db.Column(db.String(30), nullable=False, default='active')
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    
    user = db.relationship('User', back_populates='cart')
    items = db.relationship('CartItems', back_populates='cart', lazy=True, cascade='all, delete-orphan')

    def __init__(self, total_price, status, user_id):
        '''Initializes a Cart instance with the provided total price, status, and user_id.
        
        Args:
            total_price (float): The total price of items in the cart.
            status (str): The current status of the cart (e.g., 'active', 'completed').
            user_id (str): The unique identifier of the user who owns the cart.
        '''
        self.total_price = total_price
        self.status = status
        self.user_id = user_id

    def to_dict(self):
        '''Converts the Cart object into a dictionary format.
        
        Returns:
            dict: A dictionary representation of the cart's attributes, including the items in the cart.
        '''
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'items': [item.to_dict() for item in self.items]
        }
