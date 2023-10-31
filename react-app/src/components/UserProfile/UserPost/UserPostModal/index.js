import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './UserPostModal.css'
import { fetchLoadComments } from "../../../../store/comment"
import { fetchUserPlaylists } from "../../../../store/user";
import CommentSection from "../../../CommentSection";
import PostPlaylistDropdown from "../../../Post/PostsPlaylistDropdown";

function UserPostModal({ userPost, sessionUser, handleClose}) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const history = useHistory();
  const comments = useSelector(state => state.comments);
  const playlists = useSelector(state => state.user.UserPlaylists);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    dispatch(fetchLoadComments(userPost.id))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserPlaylists(sessionUser.id))
  }, [dispatch, sessionUser.id]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       handleClose();
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [handleClose]);

  const handleNavigatePostDetails = (e) => {
    e.preventDefault()
    history.push(`/posts/${userPost.id}`)
  };

  const handleShowComments = (e) => {
    setShowComments(true);
  };

  const handleHideComments = (e) => {
    setShowComments(false);
  }

  console.log('comments', comments)
  console.log('uuuserpost', userPost)
  console.log('xxxx', sessionUser)
  console.log('pppp', playlists)
  return(
    <div id='userpostmodal-container' ref={modalRef}>
      <div className="userpostmodal-header">
        <img className="userpostmodal-ppic" src="https://i.ibb.co/nRLSXSX/Default-pfp-svg.png" alt=""></img>
        <p>{userPost.User.username}</p>

        <button id="userpostmodal-redirect" onClick={handleNavigatePostDetails}>view page</button>
      </div>
      <div id='userpostmodal-media-container'>
          <img className="userpostmodal-photo" src={userPost.photoUrl}></img>
          <p className="userpostmodal-song">{userPost.songTitle} - {userPost.songArtist}</p>
          <AudioPlayer
          className='playlistmodal-audioplayer profilemodal-audioplayer'
          src={userPost.songUrl}
          autoPlay={true}
          volume={0.5}
          showSkipControls={false}
          />
          <div className="userpostmodal-playlist">
            <PostPlaylistDropdown post={userPost} user={sessionUser} playlists={playlists}/>
            </div>
      </div>

      <div className="userpostmodal-info-container">
        <div className="userpostmodal-info">
          <p className="userpostmodal-caption"> <strong>@{userPost.User.username}</strong>: {userPost.caption}</p>
          {showComments ? <p id="caption-showcomments" onClick={handleHideComments}>hide comments</p> : <p id="caption-showcomments" onClick={handleShowComments}>show comments</p>}
        </div>

        {showComments && <CommentSection comments={comments} user={sessionUser} isProfile={true} handleClose={handleClose}/>}
      </div>
    </div>
  )
};

export default UserPostModal;
