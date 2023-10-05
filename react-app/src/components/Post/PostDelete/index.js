import React from "react"
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchAllPosts, fetchDeletePost } from "../../../store/post";

function PostDelete({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeletion = async(e) => {
    e.preventDefault();
    await dispatch(fetchDeletePost(post.id));
    await dispatch(fetchAllPosts())
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <h4>Confirm Post Deletion</h4>
      <button onClick={handleDeletion}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default PostDelete
