import React from "react";
import '../Comment.css'

function Comment({ comment }) {
 return(
  <div className="onecomment-container">
    <p>{comment.content}</p>
    <span>@{comment.User.username}</span>
</div>
 )};

export default Comment
