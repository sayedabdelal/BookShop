from flask import Blueprint, jsonify
from backend.models.book import Book

shop = Blueprint('shop', __name__)

@shop.route('/shop', methods=['GET'])
def shop_route():
    '''Retrieve a list of all books.

    This route fetches all books from the database, ordered by their ID in descending order.
    Each book's details are returned in the response.

    Returns:
        Response:
            - **200 OK**: Returns a JSON array of book objects with detailed information. Each object includes:
                - **id** (int): The unique identifier of the book.
                - **title** (str): The title of the book.
                - **author** (str): The author of the book.
                - **image** (str): The URL or path to the book's image.
                - **price** (float): The price of the book.
                - **discountPrice** (float): The discounted price of the book.
                - **description** (str): A brief description of the book.
                - **rating** (float): The rating of the book.
                - **stockQuantity** (int): The quantity of the book in stock.
                - **createdAt** (datetime): The date and time when the book was added to the database.
                - **updatedAt** (datetime): The date and time when the book details were last updated.
                - **category** (str): The name of the book's category.
                - **categoryId** (int): The unique identifier of the book's category.
    '''
    books = Book.query.order_by(Book.id.desc()).all()
    return jsonify([{
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "image": book.image,
        "price": book.price,
        "discountPrice": book.discountPrice,
        "description": book.description,
        "rating": book.rating,
        "stockQuantity": book.stock_quantity,
        "createdAt": book.created_at,
        "updatedAt": book.updated_at,
        "category": book.category.name if book.category else None,
        "categoryId": book.category_id
    } for book in books])
