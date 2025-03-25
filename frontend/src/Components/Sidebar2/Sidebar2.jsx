import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar2.css"; // Import CSS
import { 
    FaHome, FaShoppingCart, FaBox, FaSignInAlt, FaMapMarkedAlt, FaLocationArrow, 
    FaHeart, FaUser, FaGlobe, FaFilter 
  } from "react-icons/fa";

const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  // Function to close sidebar (used on small screens)
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Function to toggle dropdowns
  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
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
            <Link to="/" className="nav-link" onClick={closeSidebar}><FaHome/> Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeSidebar}>📖 About</Link>
          </li>

          {/* Cart Dropdown */}
          <li className={`nav-item ${openDropdown === "cart" ? "open" : ""}`}>
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("cart")}>
              <FaShoppingCart/> Cart 
            </div>
            <ul className="dropdown-menu">
              <li><Link to="/cart" className="dropdown-item" onClick={closeSidebar}>View Cart</Link></li>
              <li><Link to="/cart/checkout" className="dropdown-item" onClick={closeSidebar}>Checkout</Link></li>
            </ul>
          </li>

          {/* Wishlist Dropdown */}
          <li className={`nav-item ${openDropdown === "wishlist" ? "open" : ""}`}>
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("wishlist")}>
             <FaHeart/> Wishlist 
            </div>
            <ul className="dropdown-menu">
              <li><Link to="/wishlist/view" className="dropdown-item" onClick={closeSidebar}>View Wishlist</Link></li>
              <li><Link to="/wishlist/saved" className="dropdown-item" onClick={closeSidebar}>Saved Items</Link></li>
            </ul>
          </li>

          {/* Profile Dropdown */}
          <li className={`nav-item ${openDropdown === "profile" ? "open" : ""}`}>
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("profile")}>
            < FaUser/>Profile 
            </div>
            <ul className="dropdown-menu">
              <li><Link to="/profile/settings" className="dropdown-item" onClick={closeSidebar}>Settings</Link></li>
              <li><Link to="/profile/orders" className="dropdown-item" onClick={closeSidebar}>My Orders</Link></li>
              <li><Link to="/profile/logout" className="dropdown-item" onClick={closeSidebar}>Logout</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeSidebar}>📩 Contact us</Link>
          </li>

          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={closeSidebar}>🎁 Products</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar2;
