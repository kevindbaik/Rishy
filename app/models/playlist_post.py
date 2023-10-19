from .db import db, environment, SCHEMA, add_prefix_for_prod

playlist_post = db.Table(
  "playlist_posts",

  db.Column(
    "playlist_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("playlists.id")),
    primary_key=True
  ),

  db.Column(
    "post_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("posts.id")),
    primary_key=True
  )
)

if environment == "production":
  playlist_post.schema = SCHEMA
