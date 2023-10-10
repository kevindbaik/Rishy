import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/post";
import Post from "../Post";
import "./Home.css"

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.allPosts);

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch]);

  if(!posts || Object.values(posts).length === 0) return null

  const postLayouts = [2, 2, 2, 1, 1, 3, 1, 1, 2, 1];
  return (
    <div>
      <div id="home-container">
        {Object.values(posts).map((post) => (
          <Post post={post} showManageButton={false}/>
        ))}
      </div>
    </div>
  )
}


export default Home;
