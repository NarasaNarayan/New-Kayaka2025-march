import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import CSS

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close sidebar (used on small screens)
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
      

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeSidebar}>🏡 Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeSidebar}>📖 About</Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={closeSidebar}>🛒 Cart</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={closeSidebar}>🖤 Wishlist</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={closeSidebar}>👤 Profile</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={closeSidebar}>🔑 Sign in</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={closeSidebar}>📩 Contact us</a>
          </li>
          <li className="nav-item">
            <a href="/product" className="nav-link" onClick={closeSidebar}>🎁 Products</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
