from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..api.auth_routes import validation_errors_to_error_messages
from ..models import db, Post, Playlist
from ..forms import PlaylistForm

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/new", methods=["POST"])
@login_required
def create_playlist():
  """
  CREATE A NEW PLAYLIST
  """
  form = PlaylistForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_playlist = Playlist(user_id=current_user.id, name=form.data['name'], private=form.data['private'])
    db.session.add(new_playlist)
    db.session.commit()
    return jsonify(new_playlist.to_dict()), 200
  return {"errors": form.errors}, 400

@playlist_routes.route("/<int:playlistId>", methods=["PUT"])
@login_required
def update_playlist(playlistId):
  """
  UPDATE A PLAYLIST
  """
  updated_playlist = Playlist.query.get(playlistId)
  if not updated_playlist:
    return jsonify({'error' : 'playlist not found'}), 404
  if updated_playlist.user_id != current_user.id:
    return jsonify({'error' : 'playlist does not belong to user'}), 403

  form = PlaylistForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    updated_playlist.name = form.data['name']
    updated_playlist.private = form.data['private']
    db.session.commit()
    return jsonify(updated_playlist.to_dict()), 200
  return {"errors": form.errors}, 400

@playlist_routes.route("/<int:playlistId>", methods=["DELETE"])
@login_required
def delete_playlist(playlistId):
  """
  DELETE A PLAYLIST
  """
  deleted_playlist = Playlist.query.get(playlistId)
  if not deleted_playlist:
    return jsonify({'error' : 'playlist not found'}), 404
  if deleted_playlist.user_id != current_user.id:
    return jsonify({'error' : 'playlist does not belong to user'}), 403

  db.session.delete(deleted_playlist)
  db.session.commit()
  return {'success': 'playlist successfully deleted'}, 200

@playlist_routes.route("/<int:playlistId>/add", methods=["POST"])
@login_required
def add_post_to_playlist(playlistId):
  """
  ADD A POST TO A PLAYLIST
  """
  if request.json is None or "postId" not in request.json:
    return jsonify({'error': 'Invalid request format'}), 400
  post_id = request.json.get('postId')

  if not post_id:
    return jsonify({'error' : 'no post ID provided'}), 400

  playlist = Playlist.query.get(playlistId)
  post = Post.query.get(post_id)
  if not playlist or not post:
    return jsonify({'error' : 'invalid playlist or post ID'}), 404

  if playlist.user_id != current_user.id:
    return jsonify({'error' : 'playlist does not belong to user'}), 403

  if post not in playlist.posts:
    playlist.posts.append(post)
    db.session.commit()
    return jsonify({'success' : 'post added to playlist'}), 200
  else:
    return jsonify({'error' : 'post already in playlist'}), 400

@playlist_routes.route("/<int:playlistId>/posts/<int:post_id>", methods=["DELETE"])
@login_required
def remove_post_from_playlist(playlistId, post_id):
    """
    REMOVE A POST FROM A PLAYLIST
    """

    playlist = Playlist.query.get(playlistId)
    post = Post.query.get(post_id)
    if not playlist or not post:
        return jsonify({'error': 'invalid playlist or post ID'}), 404

    if playlist.user_id != current_user.id:
        return jsonify({'error': 'playlist does not belong to user'}), 403

    if post in playlist.posts:
        playlist.posts.remove(post)
        db.session.commit()
        return jsonify({'success': 'post removed from playlist'}), 200
    else:
        return jsonify({'error': 'post not found in playlist'}), 404
