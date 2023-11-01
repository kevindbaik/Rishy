import React from 'react';
import './Footer.css';
import OpenModalButton from '../OpenModalButton';
import AboutPetsyModal from './AboutRishyModal';

function Footer() {
  const handleGitHub = (e) => {
    e.preventDefault();
    window.open('https://github.com/kevindbaik');
  };

  const handleLinkedin = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/kevin-baik-311438193/');
  };

  const handlePortfolio = (e) => {
    e.preventDefault();
    window.open('https://www.kevinbaik.com');
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
      <OpenModalButton buttonText='About' styleClass='footer-about-button footer-icon' modalComponent={AboutPetsyModal} />
      <p> React </p>
      <p> Redux </p>
      <p> Flask </p>
      <p> PostgreSQL</p>
        <div className='footer-right-container'>
        <div className='footer-contact-container'>
          <p className='footer-contact'>Developer:</p>
          <div className='footer-dev-icons'>
          <i class="fa-solid fa-user-tie footer-icon" onClick={handlePortfolio}></i>
          <i className="fa-brands fa-github footer-icon" onClick={handleGitHub}></i>
          <i class="fa-brands fa-linkedin footer-icon" onClick={handleLinkedin}></i>
          </div>
        </div>
        <p className='footer-copyright'>© 2023 rishy.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
