import React from 'react';
import './Footer.css';
import OpenModalButton from '../OpenModalButton';
import AboutPetsyModal from './AboutRishyModal';

function Footer() {
  const handleGitHub = (e) => {
    e.preventDefault();
    window.open('https://github.com/kevindbaik');
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
      <OpenModalButton buttonText='About' styleClass='footer-about-button' modalComponent={AboutPetsyModal} />
        <div className='footer-right-container'>
        <div className='footer-contact-container'>
          <p className='footer-contact' onClick={handleGitHub} cl>Contact</p>
          <i className="fa-brands fa-github footer-github" onClick={handleGitHub}></i>
        </div>
        <p className='footer-copyright'>© 2023 rishy.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
