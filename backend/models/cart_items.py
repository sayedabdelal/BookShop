from backend import db
from uuid import uuid4

class CartItems(db.Model):
    '''CartItems model representing the items in a user's cart.
    
    Attributes:
        id (str): A unique identifier for the cart item, generated as a 32-character UUID.
        cart_id (str): Foreign key linking the cart item to a specific cart.
        user_id (int): Foreign key linking the cart item to a user.
        book_id (int): Foreign key linking the cart item to a book.
        quantity (int): The quantity of the book added to the cart, with a default value of 1.
        cart (relationship): A relationship to the Cart model, establishing the link to the associated cart.
        book (relationship): A relationship to the Book model, linking the cart item to a specific book.
    '''

    __tablename__ = 'cart_items'
    id = db.Column(db.String(32), primary_key=True, default=lambda: uuid4().hex)
    cart_id = db.Column(db.String(32), db.ForeignKey('cart.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    cart = db.relationship('Cart', back_populates='items')
    book = db.relationship('Book', back_populates='cart_items')

    def __init__(self, quantity, cart_id, user_id, book_id):
        '''Initializes a CartItems instance with the provided quantity, cart_id, user_id, and book_id.
        
        Args:
            quantity (int): The quantity of the book being added to the cart.
            cart_id (str): The unique identifier for the cart to which the item is added.
            user_id (int): The unique identifier for the user adding the item.
            book_id (int): The unique identifier for the book being added.
        '''
        self.quantity = quantity
        self.cart_id = cart_id
        self.user_id = user_id
        self.book_id = book_id

    def to_dict(self):
        '''Converts the CartItems object into a dictionary format.
        
        Returns:
            dict: A dictionary representation of the cart item's attributes, 
                including the associated book's details if available.
        '''
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'quantity': self.quantity,
            'book': self.book.to_dict() if self.book else None
        }
