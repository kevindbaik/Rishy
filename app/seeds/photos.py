from ..models import db, Photo, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()

def seed_photos():
  photos = [
    # 1
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/(1)+always.png",
      created_at=current_date
    ),

    # 2
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/(2)+spirited+away.jpg",
      created_at=current_date
    ),

    # 3
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/sunset.jpg",
      created_at=current_date
    ),

    #4
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tokyonight.jpg",
      created_at=current_date
    ),

    #5
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/nyview.jpg",
      created_at=current_date
    ),

    #6
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/la.jpg",
      created_at=current_date
    ),

    #7
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/doge.jpg",
      created_at=current_date
    ),

    #8
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/ponyo.jpg",
      created_at=current_date
    ),

    #9
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/rainy.jpg",
      created_at=current_date
    ),

    #10
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/beach.jpg",
      created_at=current_date
    ),

    #11 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/bakar-hellnback.jpg",
      created_at=current_date
    ),

    #12 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_5b7df44e582d2875f57f29a207719884_5cf8ed18_2048.jpg",
      created_at=current_date
    ),

    #13 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_90c444d7612bc856e1692ea464e1ced8_519c205b_1280-fotor-20231007213723.jpg",
      created_at=current_date
    ),

    #14 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_ngj7w4piEh1t7xi3po1_1280.jpg",
      created_at=current_date
    ),

    #15 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_n7avbwvioH1s1vanpo1_1280.jpg",
      created_at=current_date
    ),

    #16 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_220167d13b631b1b56b8e6862e88ddfe_0bcd3b94_1280.jpg",
      created_at=current_date
    ),

    #17 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_ce264e9f22343c10562edcd7c38062c3_666c13cd_1280.jpg",
      created_at=current_date
    ),

    #18 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_nlrpqw71xx1s3ya7go1_1280.jpg",
      created_at=current_date
    ),

    #19 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/unnamed.jpg",
      created_at=current_date
    ),

    #20 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_9a39efe52642e938182fdfd3d6c3a3f4_44c3236b_1280.jpg",
      created_at=current_date
    ),

    #21 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_ntjotetntm1r9ilkjo1_1280.jpg",
      created_at=current_date
    ),

    #22 D
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_n0d9c9xXp21rpowflo1_640.jpg",
      created_at=current_date
    ),

    #23 C
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_f7e214b7c2f25c1389bad8bb16bf027c_39e98b4f_2048.jpg",
      created_at=current_date
    ),

    #24
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_nyy140OLdT1rpowflo1_500.jpg",
      created_at=current_date
    ),

    #25
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/unnamed+(2).jpg",
      created_at=current_date
    ),

    #26
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/unnamed+(3).jpg",
      created_at=current_date
    ),

    #27
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_94c9237b5acd616d4d13ba4032aa3870_c7d992fb_1280.jpg",
      created_at=current_date
    ),

    #28
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_ncxw15lpZT1qa3pcgo1_1280.jpg",
      created_at=current_date
    ),

    #29
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_oabs5xCRyF1v09wbko1_500.jpg",
      created_at=current_date
    ),

    #30
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/tumblr_nu6hkvxzpf1uxot01o1_1280.jpg",
      created_at=current_date
    ),

    #31
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/maxresdefault.jpg",
      created_at=current_date
    ),

    #32
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/hq720.png",
      created_at=current_date
    ),

    #33
    Photo(
      photo_url="https://rishy-images.s3.us-west-1.amazonaws.com/Photos/super-junior-disney-plus%402000x1270.jpg",
      created_at=current_date
    ),

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
