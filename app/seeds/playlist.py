from ..models import db, Playlist, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_playlists(posts):
  playlists = [
    Playlist(
      user_id=1, name='Melancholy', description='a collection of sad songs that make me happy.', private=False, created_at=current_date, updated_at=current_date, posts=[posts[3], posts[4], posts[11], posts[14], posts[16]]
    )
  ]
  db.session.add_all(playlists)
  db.session.commit()

def undo_playlists():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlists"))
  db.session.commit()
