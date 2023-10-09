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
        "2 years later and I've listened to this song every day since. Will forever mean something to me",
        "I really appreciate you sharing this!",
        "woah, it's been awhile since i heard this song."
        "This song brings back soooo many memories. Thx for sharing this moment!",
        "very beautiful song!",
        "hey, hope you've been doing well! awesome post!",
        "Love everyone reading this <3333333",
        "Great picture! Saving this to my collections.",
        "Listening to this changed my mood for the better, thank you",
        "Hello! Randomly came across this post, but it's amazing.",
        "Appreciate the followback, you have dope taste in music!",
        "Love love love this song and post!!!",
        "one of my absolute favorite songs as well!",
        "the picture goes REALLY well with the song, fantastic post!",
        "It's so strange how a picture can make the experience of listening to a song 10x better.",
        "Song is a vibe honestly",
        "Everything about this post is amazing, thank you for sharing it <3",
        "I've been having a pretty bad day, but it feels like it's turning around now.",
        "i feel like pictures can change the perception of a song so much",
        "Yooooo fire song!!!",
        "Adding this to my collections as well, ty!",
        "hey it's been awhile! hope all is well <3",
        "Thanks for sharing this. It made my day.",
        "sending everyone hugs xoxo",
        "great shot! song makes it sooo much better too!",
        "Music is probably humanity's best creation.",
        "A big hug to everyone who has been discouraged to create art at least once by the world.",
        "This song really touched my heart. Thank you.",
        "This is not just a song. This is an art",
        "It's little songs like this that pick me up and keep me going no matter how hard things get. <3",
        "This song means so much to a lot of people!!",
        "Hey great seeing you're doing ok! Let's catch up soon!"
    ]

    all_users = User.query.all()
    all_posts = Post.query.limit(24).all()

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
