from flask import Blueprint, request, jsonify, session
from backend import db
from backend.models.cart_items import CartItems
from backend.models.book import Book
from backend.models.cart import Cart


cart_items = Blueprint('cart_items', __name__)


@cart_items.route('/api/cart_items', methods=['GET'])
def get_cart_items():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    user_id = session.get('user_id')
    cart_items = CartItems.query.filter_by(user_id=user_id).all()
    if cart_items:
        return jsonify([cart.to_dict() for cart in cart_items]), 200
    else:
        return jsonify({'message': 'No items in cart'}), 404


# @cart_items.route('/api/cart_items/<string:item_id>', methods=['GET'])
# def get_cart_by_id(item_id):
#     cart_items = CartItems.query.get(item_id)
#     if cart_items:
#         return jsonify(cart_items.to_dict())
#     else:
#         return jsonify({'message': 'Item not found'}), 404


@cart_items.route('/api/add_cart_item', methods=['POST'])
def add_cart_item():
    data = request.get_json()
    print(data)
    fields = ['quantity', 'productId']
    if not all(field in data for field in fields):
        return jsonify({'message': 'Missing required fields'}), 400
    
    user_id = session.get('user_id')
    # print (session['user_id'])
    print(user_id)
    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401
    cart = Cart.query.filter_by(user_id=user_id, status='active').first()
    if not cart:
        #todo create a new cart if none exists
        cart = Cart(total_price=0, status='active', user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    book = Book.query.get(data['productId'])
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    #todo Check if the cart item already exists with the same cart_id and book_id
    existing_cart_item = CartItems.query.filter_by(cart_id=cart.id, book_id=data['productId']).first()
    if existing_cart_item:
        return jsonify({'message': 'Item already exists in cart'}), 400
    new_cart_item = CartItems(
        quantity=data['quantity'],
        cart_id=cart.id,
        user_id=user_id,
        book_id=data['productId']
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return jsonify({'message': 'Item added successfully','new_cart_item_id': new_cart_item.id ,'cart_item': new_cart_item.to_dict()}), 201


@cart_items.route('/api/delete_cart_item/<string:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    cart_item_id = CartItems.query.get(item_id)
    if not cart_item_id:
        return jsonify({'message': 'Cart item not found'}), 404
    if cart_item_id:
        db.session.delete(cart_item_id)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'}), 200

@cart_items.route('/api/delete_cart_items/', methods=['DELETE'])
def delete_all_cart_items():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    user_id = session.get('user_id')
    items = CartItems.query.filter_by(user_id=user_id).all()
    if not items:
        return jsonify({}), 404
    for item in items:
        db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'All items deleted successfully'}), 200

@cart_items.route('/api/edit_cart_item/<string:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    user_id = session.get('user_id')
    data = request.get_json()
    fields = ['quantity']
    if not all(field in data for field in fields):
        return jsonify({'message': 'Missing required fields'}), 400
    cart_item = CartItems.query.get(item_id)
    if not cart_item:
        return jsonify({'message': 'Cart item not found'}), 404
    if cart_item.user_id!= user_id:
        return jsonify({'message': 'Unauthorized access'}), 401
    cart_item.quantity = data['quantity']
    db.session.commit()
    return jsonify(cart_item.to_dict()), 200
