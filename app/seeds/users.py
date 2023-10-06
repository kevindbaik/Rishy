from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
  users = []

  usernames = ["DemoUser", "StudioGhibliRadio", "HelloFascination", "LofiLia", "iansanluis", "kassidyr", "juusttin", "kevin444", "Somehow999", "pikapika1", "SOSOLOOPY", "Prisma323", "peaceofpie97", "nicholaspascual", "Munchely234", "Aimalai", "alyssarr", "reginaimpp", "kylemendoza66", "Kshu1996", "damienlcruz", "PuneetK2", "melonhead", "Hublots99"]


  emails = [
    "demouser@appacademy.io",
    "studioghibli@appacademy.io",
    "hellofasc@appacademy.io",
    "lofilia@appacademy.io",
    "emonite@appacademy.io",
    "iansanluis@appacademy.io",
    "kassidyr@appacademy.io",
    "juusttin@appacademy.io",
    "kevin444@appacademy.io",
    "somehow999@appacademy.io",
    "pikapika1@appacademy.io",
    "sosoloopy@appacademy.io",
    "prisma323@appacademy.io",
    "peaceofpie97@appacademy.io",
    "nicholaspascual@appacademy.io",
    "munchely234@appacademy.io",
    "aimalai@appacademy.io",
    "alyssarr@appacademy.io",
    "reginaimpp@appacademy.io",
    "kylemendoza66@appacademy.io",
    "kshu1996@appacademy.io",
    "damienlcruz@appacademy.io",
    "puneetk2@appacademy.io",
    "melonhead@appacademy.io",
    "hublots99@appacademy.io"
]

  for i in range(24):
    random_date_time = fake.date_time_between(start_date='-1y', end_date='now')

    user = User(
    username = usernames[i],
    password = "password",
    first_name = fake.first_name(),
    last_name = fake.last_name(),
    email = emails[i],
    created_at = random_date_time,
    updated_at = random_date_time
    )
    users.append(user)

  db.session.add_all(users)
  db.session.commit()
  return users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
