import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Menu, MenuItem, Modal, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { fetchAddPostToPlaylist, fetchCreateUserPlaylist, fetchRemovePostFromPlaylist } from "../../../store/user";
import { fetchOnePost } from "../../../store/post";
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistForm from "../../Playlist/PlaylistForm";

function PostPlaylistDropdown({ post, user, playlists }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostPlaylist = async (playlist) => {
    if(checkPostInPlaylist(post, playlist.id)){
      console.log('reeemoving....')
      await dispatch(fetchRemovePostFromPlaylist(playlist.id, post.id, user.id));
      await dispatch(fetchOnePost(post.id));
    }
    else {
      await dispatch(fetchAddPostToPlaylist(playlist.id, post.id, user.id));
      await dispatch(fetchOnePost(post.id));
    };
  };

  const handleCreateOpen = () => {
    setOpen(true);
  };

  const handleCreateClose = () => {
    setOpen(false);
  };

  const checkPostInPlaylist = (post, playlistId) => {
    if(!post || !post.playlist) {
      return false
    };

    const postPlaylistIds = Object.values(post?.playlists).map(postPlaylist => postPlaylist.id);
    return postPlaylistIds.includes(playlistId);
  };

  const onSubmit = async(data) => {
    await dispatch(fetchCreateUserPlaylist(data, user.id));
    handleCreateClose();
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
          {playlist.name} {checkPostInPlaylist(post, playlist.id) ? <RemoveIcon /> : <AddIcon />}
            </MenuItem>
          ))}
            <MenuItem onClick={handleCreateOpen}>
            <IconButton size="small">
              <AddBoxIcon />
            </IconButton>
            Create New Playlist
          </MenuItem>
          <Modal
          open={open}
          onClose={handleCreateClose}
          aria-labelledby="create-playlist-modal"
          aria-describedby="create-playlist-form"
        >
            <Box sx={{   position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 240,
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                boxShadow: 20,
                p: 4 }}>
              <PlaylistForm onSubmit={onSubmit} />
            </Box>
          </Modal>
        </Menu>
    </div>
  );
};

export default PostPlaylistDropdown
