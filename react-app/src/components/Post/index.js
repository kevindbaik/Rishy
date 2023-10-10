import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './Post.css';
import OpenModalButton from "../OpenModalButton";
import UpdatePostForm from "./PostForm/UpdatePost";
import PostDelete from "./PostDelete";


function Post({ post, showManageButton = false }) {
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const handleViewPostDetail = e => {
    e.preventDefault()
    history.push(`/posts/${post.id}`)
  };

  return (
    <div id='allpost-container'>
      <div className="figure">
      <img className='allpost-image' src={post?.photoUrl} onClick={handleViewPostDetail}></img>
      </div>
      {showManageButton && user.id === post.userId &&
      <div className="user-managepost-buttons">
        <OpenModalButton modalComponent={<UpdatePostForm post={post}/>} buttonText={"+"}/>
        <OpenModalButton modalComponent={<PostDelete post={post}/>} buttonText={"-"}/>
      </div>
      }
    </div>
  )
}

export default Post
