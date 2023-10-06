import React, { useState } from "react";

function AddComment({ onSubmit }) {
  const [ comment, setComment ] = useState("");

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    if(comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea className="addcomment-textarea"
        value={comment}
        onChange={handleCommentChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a comment..." />
        <button type='submit'>Comment</button>
      </form>
    </div>
  )
};

export default AddComment;
