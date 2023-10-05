import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './Post.css';
import OpenModalButton from "../OpenModalButton";
import UpdatePostForm from "./PostForm/UpdatePost";


function Post({ post }) {
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const handleViewPostDetail = e => {
    e.preventDefault()
    history.push(`/posts/${post.id}`)
  };

  console.log(post)
  return (
    <div id='allpost-container'>
      <img className='allpost-image' src={post?.photoUrl} onClick={handleViewPostDetail}></img>
      {user.id === post.userId &&
      <div className="user-managepost-buttons">
        <OpenModalButton modalComponent={<UpdatePostForm post={post}/>} buttonText={"+"}/>
        <button>-</button>
      </div>
      }
    </div>
  )
}

export default Post
