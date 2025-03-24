import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar2.css"; // Import CSS

const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

  // Function to close sidebar (used on small screens)
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Function to toggle dropdowns
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
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

          {/* Cart Dropdown */}
          <li className="nav-item">
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("cart")}>
              🛒 Cart 
            </div>
            <ul className={`dropdown-menu ${openDropdown === "cart" ? "show" : ""}`}>
              <li><Link to="/cart/view" className="dropdown-item" onClick={closeSidebar}>View Cart</Link></li>
              <li><Link to="/cart/checkout" className="dropdown-item" onClick={closeSidebar}>Checkout</Link></li>
            </ul>
          </li>

          {/* Wishlist Dropdown */}
          <li className="nav-item">
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("wishlist")}>
              🖤 Wishlist 
            </div>
            <ul className={`dropdown-menu ${openDropdown === "wishlist" ? "show" : ""}`}>
              <li><Link to="/wishlist/view" className="dropdown-item" onClick={closeSidebar}>View Wishlist</Link></li>
              <li><Link to="/wishlist/saved" className="dropdown-item" onClick={closeSidebar}>Saved Items</Link></li>
            </ul>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item">
            <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown("profile")}>
              👤 Profile 
            </div>
            <ul className={`dropdown-menu ${openDropdown === "profile" ? "show" : ""}`}>
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
