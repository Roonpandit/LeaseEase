import React, { useState } from "react";
import logo from "../LeaseEase1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../box/AuthContext";
import "../index.css";
import "./Navbar_1.css";

function Navbar_1() {
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
    <div className="nav1">
      <div className="logo">
        <Link>
          <img src={logo} alt="Logo" />
          <span>LeaseEase</span>
        </Link>
      </div>
      <div className={`Navbar_1 ${menuOpen ? "show" : ""}`}>
        <Link className="status" to={"/Status_1"}>
          STATUS
        </Link>
        <Link className="payment" to={"/Payment_1"}>
          PAYMENT
        </Link>
        <Link className="data" to={"/Data"}>
          DATA
        </Link>
        <span>
          <Link to="/About_1">About</Link>
        </span>
        <span>
          <Link to="/Contact_1">Contact</Link>
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

export default Navbar_1;
