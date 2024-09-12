from datetime import datetime
from flask import Blueprint, jsonify, request
from backend.models.user import User
from backend.models.book import Book
from backend.models.cart_items import CartItems
from backend.models.cart import Cart
from backend.models.wishlist import Wishlist
from backend import db

admin = Blueprint('admin', __name__)

@admin.route('/admin_get_users', methods=['GET'])
def clients_emails():
    '''Return all data of users except admain'''
    users = User.query.filter(User.email != 'admin@gmail.com').all()
    users = [{'id': user.id, 'name': user.fname, 'email': user.email, 'created_at': datetime.now()} for user in users]
    
    return jsonify({'users': users}), 200


@admin.route('/admin_create_user', methods=['GET', 'POST'])
def create_user():
    '''allow admin to create users'''
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    verified = data.get('verified')
    image = data.get('image')

    if not name and not email and verified:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(fname=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
 
    return jsonify({
        'message': 'New user created, user now can login',
        'created_at': datetime.now()
    }), 201



@admin.route('/users/<string:user_id>', methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    cart = Cart.query.filter_by(user_id=user_id).first()
    if cart:
        db.session.delete(cart)

    cart_item = CartItems.query.filter_by(user_id=user_id).all()
    for item in cart_item:
        db.session.delete(item)

    wishlist = Wishlist.query.filter_by(user_id=user_id).all()
    for item in wishlist:
        db.session.delete(item)

    # Delete the user
    db.session.delete(user)
    # Commit all deleted items and user
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
