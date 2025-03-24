import React, { useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import kclogo from "../../assets/kclogo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle menu
    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Function to close menu when link is clicked
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar navbar-expand-lg bg-warning px-3 top-navbar">
            {/* Logo */}
            <a className="navbar-brand" href="/">
                <img className="logo" src={kclogo} alt="Logo" />
            </a>

            {/* Toggler Button */}
            <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                ☰
            </button>

            {/* Navbar Content */}
            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarContent">
                {/* Delivery Text */}
                <span className="navbar-brand fw-bold">🚚Delivery</span>

                {/* Search Bar */}
                <input type="text" className="form-control mx-md-3 w-100 w-md-50" placeholder="Search bar" />

                {/* Icons */}
                <div id="navmenu" className="d-flex align-items-center mt-2 mt-lg-0">
                    <button className="btn btn-outline-dark me-2">🌐</button>
                    <button className="btn btn-outline-dark me-2">🔍</button>
                    <button className="btn btn-outline-dark me-2">🔔</button>
                    <Link to='/auth' className="nav-link" onClick={closeMenu}>
                        <button className="btn btn-outline-dark">👨🏿‍⚕️</button>
                    </Link>
                   
                    {/* ✅ Closes menu when clicked */}
                    <Link to='/auth' className="nav-link" onClick={closeMenu}>
                        <button className="btn btn-outline-dark">👨🏿‍⚕️</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
