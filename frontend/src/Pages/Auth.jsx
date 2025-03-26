import React, { useState } from "react";
import axios from "axios";
import './Auth.css'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });


  console.log(user);
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup ? "http://localhost:5000/api/signup" : "http://localhost:5000/api/login";
      const { data } = await axios.post(url, user);
      alert(data.message);
      if (!isSignup) {
        localStorage.setItem("token", data.token); // Store token on login
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100",marginTop:'50px' }}>
      <div className="auth-box p-4 border shadow">
        <h2 className="text-center">{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="p-3">
          {isSignup && (
            <div className="mb-3">
              <label>Name:</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>
          )}
          <div className="mb-3">
            <label>Email:</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="text-center mt-3">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="btn btn-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
