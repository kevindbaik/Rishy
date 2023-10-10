import React, { useState } from "react";

function AddComment({ onSubmit, initialValue = "" }) {
  const [ comment, setComment ] = useState(initialValue);

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
    <div id="addcomment-bar">
      <form onSubmit={handleCommentSubmit}>
        <textarea className="addcomment-textarea"
        value={comment}
        onChange={handleCommentChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a comment..."
        required
        />
        <button id='submit-comment-button' type='submit'>submit</button>
      </form>
    </div>
  )
};

export default AddComment;
