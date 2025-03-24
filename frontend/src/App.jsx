import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Auth from "./Pages/Auth";
import Navbar2 from "./Components/Navbar2/Navbar2";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import Sidebar2 from "./Components/Sidebar2/Sidebar2";

function App() {
   const [search,setsearch]=useState('');
  return (
    <BrowserRouter>
      <Navbar2 search={search} setsearch={setsearch} />
      <div className="d-flex">
        <div className="sidebar-container">
          <Sidebar2/>
        </div>

        {/* Main Content Should Take Full Width on Mobile */}
        <div className="main-content p-3 w-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Products search={search} />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
