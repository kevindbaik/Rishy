from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .photos import seed_photos, undo_photos
from .songs import seed_songs, undo_songs
from .comments import seed_comments, undo_comments
from .playlist import seed_playlists, undo_playlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_playlists()
        undo_comments()
        undo_posts()
        undo_songs()
        undo_photos()
        undo_users()
    seed_users()
    seed_photos()
    seed_songs()
    posts = seed_posts()
    seed_comments()
    seed_playlists(posts)

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_playlists()
    undo_comments()
    undo_posts()
    undo_songs()
    undo_photos()
    undo_users()
