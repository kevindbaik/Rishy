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
    caption="I was searching for calm morning music, and this is what I found. Been listening to it all day now. Such a pleasant song!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=2,
    song_id=2,
    photo_id=2,
    caption="This song expresses every possible emotion, from apathy to sadness, from joy to nostalgia.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=3,
    photo_id=3,
    caption="This is one the best dream pop songs of all time.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=4,
    photo_id=4,
    caption="The lyrics touched my heart. It's a really wonderful song. Thank you Porter.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=5,
    photo_id=5,
    caption="When you listen to a good song over and over again it’s gets old but when I listen to this over and over, it just gets better.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=6,
    photo_id=6,
    caption="once in a lifetime, kind of a nice time",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=1,
    song_id=7,
    photo_id=7,
    caption="Frank never disappoints. Instant classic",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=2,
    song_id=8,
    photo_id=8,
    caption="So calming, enjoy the rest of your day!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=9,
    photo_id=9,
    caption="This song makes me feel like my life is a slideshow from the 80s, filled with warm moments, that someone discovered in an attic.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=4,
    song_id=10,
    photo_id=10,
    caption="The best to listen to in the summer!!",
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
