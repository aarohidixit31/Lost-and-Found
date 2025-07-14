import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LostFoundList from '../components/LostFoundList';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Lost & Found Portal</h1>
          <p className="home-subtitle">
            Misplaced something? Or found someone else's belongings? Let’s get them back where they belong.
          </p>
          <Link to="/add" className="report-button">+ Report an Item</Link>
        </div>

        <div className="safety-tips">
          <h3>🔒 Safety Tips</h3>
          <ul>
            <li>Always verify item ownership before handing over.</li>
            <li>Meet in public places when returning or collecting items.</li>
            <li>Keep records or pictures of lost items.</li>
          </ul>
        </div>

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

        <div className="scroll-section">
          <LostFoundList searchTerm={searchTerm} filterType={filterType} />
        </div>
      </div>

      {/* 👇 These will be outside the home container */}
      <ThemeToggle />
      <Footer />
    </>
  );
}

export default Home;
