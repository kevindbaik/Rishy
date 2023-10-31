import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, fetchUserPlaylists, fetchUserPosts } from "../../store/user";
import UserPost from "./UserPost";
import './UserProfile.css';
import UserPlaylist from "./UserPlaylist";
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/system';
import TabPanel from '../TabPanel/'

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user.User);
  const sessionUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => state.user.UserPosts);
  const userPlaylists = useSelector(state => state.user.UserPlaylists)
  const [ profileTab, setProfileTab ] = useState(0);

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchUserPosts(userId));
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch, userId]);

  const handleChange = (e, value) => {
    setProfileTab(value);
  };

  const StyledTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
      backgroundColor: 'black',
    }
  }));

  const StyledTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
      color: 'black',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: 'black',
      opacity: 0.8,
    },
  }));

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={profileTab} onChange={handleChange} aria-label="user profile tabs">
        <StyledTab label="posts" />
        <StyledTab label="playlists" />
      </StyledTabs>
      </Box>
      </div>

        <TabPanel value={profileTab} index={0}>
          <div id='all-userpost-container'>
            {Object.values(userPosts).map((userPost) => (
              <UserPost userPost={userPost} sessionUser={sessionUser}/>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={profileTab} index={1} style={{ width: '100%' }}>
          <div div id='all-userplaylist-container' className={Object.values(userPlaylists).length > 0 ? 'grid' : 'flex'}>
            {Object.values(userPlaylists).length >= 1 ?
            <>
            {Object.values(userPlaylists).map((userPlaylist) => (
              <UserPlaylist userPlaylist={userPlaylist} currUser={sessionUser} user={user}/>
            ))}
            </>
            :
            <p className="all-noplaylist">User has no collections</p>}
          </div>
        </TabPanel>

    </div>
  )
}

export default UserProfile
