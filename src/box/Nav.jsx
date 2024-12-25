import React, { useState } from "react";
import logo from "../LeaseEase1.jpg";
import { Link } from "react-router-dom";
import "../index.css";
import "./Nav.css";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav">
      <div className="Navbar">
        <Link to="/" className="logo-link">
          <img src={logo} alt="LeaseEase Logo" />
          <span>LeaseEase</span>
        </Link>
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <span>
          <Link to="/About"
          >About</Link>
        </span>
        <span>
          <Link to="/Contact"
          >Contact</Link>
        </span>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={menuOpen}
      >
        &#9776;
      </button>
    </div>
  );
}

export default Nav;
