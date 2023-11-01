import React from "react"
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchDeleteUserPost, fetchUserPosts } from "../../../store/user";
import './PostDelete.css'

function PostDelete({ post, user }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeletion = async(e) => {
    e.preventDefault();
    await dispatch(fetchDeleteUserPost(post.id));
    dispatch(fetchUserPosts(user.id));
    closeModal();
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div id='postdelete-container'>
      <h4>confirm deletion</h4>
      <button id='confirm-delete-button' onClick={handleDeletion}>confirm</button>
      <button id='cancel-delete-button' onClick={handleCancel}>cancel</button>
    </div>
  )
}

export default PostDelete
