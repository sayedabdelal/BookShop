from flask import Blueprint, request, jsonify
from backend import db
from ..models.book import Book

book = Blueprint('book', __name__)

@book.route('/book/<int:id>', methods=['GET'])
def get_book(id):
    '''Retrieve a book by its ID.

    Args:
        id (int): The ID of the book to retrieve.

    Returns:
        Response: A JSON object containing the book details if found, or a "Book not found" message with status code 404 if not found.
    '''
    book = Book.query.get(id)
    if book:
        return jsonify({"book": book.to_dict()}), 200
    else:
        return jsonify({"message": "Book not found"}), 404

# @book.route('/book/<string:title>', methods=['GET'])
# def get_book_with_title(title):
#     '''Retrieve a book by its title.
# 
#     Args:
#         title (str): The title of the book to retrieve.
# 
#     Returns:
#         Response: A JSON object containing the book details if found, or a "Book not found" message with status code 404 if not found.
#     '''
#     book = Book.query.filter_by(title=title).first()
#     if book:
#         return jsonify({"book": book.to_dict()}), 200
#     else:
#         return jsonify({"message": "Book not found"}), 404

@book.route('/product', methods=['POST'])
def create_book():
    '''Create a new book entry.

    This endpoint parses the JSON data from the request, validates the data, and creates a new book record in the database.

    Returns:
        Response: A JSON object with a success message and the details of the created book. Status code 201 on success. If required fields are missing, returns an error message with status code 400.
    '''
    data = request.get_json()
    print(data)
    # Validate the data
    if not all(key in data for key in ['title', 'author', 'price', 'description']):
        return jsonify({"error": "Missing required fields"}), 400
    # Create a new Book instance
    new_book = Book(
        title=data['title'],
        author=data['author'],
        image=data.get('img', 'default.jpg'),
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

@book.route('/products/<int:book_id>', methods=["DELETE"])
def delete_book(book_id):
    '''Delete a book by its ID.

    Args:
        book_id (int): The ID of the book to delete.

    Returns:
        Response: A JSON object with a success message if the book is deleted. Status code 200 on success. If the book is not found, returns an error message with status code 404.
    '''
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    else:
        db.session.delete(book)
        db.session.commit()
        return jsonify({"message": "Book deleted successfully"}), 200

@book.route('/book', methods=['DELETE'])
def delete_all_book():
    '''Delete all books from the database.

    Returns:
        Response: A JSON object with a success message indicating that all books have been deleted. Status code 200. If no books are found, returns an error message with status code 404.
    '''
    books = Book.query.all()
    if not books:
        return jsonify({"error": "Books not found"}), 404
    for book in books:
        db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "All books deleted successfully"}), 200
