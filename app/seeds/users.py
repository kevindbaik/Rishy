from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    random_date_time = fake.date_time_between(start_date='-1y', end_date='now')

    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User', created_at=random_date_time, updated_at=random_date_time)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Dee', created_at=random_date_time, updated_at=random_date_time)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Bee', created_at=random_date_time, updated_at=random_date_time)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


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
