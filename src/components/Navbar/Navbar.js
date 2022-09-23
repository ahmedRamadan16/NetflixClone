import React from "react";
import logo from "../../images/netflix.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" width="100px" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
