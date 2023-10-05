from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileAllowed, FileRequired

class PostForm(FlaskForm):
  caption = StringField('caption', validators=[DataRequired()])
  title = StringField('song title', validators=[DataRequired()])
  artist = StringField('song artist', validators=[DataRequired()])
  song = FileField('upload a song', validators=[FileRequired(), FileAllowed(['mp3'], 'mp3s only.')])
  photo = FileField('upload a photo', validators=[FileRequired(), FileAllowed(["png", "jpg", "jpeg", "gif"], 'images only.')])
  submit = SubmitField('submit')
