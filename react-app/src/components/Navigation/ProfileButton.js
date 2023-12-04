import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePostForm from "../Post/PostForm/CreatePost";

function ProfileButton({ user, onHomePage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <div id='nav-profiledropdown-container'>
        {user ? (
          <div id='loggedin-dropdown'>
            <OpenModalButton onButtonClick={e => !onHomePage} styleClass="nav-create-button" modalComponent={<CreatePostForm />} buttonText={"+"}/>
            <NavLink style={{ textDecoration: "none", color: "black" }}
                onClick={closeMenu}
                to={`/users/${user.id}/posts`}>
             <img className="defaultuser-image-nav" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt=""></img>
            </NavLink>
            <button className="nav-logout-button" onClick={handleLogout}>Log Out</button>
          </div>


        ) : (
          <div id="nav-loginsignup-container">
            <OpenModalButton
              buttonText="Sign Up"
              styleClass="nav-signup-button"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalButton
              buttonText="Log In"
              styleClass="nav-login-button"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
        )}
    </div>
  );
}

export default ProfileButton;
