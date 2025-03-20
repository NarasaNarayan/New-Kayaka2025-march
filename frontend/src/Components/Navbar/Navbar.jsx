import React from "react";
import './Navbar.css'
const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-warning px-3 top-navbar">
        <span className="navbar-brand fw-bold">Delivery</span>
        <input type="text" className="form-control mx-3 w-25" placeholder="Search bar" />
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-dark me-2">Log in</button>
          <button className="btn btn-danger">Continue with Google</button>
        </div>
      </nav>
    
    )
    
        
};

export default Navbar;
