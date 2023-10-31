import React, { useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import UpdatePostForm from "../../Post/PostForm/UpdatePost";
import PostDelete from "../../Post/PostDelete";
import UserPostModal from "./UserPostModal";
import './UserPost.css'

function UserPost({userPost, sessionUser}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    setIsModalOpen(false);
  };

  return (
    <div id='userpost-container'>
      <img className='userpost-image' src={userPost?.photoUrl} onClick={handleOpenModal}></img>
      {sessionUser && sessionUser.id === userPost.userId &&
      <div className="user-managepost-buttons">
        <OpenModalButton styleClass="userpost-edit-button" modalComponent={<UpdatePostForm post={userPost}/>} buttonText={"edit"}/>
        <OpenModalButton styleClass="userpost-remove-button" modalComponent={<PostDelete post={userPost} user={sessionUser}/>} buttonText={"remove"}/>
      </div>
      }
      {isModalOpen &&
           <>
           <div className="modal-backdrop" onClick={handleCloseModal}></div>
            <UserPostModal userPost={userPost} sessionUser={sessionUser} handleClose={handleCloseModal}/>
          </>
      }
    </div>
  )
};

export default UserPost
