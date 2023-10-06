from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Comment
from app.forms import CommentForm

user_routes = Blueprint('comments', __name__)
