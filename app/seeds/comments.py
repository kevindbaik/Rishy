from ..models import db, User, Post, Comment, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text
import random
from faker import Faker

fake = Faker()

def seed_comments():
    # Predefined realistic comments
    comments_content = [
        "Loved this song! Thanks for sharing.",
        "This song brings back so many memories. Thank you.",
        "Not really my type, but thanks for introducing.",
        "The picture perfectly complements the vibe of the song.",
        "I was having a tough day, but hearing this turned my mood around.",
        "Great post! Thanks so much for sharing, I love this song.",
        "I appreciate you sharing this, I just discovered a new favorite artist.",
        "The picture combined with the song made me feel so nostalgic.",
        "How did I miss this song earlier? It's gold.",
        "Not a big fan of this genre, but this one's soooo good!!",
        "This song has been on repeat for me!",
        "The mood of the song fits perfectly with the image. Great post!",
        "This one's going straight to my playlist.",
        "The lyrics are so touching. Felt it deeply.",
        "Was having an awful day until I heard this. If anyone's feeling down, you are a special, amazing person :)",
        "The image and the song together is such a mood!",
        "Thanks for sharing!",
        "Can't stop humming along. So catchy lol!",
        "The image reminds me of a deep memory. Beautiful.",
        "The song and the picture are both so dreamy. Love it.",
        "Listening to this at 2am and thinking about how lucky I am. Lifes good!",
        "If you're reading this, have a great day!",
        "Looks like I found another new favorite song. Appreciate it!",
        "To anyone that will read this, I know we have our differences and our own struggles in life but don't give up.",
        "This is hands down one of my favourite songs ever.",
        "This song, this album is a work of fine art.",
        "Notice how there isn't a single negative comment about this song? This is how you make music.",
        "2 years later and I've listened to this song every day since. Will forever mean something to me"
    ]

    all_users = User.query.all()
    all_posts = Post.query.limit(10).all()

    comments = []

    for post in all_posts:
        commenters = [user for user in all_users if user.id != post.user_id]

        random.shuffle(commenters)
        selected_commenters = commenters[:random.choice([4, 5])]

        for commenter in selected_commenters:
            random_date_time = fake.date_time_between(start_date='-1y', end_date='now')
            comment_content = random.choice(comments_content)

            comment = Comment(
                post_id=post.id,
                user_id=commenter.id,
                content=comment_content,
                created_at=random_date_time,
                updated_at=random_date_time
            )
            comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()
    return comments

def undo_comments():
  if environment == "production":
    db.session.execute(
        f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))
  db.session.commit()
