from backend import db, create_app
from datetime import datetime
import json

class Book(db.Model):
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

    # Change backref name to 'book_cart_items' to avoid conflict
    cart_items = db.relationship('CartItems', back_populates='book', cascade='all, delete-orphan')


    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', '{self.price}')"

    def to_dict(self):
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
    app = create_app()
    with app.app_context():
        with open('book_data.json', 'r') as file:
            data = json.load(file)

        # Clear existing data
        db.session.query(Book).delete()

        for item in data['books']:
            new_book = Book(
                title=item['title'],
                author=item['author'],
                image=item['image'],
                price=item['price'],
                discountPrice=item['discountPrice'],
                description=item['description'],
                rating=item['rating'],
                stock_quantity=item['stockQuantity'],
                created_at=datetime.strptime(item['createdAt'], '%Y-%m-%dT%H:%M:%S'),
                updated_at=datetime.strptime(item['updatedAt'], '%Y-%m-%dT%H:%M:%S'),
                category_id=item['categoryId']
            )
            db.session.add(new_book)
        db.session.commit()
