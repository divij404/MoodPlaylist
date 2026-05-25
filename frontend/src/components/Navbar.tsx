import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isLanding = location.pathname === "/";

  return (
    <nav className={`navbar${scrolled || !isLanding ? " navbar--solid" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-dot" />
            MoodPlaylist
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="nav-links nav-links--desktop">
          <Link to="/" className={`nav-item${isActive("/") ? " nav-item--active" : ""}`}>
            Home
          </Link>
          <Link to="/library" className={`nav-item${isActive("/library") ? " nav-item--active" : ""}`}>
            Library
          </Link>
          <Link to="/app" className="nav-cta">
            Find my playlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="nav-mobile-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/app" className="nav-item">Find my playlist</Link>
          <Link to="/library" className="nav-item">Library</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
