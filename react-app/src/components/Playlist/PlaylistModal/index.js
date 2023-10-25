import React, { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './PlaylistModal.css'

function PlaylistModal({ playlist }) {
  const [currentSong, setCurrentSong] = useState(playlist.posts[0])
  const posts = playlist.posts;

  const handleSongChange = (post) => {
    setCurrentSong(post)
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

      {posts.map((post) => (
        <div onClick={() => handleSongChange(post)}>
        <p>{post.songTitle}</p>
        </div>
      ))}
    </div>
  )
};

export default PlaylistModal;
