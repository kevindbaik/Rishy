import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './PlaylistModal.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchRemovePostFromPlaylist } from "../../../store/user";

function PlaylistModal({ playlist, currUser }) {
  const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState(playlist.posts[0]);
  const currPlaylist = useSelector(state => state.user.UserPlaylists[playlist.id]);

  // useEffect(() => {
  //   if (currPlaylist && currPlaylist.posts.length > 0) {
  //     setCurrentSong(playlist.posts[0]);
  //   }
  // }, [playlist]);

  const handleSongChange = (post) => {
    setCurrentSong(post)
  };

  const handleRemoveFromPlaylist = async (postId) => {
    if(postId === currPlaylist.posts[0].id) {
      setCurrentSong(currPlaylist.posts[1])
    };

    await dispatch(fetchRemovePostFromPlaylist(playlist.id, postId, currUser.id));
  };

  return (
    <div>
        <img className="playlistmodal-songimage" src={currentSong.photoUrl}></img>
        <AudioPlayer
        id='onepost-audioplayer'
        src={currentSong.songUrl}
        autoPlay={false}
        volume={0.5}
        showSkipControls={false}
        />
       <h3>{currentSong.songTitle} - {currentSong.songArtist}</h3>

      {currPlaylist.posts.map((post) => (
        <div>
          <div onClick={() => handleSongChange(post)}>
          <p>{post.songTitle}</p>
          </div>
        <DeleteIcon onClick={(e) => handleRemoveFromPlaylist(post.id)} />
        </div>
      ))}
    </div>
  )
};

export default PlaylistModal;
