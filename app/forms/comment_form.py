from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class CommentForm(FlaskForm):
  content = TextAreaField("comment", validators=[DataRequired(), Length(min=6, max=200, message="comment must be between 6 and 200 characters.")])
