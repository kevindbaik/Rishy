import React from "react";
import '../Comment.css'

function Comment({ comment }) {
 return(
  <div className="onecomment-container">
    <p>{comment.content}</p>
    <p>{comment.createdAt}</p>
    <span>@{comment?.User?.username}</span>
</div>
 )};

export default Comment
