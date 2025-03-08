import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Page Replacement Simulator</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
