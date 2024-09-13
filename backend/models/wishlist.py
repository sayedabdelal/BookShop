from backend import db

class Wishlist(db.Model):
    '''Wishlist model representing a user's wishlist item.
    
    Attributes:
        id (int): The unique identifier for the wishlist item.
        user_id (int): Foreign key linking the wishlist item to a specific user.
        book_id (int): Foreign key linking the wishlist item to a specific book.
        book (relationship): A relationship to the Book model, representing the book in the wishlist.
    '''

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    book = db.relationship('Book', backref='wishlist_item')

    def to_dict(self):
        '''Converts the Wishlist object into a dictionary format.
        
        Returns:
            dict: A dictionary representation of the wishlist item's attributes, including the book details.
        '''
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'book': self.book.to_dict() if self.book else None  # Includes book details if available
        }
