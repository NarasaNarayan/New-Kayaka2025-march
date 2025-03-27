import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
   const navigate=useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:5000/api/signup"
        : "http://localhost:5000/api/login";
      const { data } = await axios.post(url, user);
      alert(data.message);
      if (!isSignup) {
        localStorage.setItem("token", data.token);
      }
      if (isSignup) {
        setIsSignup(false); // ✅ Switch to Login form after Sign Up
        setUser({ name: "", email: "", password: "" });
      } else {
        localStorage.setItem("token", data.token);
        navigate("/category"); // ✅ Redirect to Category Page after Login
      }
      window.location.reload();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  const handleForgotPassword = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/forgot-password", { email: resetEmail });
      alert(data.message);
      setResetEmail("");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100px", marginTop: "50px" }}>
      <div className="auth-box p-4 border shadow">
        {!forgotPassword ? (
          <>
            <h2 className="text-center">{isSignup ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit} className="p-3">
              {isSignup && (
                <div className="mb-3">
                  <label>Name:</label>
                  <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} required />
                </div>
              )}
              <div className="mb-3">
                <label>Email:</label>
                <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Password:</label>
                <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">{isSignup ? "Sign Up" : "Login"}</button>
            </form>
            <p className="text-center mt-3">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button className="btn btn-link" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
            {!isSignup && (
              <p className="text-center">
                <button className="btn btn-link" onClick={() => setForgotPassword(true)}>Forgot Password?</button>
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-center">Reset Password</h2>
            <div className="mb-3">
              <label>Enter your email:</label>
              <input type="email" className="form-control" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100" onClick={handleForgotPassword}>Send Reset Link</button>
            <p className="text-center mt-3">
              <button className="btn btn-link" onClick={() => setForgotPassword(false)}>Back to Login</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
