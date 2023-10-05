from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..api.auth_routes import validation_errors_to_error_messages
from app.api.AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..models import db, Post, Song, Photo
from ..forms import PostForm

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
    data['songUrl'] = post.song.song_url
    data['songTitle'] = post.song.title
    data['songArtist'] = post.song.artist
    data['photoUrl'] = post.photo.photo_url
    all_posts_dict[str(post.id)] = data

  return all_posts_dict

@post_routes.route("/<int:postId>", methods=["GET"])
def get_post_details(postId):
  """
  GET DETAILS OF A POST
  """
  one_post = Post.query.get(postId)
  if not one_post:
    return {'errors' : {'Post' : 'Post not found'}}, 404

  data = {
    'id': one_post.id,
    'userId': one_post.user_id,
    'songId': one_post.song_id,
    'songUrl' : one_post.song.song_url,
    'songTitle' : one_post.song.title,
    'songArtist' : one_post.song.artist,
    'photoId': one_post.photo_id,
    'photoUrl': one_post.photo.photo_url,
    'caption': one_post.caption,
    'creator': one_post.user.to_dict(),
    'created_at': one_post.created_at,
    'updated_at': one_post.updated_at
  }
  return data

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

    return new_post.to_dict(), 201
