import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Menu, MenuItem, Modal, Box, chipClasses } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { fetchAddPostToPlaylist, fetchCreateUserPlaylist, fetchRemovePostFromPlaylist,  fetchUserPosts} from "../../../store/user";
import { fetchOnePost } from "../../../store/post";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import PlaylistForm from "../../Playlist/PlaylistForm";

function PostPlaylistDropdown({ post, user, playlists }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handlePostPlaylist = async (playlist) => {
    if(checkPostInPlaylist(post, playlist.id)){
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
    if (!post || typeof post.playlists !== 'object') {
      return false;
    };

    const postPlaylistIds = Object.values(post?.playlists).map(postPlaylist => postPlaylist.id);
    return postPlaylistIds.includes(playlistId);
  };

  const onSubmit = async(data) => {
    try {
      await dispatch(fetchCreateUserPlaylist(data, user.id));
      setErrors([])
    }
    catch(error) {
      setErrors(error)
    } finally {
      handleCreateClose();
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="playlists-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ 'color' : 'rgb(93, 93, 93)'}}
      >
        <PlaylistAddIcon />
      </IconButton>
        <Menu
          id="playlists-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '.MuiPaper-root': { boxShadow: '6' }
          }}
        >
          {Object.values(playlists).map((playlist) => (
            <div className="testing-play" style={{ width: '250px', overflow: 'hidden' }}>
            <MenuItem key={playlist.id} style={{ fontSize: '14px', width: '250px', wordBreak: 'break-word', overflowWrap: 'break-word',  whiteSpace: 'normal'}} onClick={(e) => handlePostPlaylist(playlist)}>
          {playlist.name} {checkPostInPlaylist(post, playlist?.id) ? < RemoveCircleOutlinedIcon style={{ fontSize: '15px', marginLeft:'6px' }}/> : <AddCircleOutlineOutlinedIcon style={{ fontSize: '15px', marginLeft:'6px' }}/>}
            </MenuItem>
            </div>
          ))}
            <MenuItem style={{ fontSize: '14px' }} onClick={handleCreateOpen}>
            {errors && errors.name && <p style={{ color: 'red' }}>playlist name too long</p>}
              <IconButton size="small">
                <AddCircleOutlineOutlinedIcon style={{ color:'black', fontSize: '15px' }}/>
              </IconButton>
            </MenuItem>
          <Modal
          open={open}
          onClose={handleCreateClose}
          aria-labelledby="create-playlist-modal"
          aria-describedby="create-playlist-form">
            <Box sx={{   position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 240,
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                boxShadow: 2,
                p: 4,
                borderRadius: '10px' }}>
              <PlaylistForm onSubmit={onSubmit} />
            </Box>
          </Modal>
        </Menu>
    </div>
  );
};

export default PostPlaylistDropdown
