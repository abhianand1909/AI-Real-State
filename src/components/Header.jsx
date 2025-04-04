import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏢</span>
          <span className="logo-text">AI Building Design</span>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/market-trends" className={`nav-link ${isActive('/market-trends')}`}>
            <span className="nav-icon">📊</span>
            <span>Market Trends</span>
          </Link>
          <Link to="/zoning-optimizer" className={`nav-link ${isActive('/zoning-optimizer')}`}>
            <span className="nav-icon">🏗️</span>
            <span>Zoning Optimizer</span>
          </Link>
          <Link to="/financial-analysis" className={`nav-link ${isActive('/financial-analysis')}`}>
            <span className="nav-icon">💰</span>
            <span>Financial Analysis</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
