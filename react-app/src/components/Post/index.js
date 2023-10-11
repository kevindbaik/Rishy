import React from "react";
import { useHistory } from 'react-router-dom';
import './Post.css';



function Post({ post }) {
  const history = useHistory();

  const handleViewPostDetail = e => {
    e.preventDefault()
    history.push(`/posts/${post.id}`)
  };

  return (
    <div id='allpost-container'>
      <img className='allpost-image' src={post?.photoUrl} onClick={handleViewPostDetail}></img>
      <div className="allpost-caption">
        <p className="allpost-title">{post.songArtist} - {post.songTitle}</p>
        <p className="allpost-creator">by {post.User.username}</p>
        <div className="allpost-commentcount">
          <i class="fa-sharp fa-regular fa-comment"></i>
          <p>{post.commentCount}</p>
        </div>
      </div>
    </div>
  )
}

export default Post
