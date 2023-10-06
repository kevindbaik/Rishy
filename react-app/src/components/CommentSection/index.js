import React from 'react';
import Comment from './Comment';

function CommentSection({ comments }) {
  return(
    <div className='allcomments-container'>
      {Object.values(comments).map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
};

export default CommentSection;
