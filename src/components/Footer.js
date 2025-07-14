import React from 'react';
import './Footer.css';
import { FaSun, FaMoon, FaShareAlt } from 'react-icons/fa';

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
      {/* Floating Theme and Share buttons */}
      <div className="floating-buttons">
        <button onClick={toggleTheme} title="Toggle Theme">
          <FaMoon className="icon" />
        </button>
        <button onClick={shareWebsite} title="Share Website">
          <FaShareAlt className="icon" />
        </button>
      </div>

      {/* Footer Section */}
      <footer className="custom-footer">
        <div className="footer-flex">
          <div className="footer-column">
            <h2 className="footer-title">Back2youu</h2>
            <p className="footer-quote">
              🧡 Our mission is to reconnect people with their lost items — quickly, safely, and with kindness.
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
            <h4>Connect With Us</h4>
            <p>Email: back2youu@gmail.com</p>
            <p>Instagram: @back2youu</p>
          </div>
        </div>

        <p className="footer-bottom">Created with ❤️ by Aarohi Dixit</p>
      </footer>
    </>
  );
}

export default Footer;
