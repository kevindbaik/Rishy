import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserPosts } from "../../store/user";
import UserPost from "./UserPost";
import './UserProfile.css'

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user.User);
  const userPosts = useSelector(state => state.user.UserPosts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if(!user || !userPosts) return null;

  return(
    <div id="userprofile-wrap">
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
      <div id='all-userpost-container'>
        {Object.values(userPosts).map((userPost) => (
          <UserPost userPost={userPost} sessionUser={sessionUser}/>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
