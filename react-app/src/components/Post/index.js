import React from "react"
import { useHistory } from 'react-router-dom'
import './Post.css'


function Post({ post }) {
  const history = useHistory()
  const handleViewPostDetail = e => {
    e.preventDefault()
    history.push(`/posts/${post.id}`)
  }
  return (
    <div id='allpost-container'>
      <img className='allpost-image' src={post?.photoUrl} onClick={handleViewPostDetail}></img>
    </div>
  )
}

export default Post
