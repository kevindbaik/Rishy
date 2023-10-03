from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Song(db.model):
  __tablename__ = 'songs'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  song_url = db.Column(db.String, nullable=False)
  title = db.Column(db.String, nullable=False)
  artist = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  posts = db.relationship("Post", back_populates="song")

  def to_dict(self):
        return {
            'id': self.id,
            'songUrl': self.song_url,
            'title': self.title,
            'artist': self.artist,
            'createdAt': self.created_at,
        }
