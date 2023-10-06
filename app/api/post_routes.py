from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..api.auth_routes import validation_errors_to_error_messages
from app.api.AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..models import db, Post, Song, Photo, Comment
from ..forms import PostForm, UpdatePostForm

post_routes = Blueprint("posts", __name__)

@post_routes.route("/", methods=["GET"])
def get_posts():
  """
  GET ALL POSTS
  """
  all_posts = Post.query.all()
  all_posts_dict = {}

  for post in all_posts:
    data = post.to_dict()
    all_posts_dict[str(post.id)] = data

  return jsonify(all_posts_dict), 200

@post_routes.route("/<int:postId>", methods=["GET"])
def get_post_details(postId):
  """
  GET DETAILS OF A POST
  """
  one_post = Post.query.get(postId)
  if not one_post:
    return {'errors' : {'Post' : 'Post not found'}}, 404

  return jsonify(one_post.to_dict()), 200

@post_routes.route("/check/<int:postId>", methods=["GET"])
def check_post(postId):
  """
  CHECKS IF A POST EXISTS
  """
  one_post = Post.query.get(postId)
  if(one_post):
    return jsonify({'exists' : True}), 200
  else:
    return jsonify({'exists' : False}), 404

@post_routes.route("/new", methods=["POST"])
@login_required
def create_post():
  """
  CREATE A POST
  """
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    song = form.data['song']
    song.filename = get_unique_filename(song.filename)
    song_upload = upload_file_to_s3(song, "Songs")
    if "errors" in song_upload:
        return {"errors": song_upload["errors"]}, 400
    song_url = song_upload["url"]
    new_song = Song(song_url=song_url, title=form.data['title'], artist=form.data['artist'])
    db.session.add(new_song)
    db.session.commit()

    photo = form.data['photo']
    photo.filename = get_unique_filename(photo.filename)
    photo_upload = upload_file_to_s3(photo, "Photos")
    if "errors" in photo_upload:
        return {"errors": photo_upload["errors"]}, 400
    photo_url = photo_upload["url"]
    new_photo = Photo(photo_url=photo_url)
    db.session.add(new_photo)
    db.session.commit()

    new_post = Post(user_id=current_user.id, song_id=new_song.id, photo_id=new_photo.id, caption=form.data['caption'])
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

  return {"errors": form.errors}, 400

@post_routes.route("/<int:postId>", methods=["PUT"])
@login_required
def update_post(postId):
    """
    UPDATE A POST
    """
    form = UpdatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    updated_post = Post.query.get(postId)
    if not updated_post:
        return {"errors": "Post not found"}, 404

    if updated_post.user_id != current_user.id:
        return {"errors": "Unauthorized"}, 403

    if form.validate_on_submit():
        if form.song.data:
            song = form.data['song']
            song.filename = get_unique_filename(song.filename)
            song_upload = upload_file_to_s3(song, "Songs")
            if "errors" in song_upload:
                return {"errors": song_upload["errors"]}, 400
            song_url = song_upload["url"]
            updated_post.song.song_url = song_url

        if form.photo.data:
            photo = form.data['photo']
            photo.filename = get_unique_filename(photo.filename)
            photo_upload = upload_file_to_s3(photo, "Photos")
            if "errors" in photo_upload:
                return {"errors": photo_upload["errors"]}, 400
            photo_url = photo_upload["url"]
            updated_post.photo.photo_url = photo_url

        updated_post.caption = form.data['caption']
        updated_post.song.title = form.data['title']
        updated_post.song.artist = form.data['artist']
        db.session.commit()

        return updated_post.to_dict(), 200

    return {"errors": form.errors}, 400

@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def delete_post(postId):
    """
    DELETE A POST
    """
    post = Post.query.get(postId)
    if not post:
      return {"errors": "Post not found"}, 404
    if post.user_id != current_user.id:
      return {"errors": "Unauthorized"}, 403

    song_url = post.song.song_url
    remove_file_from_s3(song_url)

    photo_url = post.photo.photo_url
    remove_file_from_s3(photo_url)

    db.session.delete(post)
    db.session.commit()

    return {'message' : 'Post successfully deleted'}, 200

@post_routes.route("/<int:postId>/comments", methods=["GET"])
def get_comments(postId):
   """
   GET ALL COMMENTS FOR A POST
   """
   post = Post.query.get(postId)
   if not post:
      return {"errors": "Post not found"}, 404

   comments = Comment.query.filter_by(post_id=postId).all()
   comments_dict = {}
   for comment in comments:
      data = comment.to_dict()
      data['User'] = comment.user.to_dict()
      comments_dict[str(comment.id)] = data

   return jsonify(comments_dict), 200
