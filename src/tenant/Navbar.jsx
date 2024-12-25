import React, { useState } from "react";
import logo from "../LeaseEase1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../box/AuthContext";
import "../index.css";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="nav2">
      <div className="logo">
        <Link>
          <img src={logo} alt="" />
          <span>LeaseEase</span>
        </Link>
      </div>
      <div className={`Navbar_2 ${menuOpen ? "show" : ""}`}>
        <Link className="status" to={"/Status"}>
          STATUS
        </Link>
        <Link className="form" to={"/Form"}>
          FORM
        </Link>
        <Link className="payment" to={"/Payment"}>
          PAYMENT
        </Link>

        <span>
          <Link to="/Abouts">About</Link>
        </span>
        <span>
          <Link to="/Contacts">Contact</Link>
        </span>
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>
    </div>
  );
}

export default Navbar;
