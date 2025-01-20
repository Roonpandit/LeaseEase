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
        <Link className="status" to={"/Data"}>
          Data
        </Link>
        <Link className="payment" to={"/Payments"}>
          Payment
        </Link>
        <Link className="data" to={"/Bill"}>
          Bill
        </Link>
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
