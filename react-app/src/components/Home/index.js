import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchAllPosts } from "../../store/post";
import Post from "../Post";
import PlaylistPage from "../Playlist/index.js";
import { useViewContext } from '../../context/HomeView'
import "./Home.css";
import home from "../../images/home.svg"

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.allPosts);
  const currUser = useSelector(state => state.session.user);
  const { currentView, setCurrentView } = useViewContext();


  useEffect(() => {
    dispatch(fetchAllPosts());
    setCurrentView('home');
  }, [dispatch]);

  const handleHomeNavigate = (e) => {
    setCurrentView('home');
  };

  const handlePlaylistNavigate = (e) => {
    setCurrentView('playlist');
  };

  if(!posts || Object.values(posts).length === 0) return null
  if (!currUser) return <Redirect to="/" />;
  return (
    <div id="home-wrap">
      <div id="home-sidebar">
        <div className="sidebar-tile" onClick={handleHomeNavigate}>
          <img className="home-logo" src={home}></img>
          <p>home</p>
        </div>
        {/* <div div className="sidebar-tile">
          <i className="fa-regular fa-user"></i>
          <p>following</p>
        </div> */}
        <div div className="sidebar-tile" onClick={handlePlaylistNavigate}>
          <i className="fa-regular fa-circle-play"></i>
          <p>playlists</p>
        </div>
      </div>
      {currentView === 'home' && <div id="home-post-container">
       {Object.values(posts).map((post) => (
         <Post post={post} showManageButton={false}/>
       ))}
     </div>}
      {currentView === 'playlist' && <div id='home-playlist-container'>
      <PlaylistPage currUser={currUser} />
      </div>}
    </div>
  )
}


export default Home;
