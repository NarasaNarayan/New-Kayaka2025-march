import React, { useState } from "react";
import {  FaHome, FaShoppingCart, FaBox, FaSignInAlt, FaMapMarkedAlt, FaLocationArrow, 
    FaHeart, FaUser, FaGlobe, FaFilter  } from "react-icons/fa";
import './Navbar2.css';
import { Link, useNavigate } from "react-router-dom";
import kclogo from "../../assets/kclogo.png";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Navbar2 = ({ search, setsearch }) => {
    const navigate = useNavigate();
    const [zipCode, setZipCode] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('Select Your Address');
    const [model,setmodal]=useState(false)

    const fetchDeliveryLocation = async () => {
        if (zipCode) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
                const data = await response.json();

                if (data[0]?.Status === "Success") {
                    setDeliveryLocation(data[0].PostOffice[0].District);
                } else {
                    setDeliveryLocation("Invalid Pincode");
                }
            } catch (error) {
                setDeliveryLocation("Error fetching location",error);
            }
        }

       setmodal(false);
    };
    

    const searchHandler = (e) => {
        setsearch(e.target.value);
    };

    const navigateHandler = () => {
        if (search.trim()) {
            navigate(`/product?query=${search}`);
        } else {
            navigate("/product");
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg  px-3 top-navbar">
                {/* Logo */ }
                <a className="navbar-brand" href="/">
                    <img className="logo" src={ kclogo } alt="Logo" />
                </a>

                {/* Clickable Delivery Text - Opens Modal */ }

              <div  className="navbar-Delivery"  style={ { marginLeft: '100px' } } onClick={() => setmodal(true)}>
              🚚Delivery To <br/>{ deliveryLocation }
              </div>
                    

                {/* Search Bar */ }
                <input
                    type="text"
                    value={ search }
                    onChange={ searchHandler }
                    onClick={ navigateHandler }
                    className="form-control search-bar mx-auto"
                    placeholder="Search Your Products Here"
                />

                {/* Icons */ }
                <div className="d-flex align-items-center mt-2 mt-lg-0 d-none d-md-flex">
                    <button className="btn btn-outline-dark me-2"><><FaGlobe/></></button>
                  <Link to='/category'>  <button className="btn btn-outline-dark me-2"><FaFilter/></button></Link>
                    <button className="btn btn-outline-dark me-2">🔔</button>
                    <Link to='/auth' className="nav-link">
                        <button className="btn btn-outline-dark"><FaUser/></button>
                    </Link>
                </div>
            </nav>

           <div >
           {model && (
                <div style={{marginTop:'200px'}} className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Your Pincode</h5>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Pincode"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setmodal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-success" onClick={fetchDeliveryLocation}>
                                    Submit Pincode
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
           </div>
        </div>
    );
};

export default Navbar2;
