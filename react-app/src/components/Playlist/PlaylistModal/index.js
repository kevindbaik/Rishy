import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './PlaylistModal.css'
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { fetchRemovePostFromPlaylist } from "../../../store/user";

function PlaylistModal({ playlist, currUser, user }) {
  const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState(playlist.posts[0]);
  const currPlaylist = useSelector(state => state.user.UserPlaylists[playlist.id]);

  const handleSongChange = (post) => {
    setCurrentSong(post)
  };

  const handleRemoveFromPlaylist = async (postId) => {
    if(postId === currPlaylist.posts[0].id) {
      setCurrentSong(currPlaylist.posts[1])
    };

    await dispatch(fetchRemovePostFromPlaylist(playlist.id, postId, currUser.id));
  };

  const handleNextSong = () => {
  const currentSongIndex = currPlaylist.posts.findIndex(post => post.id === currentSong.id);
  const nextSongIndex = (currentSongIndex + 1) % currPlaylist.posts.length;
  setCurrentSong(currPlaylist.posts[nextSongIndex]);
  }

  return (
    <div id='playlistmodal-container'>
      <div id='playlistmodal-currentpost'>
        <img className="playlistmodal-songimage" src={currentSong.photoUrl}></img>
        <p className="currentpost-song">{currentSong.songTitle} - {currentSong.songArtist}</p>
        <p className="currentpost-creator">posted by: @{currentSong.User.username}</p>
        <AudioPlayer
        className='playlistmodal-audioplayer'
        src={currentSong.songUrl}
        autoPlay={true}
        volume={0.5}
        showSkipControls={false}
        onEnded={handleNextSong}
        />
       </div>

      <div id='playlistmodal-sidebar'>
        <div>
          <p className="playlistmodal-title">{playlist.name}</p>
          <div id='sidebar-info'>
            {playlist.private ?
            <div className="playlistmodal-privacy">
            <i class="fa-solid fa-lock"></i>
            <p>Private</p>
            </div> :
            <div className="playlistmodal-privacy">
            <i class="fa-solid fa-unlock"></i>
            <p>Public</p>
            </div>}
            <p>{user.username}</p>
            <p>{currPlaylist.posts.length} posts</p>
          </div>
        </div>

       <Box id='playlistmodal-postque' sx={{ maxHeight: 450, overflowY: 'auto' }}>
      {currPlaylist.posts.map((post) => (
        <div className={`playlistmodal-onepost ${currentSong.id === post.id ? 'playlistmodal-onepost-highlighted' : ''}`} onClick={() => handleSongChange(post)}>
          <div className="onepost-playinfo">
            <img className="onepost-previewimg" src={post.photoUrl}></img>
            <div className="preview-playinfo">
              <p>{post.songTitle}</p>
              <p>{post.songArtist}</p>
            </div>
          </div>
          {currUser && currUser.id === playlist.userId &&
            <CloseIcon style={{ cursor: 'pointer' }} onClick={(e) => handleRemoveFromPlaylist(post.id)} />
          }
        </div>
      ))}
      </Box>
    </div>
    </div>
  )
};

export default PlaylistModal;
