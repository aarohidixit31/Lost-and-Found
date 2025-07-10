import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LostFoundList from '../components/LostFoundList';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Lost & Found Portal</h1>
        <p className="home-subtitle">
          Misplaced something? Or found someone else's belongings? Let’s get them back where they belong.
        </p>
        <Link to="/add" className="report-button">+ Report an Item</Link>
      </div>

      

      {/* Mission banner */}
      <div className="info-banner">
        🧡 Our mission is to reconnect people with their lost items — quickly, safely, and with kindness.
      </div>

      {/* Safety Tips */}
      <div className="safety-tips">
        <h3>🔒 Safety Tips</h3>
        <ul>
          <li>Always verify item ownership before handing over.</li>
          <li>Meet in public places when returning or collecting items.</li>
          <li>Keep records or pictures of lost items.</li>
        </ul>
      </div>
      {/* Search and Filter */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            className="dropdown"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
      </div>

      {/* Filtered Lost & Found Items */}
      <LostFoundList searchTerm={searchTerm} filterType={filterType} />

      {/* Footer */}
      <footer className="home-footer">
        <p>Need help? <a href="#">Contact Us</a> | <a href="#">Privacy Policy</a> | <a href="#">FAQ</a></p>
        <p>© 2025 Lost & Found Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
