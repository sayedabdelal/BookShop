from flask import Blueprint, jsonify
from backend.models.book import Book

details = Blueprint('details', __name__)


@details.route('/api/details/<int:book_id>', methods=['GET'])
def get_details(book_id):
    '''Get data of book to show it'''
    book = Book.query.filter_by(id=book_id).first()

    if book:
        return jsonify(book.to_dict()), 200
    else:
        return jsonify({'message': 'Book does not exists'}), 404
