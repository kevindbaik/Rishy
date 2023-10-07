from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:commentId>", methods=["PUT"])
@login_required
def update_comment(commentId):
  """
  UPDATES A COMMENT
  """
  comment = Comment.query.get(commentId)
  if not comment:
    return {"error" : "Comment could not found"}, 404
  if comment.user_id != current_user.id:
    return {"error" : "Unauthorized"}, 401

  data = request.get_json()
  data_content = data.get('comment')

  form = CommentForm(data={'content': data_content})
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment.content = form.data['content']

    db.session.commit()
    return jsonify(comment.to_dict()), 200

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment_routes.route("/<int:commentId>", methods=["DELETE"])
@login_required
def delete_comment(commentId):
  """
  DELETE A COMMENT
  """
  comment = Comment.query.get(commentId)
  if not comment:
    return {"error" : "Comment could not found"}, 404
  if comment.user_id != current_user.id:
    return {"error" : "Unauthorized"}, 401

  db.session.delete(comment)
  db.session.commit()

  return {"message": "Successfully deleted comment"}
