from backend import db

class Category(db.Model):
    '''Category model representing a book category.
    Attributes:
        id (int): The unique identifier for the category.
        name (str): The name of the category (e.g., Fiction, Non-fiction).
        description (str): A brief description of the category.
        books (relationship): A relationship to the Book model, representing the books that belong to this category.
    '''

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.String(500))
    books = db.relationship('Book', backref='category', lazy=True)

    def _repr_(self):
        '''Provides a string representation of the Category instance.
        Returns:
            str: A string displaying the category name and description.
        '''
        return f"Category('{self.name}', '{self.description}')"

    def to_dict(self):
        '''Converts the Category object into a dictionary format.
        Returns:
            dict: A dictionary representation of the category's attributes, including the books in the category.
        '''
        category_dict = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "books": [book.to_dict() for book in self.books]  # Includes details of books in the category
        }
        return category_dict
