from flask import Blueprint, request, jsonify, session
from backend import db
from backend.models.book import Book
from backend.models.wishlist import Wishlist
from backend.models.user import User

wishlist = Blueprint('wishlist', __name__)

@wishlist.route('/wishlist', methods=['GET'])
def get_wishlist():
    # user_id = session.get('user_id')
    user_id = request.args.get('user_id')
    print(user_id)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    wishlist_items = Wishlist.query.filter_by(user_id=user_id).all()
    if wishlist_items:
        wishlist = [item.to_dict() for item in wishlist_items]  # Assuming Wishlist model has a `to_dict` method
        print(wishlist)
        return jsonify(wishlist), 200
    else:
        return jsonify([]), 200 

@wishlist.route('/wishlist/add', methods=['POST'])
def wishlist_add():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    print(data)
    book_id = data.get('productId')
    if not book_id:
        return jsonify({'error': 'prodcut id is required'}), 400

    item = Wishlist.query.filter_by(user_id=user_id, book_id=book_id).first()
    if item:
        return jsonify({'message': 'Book is already in wishlist'}), 200

    new_item = Wishlist(user_id=user_id, book_id=book_id)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({
        'message': 'Book added to wishlist',
        'new_wishlist_item_id': new_item.id,
        'wishlist_item': new_item.to_dict()
        }), 201


@wishlist.route('/wishlist/remove', methods=['DELETE'])
def wishlist_remove():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    print(data)
    # book_id = data.get('wishlistId')
    if not data:
        return jsonify({'error': 'Book id is required'}), 400

    item = Wishlist.query.get(data['wishlistId'])
    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Book removed from wishlist'}), 200
