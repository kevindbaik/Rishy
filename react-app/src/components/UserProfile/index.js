import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../store/user";
import Post from "../Post";
import './UserProfile.css'

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userPosts = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if(!userPosts) return null;

  return(
    <div>
      <div id='userprofile-post-container'>
        {Object.values(userPosts).map((post) => (
          <Post post={post }/>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
