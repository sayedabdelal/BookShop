from backend import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.String(500))
    books = db.relationship('Book', backref='category', lazy=True)

    def _repr_(self):
        return f"Category('{self.name}', '{self.description}')"

    def to_dict(self):
        category_dict =  {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "books": [book.to_dict() for book in self.books]
        }
        return category_dict
