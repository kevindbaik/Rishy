from ..models import db, Photo, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_photos():
  photos = [
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/(1)+always.png",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/(2)+spirited+away.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/sunset.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tokyonight.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/nyview.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/la.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/doge.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/ponyo.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/rainy.jpg",
      created_at=current_date
    ),
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/beach.jpg",
      created_at=current_date
    )
  ]

  db.session.add_all(photos)
  db.session.commit()
  return photos

def undo_photos():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM photos"))
  db.session.commit()
