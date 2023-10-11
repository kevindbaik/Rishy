import React, { Children } from "react";
import { useHistory } from 'react-router-dom';
import OpenModalButton from "../../OpenModalButton";
import UpdatePostForm from "../../Post/PostForm/UpdatePost";
import PostDelete from "../../Post/PostDelete";
import './UserPost.css'

function UserPost({userPost, sessionUser}) {
  const history = useHistory();

  const handleViewPostDetail = e => {
    e.preventDefault()
    history.push(`/posts/${userPost.id}`)
  };

  return (
    <div id='userpost-container'>
      <img className='userpost-image' src={userPost?.photoUrl} onClick={handleViewPostDetail}></img>
      {sessionUser && sessionUser.id === userPost.userId &&
      <div className="user-managepost-buttons">
        <OpenModalButton styleClass="userpost-edit-button" modalComponent={<UpdatePostForm post={userPost}/>} buttonText={"edit"}/>
        <OpenModalButton styleClass="userpost-remove-button" modalComponent={<PostDelete post={userPost} user={sessionUser}/>} buttonText={"remove"}/>
      </div>
      }
    </div>
  )
};

export default UserPost
