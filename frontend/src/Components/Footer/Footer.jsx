
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import CSS

const Footer = () => {
  return (
    <div className="mobile-footer">
      <button className="footer-btn">🏠</button>

      <button className="footer-btn">🌐</button> 
      <button className="footer-btn">⚙️</button> 
      <button className="footer-btn">🔔</button> 
      <button className="footer-btn">💰</button>
      <Link to="/auth">
        <button className="footer-btn">👨🏿‍⚕️</button> 
      </Link>
    </div>
  );
};

export default Footer;
