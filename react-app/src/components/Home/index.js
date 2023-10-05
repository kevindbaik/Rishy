import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/post";
import Post from "../Post";
import "./Home.css"
import OpenModalButton from "../OpenModalButton";
import CreatePostForm from "../Post/PostForm/CreatePost";


function Home() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.allPosts)

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  if(!posts || Object.values(posts).length === 0) return null

  return (
    <div>
      <OpenModalButton modalComponent={<CreatePostForm />} buttonText={"Create a Post"}/>
      <div id="home-container">
        {Object.values(posts).map((post) => (
          <Post post={post}/>
        ))}
      </div>
    </div>
  )
}


export default Home;
