from ..models import db, Song, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_songs():
  songs = [
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/(1)+keshi+-+always+(Audio).mp3",
      title="always",
      artist="keshi",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/the-name-of-life-spirited-away-piano_MZ2IgP7z.mp3",
      title="The Name of Life",
      artist="Spirited Away",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/No+Vacation+-+Days.mp3",
      title="Days",
      artist="No Vacation",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Porter+Robinson+-+Musician+(Official+Audio).mp3",
      title="Musician",
      artist="Porter Robinson",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/SALES+-+Your+Own+(Official+Music+Video).mp3",
      title="Your Own",
      artist="SALES",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Kind+of+a+Nice+Time.mp3",
      title="kind of a nice time",
      artist="vansire",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Frank+Ocean+-+In+My+Room+(Lyric+Video).mp3",
      title="In My Room",
      artist="Frank Ocean",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/ponyo+lofi++ponyo+on+the+cliff+by+the+sea+(ghibli+lofi).mp3",
      title="By the Sea",
      artist="Ponyo",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Men+I+Trust+-+Show+Me+How.mp3",
      title="Show Me How",
      artist="Men I Trust",
      created_at=current_date
    ),
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Dominic+Fike+_3+Nights_+(Official+Audio).mp3",
      title="3 Nights",
      artist="Dominic Fike",
      created_at=current_date
    ),
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
