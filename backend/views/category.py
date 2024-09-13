from flask import Blueprint, request, jsonify
from backend import db
from ..models.category import Category

category = Blueprint('category', __name__)

@category.route('/category', methods=['GET'])
def get_all_categories():
    '''Retrieve all categories.

    This route fetches all categories from the database.

    Returns:
        Response: A JSON list of categories if found, or a message indicating no categories are found.
    '''
    categories = Category.query.all()
    json_categories = list(map(lambda c: c.to_dict(), categories))
    return jsonify({"categories": json_categories}), 200

@category.route('/category', methods=['POST'])
def create_category():
    '''Create a new category.

    JSON Body:
        name (str): The name of the category.
        description (str, optional): A description of the category.

    Returns:
        Response: The created category details if created successfully, or an error message if required fields are missing or the input is invalid.
    '''
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"message": "Invalid input"}), 400
    
    name = data['name']
    description = data.get('description', '')

    new_category = Category(name=name, description=description)
    
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify(new_category.to_dict()), 201
