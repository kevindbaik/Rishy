from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_posts():
  posts = [
    Post(
    user_id=1,
    song_id=1,
    photo_id=1,
    caption="I was searching for calm morning music, and this is what I found. Been listening thrice now and added to my morning Sunrise (actually mostly cloud) reels video today. Such a pleasant song!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=2,
    song_id=2,
    photo_id=2,
    caption="This song expresses every possible emotion, from apathy to sadness, from joy to nostalgia. It's not melancholic, but also not empty, sad but not depressing, hopeful but not cheery. It's perfect.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=3,
    photo_id=3,
    caption="Mitsuha's theme is so healing and nostalgic to hear.",
    created_at=current_date,
    updated_at=current_date
    ),
  ]

  db.session.add_all(posts)
  db.session.commit()
  return posts

def undo_posts():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM posts"))
  db.session.commit()
