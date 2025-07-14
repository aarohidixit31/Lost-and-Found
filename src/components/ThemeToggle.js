import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaShareAlt } from 'react-icons/fa';
import './ThemeToggle.css';

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Apply or remove 'dark' class on <body>
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Back2Youu – Lost & Found',
          text: 'Report or find lost items easily on our campus!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      alert('Sharing is not supported on your browser!');
    }
  };

  return (
    <div className="floating-buttons">
      <button onClick={() => setDark(!dark)} title="Toggle Theme">
        {dark ? <FaSun /> : <FaMoon />}
      </button>
      <button onClick={handleShare} title="Share Website">
        <FaShareAlt />
      </button>
    </div>
  );
}

export default ThemeToggle;
