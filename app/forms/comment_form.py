from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class CommentForm(FlaskForm):
  content = TextAreaField("comment", validators=[DataRequired(), Length(min=1, max=200, message="comment must be between 1 and 200 characters.")])
