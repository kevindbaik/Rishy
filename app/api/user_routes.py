from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/posts')
def get_user_posts(id):
    """
    GET ALL POSTS OF USER
    """
    existing_user = User.query.get(id)
    if not existing_user:
        return {'errors' : 'User not found.'}, 404

    user_owned_posts = Post.query.filter_by(user_id=id).all()

    all_user_posts = {}
    for post in user_owned_posts:
        data = post.to_dict()
        all_user_posts[str(post.id)] = data

    return all_user_posts
