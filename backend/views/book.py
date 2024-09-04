from flask import Blueprint, request, jsonify
from backend import db, create_app
from ..models.book import Book

book = Blueprint('book', __name__)

@book.route('/book/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get(id)
    if book:
        return jsonify({"book": book.to_dict()}), 200
    else:
        return jsonify({"message": "Book not found"}), 404

# @book.route('/book/<string:title>', methods=['GET'])
# def get_book_with_title(title):
#     book = Book.query.filter_by(title=title).first()
#     if book:
#         return jsonify({"book": book.to_dict()}), 200
#     else:
#         return jsonify({"message": "Book not found"}), 404

@book.route('/book', methods=['POST'])
def create_book():
    # Parse the JSON data from the request
    data = request.get_json()
    # Validate the data
    if not all(key in data for key in ['title', 'author', 'price', 'description']):
        return jsonify({"error": "Missing required fields"}), 400
    # Create a new Book instance
    new_book = Book(
        title=data['title'],
        author=data['author'],
        image=data.get('image', 'default.jpg'),
        price=data['price'],
        discountPrice=data.get('discountPrice'),
        description=data['description'],
        rating=data.get('rating'),
        stock_quantity=data.get('stock_quantity', 0),
        category_id=data.get('category_id')
    )
    
    # Add the book to the database
    db.session.add(new_book)
    db.session.commit()
    
    # Return a success response
    return jsonify({"message": "Book created successfully", "book": new_book.to_dict()}), 201

@book.route('/book/<int:book_id>', methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"})
    else:
        db.session.delete(book)
        db.session.commit()
        return jsonify({"message": "Book deleted successfully"}), 200

@book.route('/book', methods=['DELETE'])
def delete_all_book():
    books = Book.query.all()
    if not books:
        return jsonify({"error": "Books not found"})
    for book in books:
        db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "All books deleted successfully"}), 200
