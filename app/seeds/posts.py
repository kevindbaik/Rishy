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
    caption="I was searching for something chill, and I found this!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=1,
    song_id=16,
    photo_id=11,
    caption="Feeling green today, and this song just compliments everything about me!!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=7,
    song_id=15,
    photo_id=12,
    caption="Last night was a blast! Here's a pic and a song that sums everything up.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=11,
    song_id=30,
    photo_id=30,
    caption="love love love this song and especially the lyrics.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=7,
    song_id=14,
    photo_id=13,
    caption="Back in my hometown. Listening to my favorite song at my favorite spot.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=2,
    song_id=2,
    photo_id=2,
    caption="From my favorite Studio Ghibli film, Spirited Away.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=3,
    photo_id=3,
    caption="I can't stop listening to this song, so now I have to show it you guys.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=4,
    photo_id=4,
    caption="The lyrics to this touched my heart. Don't be afraid to pursue something you love!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=6,
    song_id=19,
    photo_id=14,
    caption="Chinese Lunar New Year celebration. Let's have a good year!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=5,
    photo_id=5,
    caption="I've been in love with this song for the past few weeks. Life is treating me well right now.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=3,
    song_id=6,
    photo_id=6,
    caption="a once in a lifetime, kind of a nice time",
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
    user_id=3,
    song_id=23,
    photo_id=15,
    caption="On my home from work and feeling a tad melancholy. Life is passing me by too fast it seems.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=14,
    song_id=11,
    photo_id=16,
    caption="Fit pic + my favorite song on repeat.... how could this day get any better?",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=1,
    song_id=26,
    photo_id=18,
    caption="Nice to see you. How you doin?",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=6,
    song_id=27,
    photo_id=26,
    caption="Wouldn't be here without these people!!",
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
    caption="It's currently raining here... so obviously I had to listen this song.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=4,
    song_id=10,
    photo_id=10,
    caption="sunshine + beach trip + friends + 3 nights = a good time!!!!!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=6,
    song_id=21,
    photo_id=19,
    caption="a daily reminder!!!!!!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=5,
    song_id=20,
    photo_id=20,
    caption="Your twenties are the time to both accept and fight your way into the person you’re destined to become.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=17,
    song_id=24,
    photo_id=21,
    caption="Petit son funky en détente! Parfait pour cet été!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=20,
    song_id=13,
    photo_id=22,
    caption="During my Japan trip all I can think about is thing song and how much I love it!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=19,
    song_id=29,
    photo_id=29,
    caption='"I love weekends. Will be back soon xoxo',
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=18,
    song_id=17,
    photo_id=17,
    caption="this song never gets old!!!! such a fun time whenever i hear it!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=2,
    song_id=12,
    photo_id=23,
    caption="Calming and relaxing music, that also makes you feel both happy and sad.",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=12,
    song_id=22,
    photo_id=24,
    caption="One of my favorite songs right now so I thought I'd share!",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=20,
    song_id=28,
    photo_id=27,
    caption='"この曲はとても良いです!',
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=14,
    song_id=25,
    photo_id=28,
    caption='"check out my sweet shot from earlier!',
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=26,
    song_id=31,
    photo_id=31,
    caption="love listening to this while i draw some binary search trees",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=27,
    song_id=27,
    photo_id=32,
    caption="love listening to this at 4 am every night",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=28,
    song_id=33,
    photo_id=33,
    caption="love listening to this while i drink boba :face_holding_back_tears:",
    created_at=current_date,
    updated_at=current_date
    ),
    Post(
    user_id=6,
    song_id=18,
    photo_id=25,
    caption='"It is, it was, and it was great." - Rishi Malani',
    created_at=current_date,
    updated_at=current_date
    )
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
