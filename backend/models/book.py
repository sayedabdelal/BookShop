from backend import db, create_app
from datetime import datetime
import json

class Book(db.Model):
    '''Book model representing a book in the database.
    
    Attributes:
        id (int): The primary key of the book.
        title (str): The title of the book (maximum 255 characters).
        author (str): The author of the book (maximum 45 characters).
        image (str): The file name of the book's image. Defaults to 'default.jpg'.
        price (float): The price of the book.
        discountPrice (float): The discounted price of the book, if applicable.
        description (str): A detailed description of the book (maximum 1000 characters).
        rating (float): The rating of the book, which can be a floating-point number.
        stock_quantity (int): The number of books available in stock.
        created_at (datetime): The timestamp when the book record was created. Defaults to the current time.
        updated_at (datetime): The timestamp when the book record was last updated. Updates automatically.
        category_id (int): Foreign key that links the book to a category.
        cart_items (relationship): A relationship to the CartItems model, used to manage items in the cart.
    '''

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(45), nullable=False)
    image = db.Column(db.String(20), default='default.jpg')
    price = db.Column(db.Float, nullable=False)
    discountPrice = db.Column(db.Float)
    description = db.Column(db.String(1000), nullable=False)
    rating = db.Column(db.Float)
    stock_quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    ''' Change backref name to 'book_cart_items' to avoid conflict '''
    cart_items = db.relationship('CartItems', back_populates='book', cascade='all, delete-orphan')

    def __repr__(self):
        '''Returns a string representation of the Book object.'''
        return f"Book('{self.title}', '{self.author}', '{self.price}')"

    def to_dict(self):
        '''Converts the Book object into a dictionary format.
        
        Returns:
            dict: A dictionary representation of the book's attributes.
        '''
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "image": self.image,
            "price": self.price,
            "discountPrice": self.discountPrice,
            "description": self.description,
            "rating": self.rating,
            "stockQuantity": self.stock_quantity,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "category": self.category.name if self.category else None,
            "categoryId": self.category_id
        }


def load_book_data():
    '''Loads book data from a JSON file into the database.
    
    This function deletes existing book records in the database and populates
    the database with new book data from a JSON file located at 'backend/book_data.json'.
    '''
    app = create_app()
    with app.app_context():
        ''' Open and read the book data JSON file '''
        with open('backend/book_data.json', 'r', encoding='utf-8') as file:
            data = json.load(file)

        ''' Clear existing book records from the database '''
        db.session.query(Book).delete()

        ''' Iterate through the book data and insert new records into the database '''
        for item in data['books']:
            new_book = Book(
                title=item['title'],
                author=item['author'],
                image=item['image'],
                price=item['price'],
                discountPrice=item['discountPrice'] if 'discountPrice' in item else None,
                description=item['description'],
                rating=item['rating'],
                stock_quantity=item['stockQuantity'],
                created_at=datetime.strptime(item['createdAt'], '%Y-%m-%dT%H:%M:%S'),
                updated_at=datetime.strptime(item['updatedAt'], '%Y-%m-%dT%H:%M:%S'),
                category_id=item['categoryId']
            )
            db.session.add(new_book)
        db.session.commit()
