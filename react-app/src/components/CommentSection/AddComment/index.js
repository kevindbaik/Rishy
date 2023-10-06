import React, { useState } from "react";

function AddComment({ onSubmit }) {
  const [ comment, setComment ] = useState("");

  const handleCommentSubmit = e => {
    e.preventDefault();
    if(comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  }

  return (
    <div>
      <textarea className="addcomment-textarea" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
      <button onClick={handleCommentSubmit}>Comment</button>
    </div>
  )
};

export default AddComment;
