from backend import db
from datetime import datetime


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

    def _repr_(self):
        return f"Book('{self.title}', '{self.author}', '{self.price}')"

    def to_dict(self):
        to_dict =  {
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
            "category": self.category.name,
            "categoryId": self.category_id
        }
        return to_dict


