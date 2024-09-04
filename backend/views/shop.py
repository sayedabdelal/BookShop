from flask import Blueprint, jsonify
from backend.models.book import Book

shop = Blueprint('shop', __name__)

@shop.route('/shop', methods=['GET'])
def shop_route():
    books = Book.query.all()
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
