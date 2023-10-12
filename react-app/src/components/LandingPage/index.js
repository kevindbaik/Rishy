import './LandingPage.css'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";

function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();

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

  const closeMenu = () => setShowMenu(false);

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(login('demouser@aa.io', 'password'))
    .then(history.push('/posts'))
    .then(closeModal);
  };

  return(
    <div className='landing-bgimage-container'>
      <div id='landing-header-container'>
        <h3 className='landing-header-1'>Explore endless inspirations.</h3>
        <h4 className='landing-header-2'>Join the Rishy community, express your creative self, share personal experiences</h4>
        <h4 className='landing-header-3'>...all with the sound of music.</h4>
        <OpenModalButton
              buttonText="Get Started"
              styleClass="landing-join-button"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
        <button className='landing-demo-button' onClick={handleDemoLogin}>Visit as Demo User</button>
      </div>
    </div>
  )
};

export default LandingPage;
