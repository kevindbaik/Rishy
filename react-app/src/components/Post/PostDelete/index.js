import React from "react"
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchDeleteUserPost } from "../../../store/user";
import './PostDelete.css'

function PostDelete({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeletion = async(e) => {
    e.preventDefault();
    await dispatch(fetchDeleteUserPost(post.id));
    closeModal();
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div id='postdelete-container'>
      <h4>Confirm Post Deletion</h4>
      <button onClick={handleDeletion}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default PostDelete
