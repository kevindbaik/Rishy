import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserPosts } from "../../store/user";
import Post from "../Post";
import './UserProfile.css'

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user.User);
  const userPosts = useSelector(state => state.user.UserPosts);

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if(!user || !userPosts) return null;

  console.log(userPosts)
  console.log(user)
  return(
    <div id='userprofile-container'>
      <div id='userprofile-userinfo-container'>
        <img className="userprofile-profileimage" src="https://i.ibb.co/nRLSXSX/Default-pfp-svg.png" alt=""></img>
        <div className="userinfo-container">
          <p className="userinfo-fullname">{user.firstName} {user.lastName}</p>
          <div id="userinfo-bottomrow-container">
            <div className="userinfo-bottomrow-leftside">
              <p className="userinfo-username">@{user.username}</p>
              <p>0 followers</p>
              <p>0 following</p>
            </div>
            <div className="userinfo-bottomrow-rightside">
              {userPosts && <p>{Object.values(userPosts).length} posts</p>}
              {user && user.createdAt && <p>Joined: {user.createdAt}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
