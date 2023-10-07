import React from "react"
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchDeleteComment } from "../../../store/comment";

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
    <div>
      <h4>Confirm Comment Deletion</h4>
      <button onClick={handleDeletion}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default CommentDelete
