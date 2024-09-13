from flask import Blueprint, request, jsonify, session
from backend import db
from backend.models.cart_items import CartItems
from backend.models.book import Book
from backend.models.cart import Cart

cart_items = Blueprint('cart_items', __name__)

@cart_items.route('/api/cart_items', methods=['GET'])
def get_cart_items():
    '''Retrieve all cart items for a logged-in user.

    This route fetches all cart items associated with a specific user.

    Query Parameters:
        user_id (str): The ID of the user whose cart items are to be retrieved.

    Returns:
        Response: A JSON list of cart items if found. Returns an empty list if no items are found, or an error message if `user_id` is not provided.
    '''
    user_id = request.args.get('user_id')
    print(f"User ID: {user_id}")
    if not user_id:
        return jsonify({'message': 'User ID not provided'}), 400

    cart_items = CartItems.query.filter_by(user_id=user_id).all()
    
    if cart_items:
        return jsonify([cart.to_dict() for cart in cart_items]), 200
    else:
        return jsonify([]), 200

# @cart_items.route('/api/cart_items/<string:item_id>', methods=['GET'])
# def get_cart_by_id(item_id):
#     '''Retrieve a cart item by its ID.
# 
#     Args:
#         item_id (str): The ID of the cart item to retrieve.
# 
#     Returns:
#         Response: A JSON object containing the cart item details if found, or an error message if the item is not found.
#     '''
#     cart_items = CartItems.query.get(item_id)
#     if cart_items:
#         return jsonify(cart_items.to_dict())
#     else:
#         return jsonify({'message': 'Item not found'}), 404

@cart_items.route('/api/add_cart_item', methods=['POST'])
def add_cart_item():
    '''Add a new item to the cart for the logged-in user.

    This route adds an item to the user's cart. If no active cart exists, a new cart is created.

    JSON Body:
        quantity (int): The quantity of the item to add.
        productId (int): The ID of the book to add.

    Returns:
        Response: A success message with the new cart item details if added successfully, or error messages if required fields are missing, the user is not logged in, or the book is not found.
    '''
    data = request.get_json()
    print(data)
    fields = ['quantity', 'productId']
    if not all(field in data for field in fields):
        return jsonify({'message': 'Missing required fields'}), 400
    
    user_id = session.get('user_id')
    print(f"Session during add_cart_item: {session}")
    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401
    
    cart = Cart.query.filter_by(user_id=user_id, status='active').first()
    if not cart:
        cart = Cart(total_price=0, status='active', user_id=user_id)
        db.session.add(cart)
        db.session.commit()

    book = Book.query.get(data['productId'])
    if not book:
        return jsonify({'message': 'Book not found'}), 404

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
    return jsonify({'message': 'Item added successfully', 'new_cart_item_id': new_cart_item.id, 'cart_item': new_cart_item.to_dict()}), 201

@cart_items.route('/api/delete_cart_item', methods=['DELETE'])
def delete_cart_item():
    '''Delete a specific cart item.

    This route removes a cart item based on its ID.

    JSON Body:
        cartItemId (int): The ID of the cart item to delete.

    Returns:
        Response: A success message if the item is deleted, or an error message if the user is not logged in or the item is not found.
    '''
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    data = request.get_json()
    print(data)
    cart_item_id = CartItems.query.get(data['cartItemId'])
    print(cart_item_id)
    if not cart_item_id:
        return jsonify({'message': 'Cart item not found'}), 404

    db.session.delete(cart_item_id)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully'}), 200

@cart_items.route('/api/delete_cart_items/', methods=['DELETE'])
def delete_all_cart_items():
    '''Delete all cart items for the logged-in user.

    This route removes all items from the user's cart.

    Returns:
        Response: A success message if all items are deleted, or an error message if the user is not logged in or no items are found.
    '''
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
    '''Update the quantity of a specific cart item.

    Args:
        item_id (str): The ID of the cart item to update.

    JSON Body:
        quantity (int): The new quantity of the item.

    Returns:
        Response: The updated cart item details if the item is found and updated, or error messages if the user is not logged in, the item is not found, or if there is unauthorized access.
    '''
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

    if cart_item.user_id != user_id:
        return jsonify({'message': 'Unauthorized access'}), 401

    cart_item.quantity = data['quantity']
    db.session.commit()
    return jsonify(cart_item.to_dict()), 200
