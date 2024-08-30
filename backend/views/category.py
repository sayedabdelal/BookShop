from flask import Blueprint, request, jsonify
from backend import db
from ..models.category import Category


category = Blueprint('category', __name__)

@category.route('/category')
def get_all_categories():
    categories = Category.query.all()
    json_categories = list(map(lambda c: c.to_dict(), categories))
    return jsonify({"categories": json_categories}), 200


# @category.route('/category/<string:name>')
# def all_books_in_category(name):
#     books = Category.query.filter_by(name=name).all()
#     json_books = list(map(lambda b: b.to_json(), books))
#     return jsonify({"category": json_books}), 200

@category.route('/category', methods=['POST'])
def create_category():
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"message": "Invalid input"}), 400
    
    name = data['name']
    description = data.get('description', '')

    new_category = Category(name=name, description=description)
    
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify(new_category.to_dict()), 201
