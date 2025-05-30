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
import {  useState } from "react";
import Sidebar2 from "./Components/Sidebar2/Sidebar2";
import Cart from "./Pages/Cart";
import Category from "./Pages/Category";
import Example from "./Pages/Example";

function App() {
  const [search, setsearch] = useState('');
  const [products, setproducts] = useState([]);
 

 


  const getCart = (item) => {
    // Check if the product is already in the cart
    const existingItem = products.find(product => product.id === item.id);
    
    if (existingItem) {
      // If the product already exists, just update its quantity
      setproducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }  
            : product
        )
      );
    } else {
      
      setproducts((prevProducts) => [
        ...prevProducts,
        { ...item, quantity: 1 },
      ]);
    }
  };
  const removeItem = (id) => {
    setproducts((prevCart) => prevCart.filter((item) => item.id !== id));
  };


 
 const updateQuantity = (id, newQuantity) => {
  setproducts((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(newQuantity, 1) } 
        : item
    )
  );
};
 
  return (
    <BrowserRouter>
   
      <Navbar2 search={ search } setsearch={ setsearch }  />
      <div className="d-flex">
        <div className="sidebar-container">
          <Sidebar2 products={products} />
        </div>

        {/* Main Content Should Take Full Width on Mobile */ }
        <div className="main-content p-3 w-100">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/product" element={ <Products search={ search } getcart={getCart } /> } />
            <Route path="/category" element={ <Category search={ search } getcart={getCart } /> } />

            <Route path="/auth" element={ <Auth />}  />
            <Route path="/cart" element={ <Cart products={ products } getcart={getCart } removeItem={removeItem} updateQuantity={updateQuantity}/> } />
            <Route path="/example" element={ <Example />}  />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
