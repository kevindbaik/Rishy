from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from faker import Faker

fake = Faker()

current_date = datetime.now()
# Adds a demo user, you can add other users here if you want
def seed_users():
  users = [
    #1
    User(username="DemoUser", password='password', email='demouser@aa.io', first_name='Demo', last_name='User', created_at=current_date, updated_at=current_date),

    #2
    User(username="SoundGarden", password='password', email='soundgarden@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #3
    User(username="hellofascination", password='password', email='hellofasc@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #4
    User(username="holo-kitty", password='password', email='holokitty@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #5
    User(username="5spice", password='password', email='5spice@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #6
    User(username="kevinbvik", password='password', email='kevinbvik@aa.io', first_name='Kevin', last_name='Baik', created_at=current_date, updated_at=current_date),

    #7
    User(username="Aimalai", password='password', email='aimalai@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #8
    User(username="peaceofpie97", password='password', email='peace@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #9
    User(username="L00p3r", password='password', email='looper@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #10
    User(username="nestorbee", password='password', email='nestorbee@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #11
    User(username="bronze99", password='password', email='bronze@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #12
    User(username="justin444", password='password', email='devin@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #13
    User(username="Zaywop", password='password', email='zaywop@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #14
    User(username="hublots", password='password', email='hublots@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #15
    User(username="pizza_reality", password='password', email='pizza@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #16
    User(username="Prismo9092", password='password', email='prismo@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #17
    User(username="Kaispirat", password='password', email='kaispirat@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #18
    User(username="AndrewKim", password='password', email='andrewkim@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #19
    User(username="savannamalk", password='password', email='savannamalk@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #20
    User(username="Hibito", password='password', email='hibi@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #21
    User(username="lovekelsie", password='password', email='lovekelsie@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #22
    User(username="Miila", password='password', email='Miila@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #23
    User(username="WootiBoy", password='password', email='wootiboy@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #24
    User(username="Chosanny", password='password', email='chosanny@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #25
    User(username="haejilo", password='password', email='haejilo@aa.io', first_name=fake.first_name(), last_name=fake.last_name(), created_at=current_date, updated_at=current_date),

    #26
    User(username="nick", password='password', email='nick@aa.io', first_name='Nicholas', last_name='Hosman', created_at=current_date, updated_at=current_date),

    #27
    User(username="huynh", password='password', email='huynh`@aa.io', first_name='Huynh', last_name='Lam', created_at=current_date, updated_at=current_date),

    #28
    User(username="yi", password='password', email='yi@aa.io', first_name='Yi', last_name='Chen', created_at=current_date, updated_at=current_date),
  ]

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
