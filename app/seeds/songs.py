from ..models import db, Song, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_songs():
  songs = [
    # 1
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/(1)+keshi+-+always+(Audio).mp3",
      title="always",
      artist="keshi",
      created_at=current_date
    ),

    #2
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/the-name-of-life-spirited-away-piano_MZ2IgP7z.mp3",
      title="The Name of Life",
      artist="Spirited Away",
      created_at=current_date
    ),

    #3
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/No+Vacation+-+Days.mp3",
      title="Days",
      artist="No Vacation",
      created_at=current_date
    ),

    #4
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Porter+Robinson+-+Musician+(Official+Audio).mp3",
      title="Musician",
      artist="Porter Robinson",
      created_at=current_date
    ),

    #5
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/SALES+-+Your+Own+(Official+Music+Video).mp3",
      title="Your Own",
      artist="SALES",
      created_at=current_date
    ),

    #6
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Kind+of+a+Nice+Time.mp3",
      title="Kind of a Nice Time",
      artist="Vansire",
      created_at=current_date
    ),

    #7
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Frank+Ocean+-+In+My+Room+(Lyric+Video).mp3",
      title="In My Room",
      artist="Frank Ocean",
      created_at=current_date
    ),

    #8
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/ponyo+lofi++ponyo+on+the+cliff+by+the+sea+(ghibli+lofi).mp3",
      title="By the Sea",
      artist="Ponyo",
      created_at=current_date
    ),

    #9
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Men+I+Trust+-+Show+Me+How.mp3",
      title="Show Me How",
      artist="Men I Trust",
      created_at=current_date
    ),

    #10
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Dominic+Fike+_3+Nights_+(Official+Audio).mp3",
      title="3 Nights",
      artist="Dominic Fike",
      created_at=current_date
    ),

    #11 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Bakar+-+Right+Here+For+Now.mp3",
      title="Right Here, For Now",
      artist="Bakar",
      created_at=current_date
    ),

    #12 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Theme+of+Mitsuha.mp3",
      title="Theme of Mitsuha",
      artist="RADWIMPS",
      created_at=current_date
    ),

    #13 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Porter+Robinson+%26+Madeon+-+Shelter+(Official+Audio).mp3",
      title="Shelter",
      artist="Porter Robinson & Madeon",
      created_at=current_date
    ),

    #14 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Beach+House+-+Master+Of+None.mp3",
      title="Master of None",
      artist="Beach House",
      created_at=current_date
    ),

    #15 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/The+Mar%C3%ADas+-+I+Don't+Know+You+%5BLyrics%5D.mp3",
      title="I Don't Know You",
      artist="The Marias",
      created_at=current_date
    ),

    #16 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Bakar+-+Hell+N+Back+(Official+Audio)+ft.+Summer+Walker.mp3",
      title="Hell N Back",
      artist="Bakar",
      created_at=current_date
    ),

    #17 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Teedra+Moses+-+Be+Your+Girl+(KAYTRANADA+Edition).mp3",
      title="Be Your Girl (Remix)",
      artist="Kaytranada",
      created_at=current_date
    ),

    #18 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Local+Natives-Cubism+Dream+(lyrics).mp3",
      title="Cubism Dream",
      artist="Local Natives",
      created_at=current_date
    ),

    #19 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Local+Natives+-+Ceilings.mp3",
      title="Ceilings",
      artist="Local Natives",
      created_at=current_date
    ),

    #20 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/SZA+-+20+Something+(Audio).mp3",
      title="20 Something",
      artist="SZA",
      created_at=current_date
    ),

    #21 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Frank+Ocean+-+Provider.mp3",
      title="Provider",
      artist="Frank Ocean",
      created_at=current_date
    ),

    #22 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/CASTLEBEAT+-+Telephone+(feat.+Sonia+Gadhia).mp3",
      title="Telephone",
      artist="CASTLEBEAT",
      created_at=current_date
    ),

    #23 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Stop+This+Train.mp3",
      title="Stop This Train",
      artist="John Mayer",
      created_at=current_date
    ),

    #24 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Miel+de+Montagne+-+J'y+Peux+Rien+(Official+Audio).mp3",
      title="J'y Peux Rien",
      artist="Miel de Montagne",
      created_at=current_date
    ),

    #25
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/The+Strokes+-+Someday.mp3",
      title="Someday",
      artist="The Strokes",
      created_at=current_date
    ),

    #26 D
    Song(
      song_url="https://rishy-images.s3.us-west-1.amazonaws.com/Songs/Vansire+-+Nice+to+See+You+(ft.+Floor+Cry).mp3",
      title="Nice to See You",
      artist="Vansire",
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
