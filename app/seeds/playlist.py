from ..models import db, Playlist, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_playlists(posts):
  playlists = [
    Playlist(
      user_id=1, name='Melancholy', private=False, created_at=current_date, updated_at=current_date, posts=[posts[3], posts[4], posts[11], posts[14], posts[16]]
    ),
    Playlist(
      user_id=1, name='Summertime', private=False,
      created_at=current_date, updated_at=current_date, posts=[posts[1], posts[6], posts[8], posts[9], posts[12], posts[17]]
    ),
    Playlist(
      user_id=1, name='Anime Stuff', private=True,
      created_at=current_date, updated_at=current_date, posts=[posts[5], posts[7], posts[15], posts[21], posts[22]]
    ),
    Playlist(
      user_id=1, name='late night tunes', private=False,
      created_at=current_date, updated_at=current_date, posts=[posts[2], posts[10], posts[13], posts[12], posts[18], posts[20]]
    ),
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
