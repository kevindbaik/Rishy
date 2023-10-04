from ..models import db, Song, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_songs():
  songs = [
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/(1)+keshi+-+always+(Audio).mp3",
      title="Always",
      artist="keshi",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/(SG)+The+Name+of+Life+-+Spirited+Away.mp3",
      title="The Name of Life",
      artist="Spirited Away",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/(LOFI-LIA)+Your+Name+-+Mitsuha's+Theme.mp3",
      title="Mitsuha's Theme",
      artist="Your Name",
      created_at=current_date
    )
  ]

  db.session.add_all(songs)
  db.session.commit()
  return songs

def undo_songs():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))
  db.session.commit()
