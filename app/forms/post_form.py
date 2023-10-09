from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from flask_wtf.file import FileAllowed, FileRequired

def length_range(min=-1, max=-1):
    def _length_range(form, field):
        if len(field.data) < min:
            raise ValidationError(f"Must be at least {min} characters.")
        if len(field.data) > max:
            raise ValidationError(f"Cannot exceed {max} characters.")
    return _length_range

class PostForm(FlaskForm):
  caption = StringField('caption', validators=[DataRequired(),length_range(min=2, max=120)])
  title = StringField('song title', validators=[DataRequired(), length_range(max=50)])
  artist = StringField('song artist', validators=[DataRequired(), length_range(max=50)])
  song = FileField('upload a song', validators=[FileRequired(), FileAllowed(['mp3'], 'mp3s only.')])
  photo = FileField('upload a photo', validators=[FileRequired(), FileAllowed(["png", "jpg", "jpeg", "gif"], 'images only.')])
  submit = SubmitField('submit')
