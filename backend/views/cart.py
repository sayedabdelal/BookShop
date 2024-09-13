from flask import Blueprint, request, jsonify, session
from backend import db
from ..models.cart import Cart

cart = Blueprint('cart', __name__)

@cart.route('/api/cart', methods=['GET'])
def get_cart_items():
    '''Retrieve all cart items.

    This route fetches all cart items from the database.

    Returns:
        Response: A JSON list of cart items if found, or a message indicating no items are in the cart.
    '''
    cart_items = Cart.query.all()
    if cart_items:
        return jsonify([cart.to_dict() for cart in cart_items]), 200
    else:
        return jsonify({'message': 'No items in cart'}), 404

@cart.route('/api/cart/<string:item_id>', methods=['GET'])
def get_cart_by_id(item_id):
    '''Retrieve a specific cart item by its ID.

    Args:
        item_id (str): The ID of the cart item to retrieve.

    Returns:
        Response: A JSON object containing the cart item details if found, or a message indicating the item was not found.
    '''
    cart_item = Cart.query.get(item_id)
    if cart_item:
        return jsonify(cart_item.to_dict())
    else:
        return jsonify({'message': 'Item not found'}), 404

@cart.route('/api/cart/<string:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    '''Update a specific cart item.

    Args:
        item_id (str): The ID of the cart item to update.

    JSON Body:
        status (str): The new status of the cart item.
        total_price (float): The new total price of the cart item.

    Returns:
        Response: The updated cart item details if updated successfully, or an error message if the item is not found.
    '''
    data = request.get_json()
    cart_item = Cart.query.get(item_id)
    if cart_item:
        if 'status' in data:
            cart_item.status = data['status']
        if 'total_price' in data:
            cart_item.total_price = data['total_price']
        db.session.commit()
        return jsonify(cart_item.to_dict()), 200
    else:
        return jsonify({'message': 'Cart item not found'}), 404

@cart.route('/api/cart/<string:item_id>', methods=['DELETE'])
def remove_cart_item(item_id):
    '''Remove a specific cart item.

    Args:
        item_id (str): The ID of the cart item to remove.

    Returns:
        Response: A success message if the item is removed, or an error message if the item is not found.
    '''
    cart_item = Cart.query.get(item_id)
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Item removed'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404

@cart.route('/api/cart', methods=['DELETE'])
def remove_cart():
    '''Remove all cart items.

    This route clears all items from the cart.

    Returns:
        Response: A success message if all items are removed, or a message indicating the cart is already empty.
    '''
    cart_items = Cart.query.all()
    if cart_items:
        for item in cart_items:
            db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Cart is empty now'}), 200
    else:
        return jsonify({'message': 'Cart is already empty'}), 404

@cart.route('/api/cart', methods=['POST'])
def create_item():
    '''Create a new cart item for the logged-in user.

    JSON Body:
        total_price (float): The total price of the cart.
        status (str): The status of the cart.

    Returns:
        Response: The created cart item details if created successfully, or an error message if the user is not logged in, or required fields are missing.
    '''
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    user_id = session['user_id']
    if not request.get_json():
        return jsonify({'message': 'Not a JSON'}), 400

    data = request.get_json()
    required_fields = ['total_price', 'status']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    new_cart = Cart(total_price=data['total_price'], status=data['status'], user_id=user_id)
    db.session.add(new_cart)
    db.session.commit()
    return jsonify(new_cart.to_dict()), 201
