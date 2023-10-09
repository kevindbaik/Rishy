from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
  __tablename__ = 'posts'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
  photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)
  caption = db.Column(db.String(120), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  user = db.relationship("User", back_populates="posts")
  song = db.relationship("Song", back_populates="posts")
  photo = db.relationship("Photo", back_populates="posts")
  comments = db.relationship("Comment", back_populates="post", cascade='all, delete')

  def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'songId': self.song_id,
            'photoId': self.photo_id,
            'caption': self.caption,
            'createdAt': self.created_at.strftime('%B %d, %Y'),
            'updatedAt': self.updated_at.strftime('%B %d, %Y'),
            'songUrl': self.song.song_url,
            'songTitle': self.song.title,
            'songArtist': self.song.artist,
            'photoUrl': self.photo.photo_url,
            'User' : self.user.to_dict()
        }
