from flask import Blueprint, request, jsonify, session
from backend import db
from backend.models.book import Book
from backend.models.wishlist import Wishlist
from backend.models.user import User

wishlist = Blueprint('wishlist', __name__)

@wishlist.route('/wishlist', methods=['GET'])
def get_wishlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    wishlist_items = Wishlist.query.filter_by(user_id=user_id).all()
    wishlist = [{'book_id': item.book_id} for item in wishlist_items]

    return jsonify({'wishlist': wishlist}), 200

@wishlist.route('/wishlist/add', methods=['POST'])
def wishlist_add():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    book_id = data.get('productId')
    if not book_id:
        return jsonify({'error': 'Book id is required'}), 400
    
    item = Wishlist.query.filter_by(user_id=user_id, book_id=book_id).first()
    if item:
        return jsonify({'message': 'Book is already in wishlist'}), 200
    
    new_item = Wishlist(user_id=user_id, book_id=book_id)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({'message': 'Book added to wishlist'}), 201


@wishlist.route('/wishlist/remove', methods=['DELETE'])
def wishlist_remove():
    if 'user_id' not in session:
        return jsonify({'error': 'not login'}), 401
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    book_id = data.get('productId')
    if not book_id:
        return jsonify({'error': 'Book id is required'}), 400

    item = Wishlist.query.filter_by(user_id=user_id, book_id=book_id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Book removed from wishlist'}), 200

    return jsonify({'error': 'Book not found in wishlist'}), 404
