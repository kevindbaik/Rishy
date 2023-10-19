from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Playlist(db.Model):
  __tablename__ = "playlists"

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(100), nullable=False)
  private = db.Column(db.Boolean, nullable=False, default=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  user = db.relationship("User", back_populates="playlists")
  posts = db.relationship("Post", secondary="playlist_posts", back_populates='playlists', cascade='all, delete-orphan')

  def to_dict(self):
    return {
        'id' : self.id,
        'userId' : self.user_id,
        'name' : self.name,
        'private' : self.private,
        'createdAt': self.created_at.strftime('%B %d, %Y'),
        'updatedAt': self.updated_at.strftime('%B %d, %Y'),
    }
