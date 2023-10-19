from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..api.auth_routes import validation_errors_to_error_messages
from ..models import db, Post, Song, Photo, Comment, User, Playlist

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/<int:playlistId>", methods=["POST"])
@login_required
def add_post_to_playlist(playlistId):
  """
  ADD A POST TO A PLAYLIST
  """
  post_id = request.json.get('postId')
  if not post_id:
    return jsonify({'error' : 'No post ID provided'}), 400

  playlist = Playlist.query.get(playlistId)
  post = Post.query.get(post_id)
  if not playlist or not post:
    return jsonify({'error' : 'Invalid playlist or post ID'}), 404

  if playlist.user_id != current_user.id:
    return jsonify({'error' : 'Playlist does not belong to user'}), 403

  if post not in playlist.posts:
    playlist.posts.append(post)
    db.session.commit()
    return jsonify({'success' : 'Post added to playlist'}), 200
  else:
    return jsonify({'error' : 'Post already in playlist'}), 400
