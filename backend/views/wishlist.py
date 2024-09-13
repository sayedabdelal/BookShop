from flask import Blueprint, request, jsonify, session
from backend import db
from backend.models.book import Book
from backend.models.wishlist import Wishlist
from backend.models.user import User

wishlist = Blueprint('wishlist', __name__)

@wishlist.route('/wishlist', methods=['GET'])
def get_wishlist():
    '''Retrieve the wishlist for a specific user.

    Args:
        user_id (str): The ID of the user whose wishlist is to be retrieved. This should be passed as a query parameter.

    Returns:
        Response:
            - **200 OK**: Returns a JSON array of wishlist items if found. Each item includes:
                - Details of the wishlist items. (Assuming `Wishlist` model has a `to_dict` method)
            - **401 Unauthorized**: If `user_id` is not provided in the query parameters.
    '''
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    wishlist_items = Wishlist.query.filter_by(user_id=user_id).all()
    if wishlist_items:
        wishlist = [item.to_dict() for item in wishlist_items]
        return jsonify(wishlist), 200
    else:
        return jsonify([]), 200 

@wishlist.route('/wishlist/add', methods=['POST'])
def wishlist_add():
    '''Add a book to the user's wishlist.

    JSON Body:
        bookId (str): The ID of the book to be added to the wishlist.

    Returns:
        Response:
            - **201 Created**: If the book is successfully added to the wishlist, returns a JSON object with:
                - **message** (str): Confirmation message.
                - **new_wishlist_item_id** (int): The ID of the newly added wishlist item.
                - **wishlist_item** (dict): Details of the newly added wishlist item.
            - **401 Unauthorized**: If the user is not logged in.
            - **400 Bad Request**: If `bookId` is not provided in the request body or the book is already in the wishlist.
    '''
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    book_id = data.get('productId')
    if not book_id:
        return jsonify({'error': 'Product ID is required'}), 400

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
    '''Remove a book from the user's wishlist.

    JSON Body:
        wishlistId (str): The ID of the wishlist item to be removed.

    Returns:
        Response:
            - **200 OK**: If the book is successfully removed from the wishlist.
            - **401 Unauthorized**: If the user is not logged in.
            - **400 Bad Request**: If `wishlistId` is not provided in the request body.
    '''
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    if not data or 'wishlistId' not in data:
        return jsonify({'error': 'Wishlist ID is required'}), 400

    item = Wishlist.query.get(data['wishlistId'])
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Book removed from wishlist'}), 200
    else:
        return jsonify({'error': 'Wishlist item not found'}), 404
