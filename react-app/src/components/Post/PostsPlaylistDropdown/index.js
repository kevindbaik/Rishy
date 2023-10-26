import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Menu, MenuItem } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { fetchAddPostToPlaylist, fetchRemovePostFromPlaylist } from "../../../store/user";
import { fetchOnePost } from "../../../store/post";

function PostPlaylistDropdown({ post, user, playlists }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostPlaylist = async (playlist) => {
    if(checkPostInPlaylist(post, playlist.id)){
      console.log('reeemoving....')
      await dispatch(fetchRemovePostFromPlaylist(playlist.id, post.id, user.id));
      await dispatch(fetchOnePost(post.id));
      setAnchorEl(null);
    }
    else {
      await dispatch(fetchAddPostToPlaylist(playlist.id, post.id, user.id));
      await dispatch(fetchOnePost(post.id));
      setAnchorEl(null);
    };
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkPostInPlaylist = (post, playlistId) => {
    const postPlaylistIds = Object.values(post.playlists).map(postPlaylist => postPlaylist.id);

    return postPlaylistIds.includes(playlistId);
  }

  return (
    <div>
      <IconButton
        aria-controls="playlists-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PlaylistAddIcon />
      </IconButton>
      <Menu
        id="playlists-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.values(playlists).map((playlist) => (
          <MenuItem key={playlist.id} onClick={(e) => handlePostPlaylist(playlist)}>
          {checkPostInPlaylist(post, playlist.id) ? '-' : '+'} {playlist.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PostPlaylistDropdown
