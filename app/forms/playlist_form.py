from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

class PlaylistForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(max=100)])
  private = BooleanField('private')
  submit = SubmitField('submit')
