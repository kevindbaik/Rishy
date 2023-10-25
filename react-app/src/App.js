import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Home from './components/Home'
import PostDetails from "./components/Post/PostDetails";
import UserProfile from "./components/UserProfile";
// import PlaylistPage from "./components/Playlist";
import Footer from "./components/Footer";
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id='page-container'>
      <div id='content-wrap'>
        <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/posts/:postId'>
            <PostDetails />
          </Route>
          <Route exact path='/posts'>
            <Home />
          </Route>
          <Route exact path='/users/:userId/posts'>
            <UserProfile />
          </Route>
          {/* <Route exact path='/playlists'>
            <PlaylistPage />
          </Route> */}
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
        </Switch>
      )}
      </div>
      <Footer isLoaded={isLoaded} />
    </div>
  );
}

export default App;
