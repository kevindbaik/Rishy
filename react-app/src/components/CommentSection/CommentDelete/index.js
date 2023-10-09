import React from "react"
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchDeleteComment } from "../../../store/comment";
import './CommentDelete.css'

function CommentDelete({ comment }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeletion = async(e) => {
    e.preventDefault();
    await dispatch(fetchDeleteComment(comment.id));
    closeModal();
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div id='commentdelete-container'>
      <h4>Confirm Deletion</h4>
      <button onClick={handleDeletion}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default CommentDelete
