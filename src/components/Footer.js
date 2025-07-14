import React from 'react';
import './Footer.css';
import { FaSun, FaMoon, FaShareAlt, FaInstagram, FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';

function Footer() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  const shareWebsite = async () => {
    try {
      await navigator.share({
        title: 'Back2youu – Lost & Found Portal',
        text: 'Report or find lost items easily at Back2youu!',
        url: window.location.href,
      });
    } catch (err) {
      console.log('Sharing not supported:', err);
    }
  };

  return (
    <>
      <div className="floating-buttons">
        <button onClick={toggleTheme} title="Toggle Theme">
          <FaMoon className="icon" />
        </button>
        <button onClick={shareWebsite} title="Share Website">
          <FaShareAlt className="icon" />
        </button>
      </div>

      <footer className="custom-footer">
        <div className="footer-flex">
          <div className="footer-column">
            <h2 className="footer-title">Back2youu</h2>
            <p className="footer-quote">
              Our mission is to reconnect people with their lost items-quickly, safely, and with kindness.🧡 
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/add">Report</a></li>
              <li><a href="/myreports">My Reports</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Connect With Me</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/aarohi.inframe" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/aarohidixit/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/aarohidixit31" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://linktr.ee/aarohi.dixit" target="_blank" rel="noopener noreferrer"><FaLink /></a>
            </div>
          </div>
        </div>

        <p className="footer-bottom">
          Created with ❤️ by <a href="https://www.linkedin.com/in/aarohidixit/" target="_blank" rel="noopener noreferrer">Aarohi Dixit</a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
