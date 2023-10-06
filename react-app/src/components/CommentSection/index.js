import React from 'react';
import Comment from './Comment';

function CommentSection({ comments, user }) {

  const sortComments = (reviewA, reviewB) => {
    const dateA = new Date(reviewA.createdAt)
    const dateB = new Date(reviewB.createdAt)
    return dateB - dateA
  };

  return(
    <div className='allcomments-container'>
      {Object.values(comments).sort(sortComments).map(comment => (
        <Comment key={comment.id} comment={comment} user={user}/>
      ))}
    </div>
  )
};

export default CommentSection;
