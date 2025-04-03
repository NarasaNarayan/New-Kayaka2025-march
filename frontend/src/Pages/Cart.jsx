import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({getcart}) => {
  const [cart, setCart] = useState([]);
  console.log(cart.length);
  
  // Calculate Total Price
  const totalPrice = cart.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  // remove  the item
  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch(`https://new-kayaka2025-march.onrender.com/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const text = await response.text(); // Get raw response
        console.log("Server Response:", text);

        const data = JSON.parse(text); // Convert to JSON
        if (response.ok) {
            setCart(data.cart); // ✅ Update UI
            getcart(data.cart)
        } else {
            console.error("Error removing item:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

 

// update the  quantity 

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch("https://new-kayaka2025-march.onrender.com/api/cart", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity })
        });

        const data = await response.json();
        if (response.ok) {
            setCart(data.cart); // ✅ Update UI
            getcart(data.cart)
            console.log('cart length is ',data.cart.length);
            
        } else {
            console.error("Error updating quantity:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You need to log in to view your cart!");
        return;
      }

      try {
        const response = await fetch("https://new-kayaka2025-march.onrender.com/api/cart", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          setCart(data.cart);
          getcart(data.cart)
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    
    fetchCart();
  }, []);
  return (
    <div className="container mt-5">
      { cart.length === 0 ? (
        <div className="text-center">
          <h1 className="mt-5">No items in cart</h1>
          <Link to="/product">
            <button className="btn btn-warning btn-lg mt-4">Shop Now</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-container">
            { cart.map((item) => (
              <div className="cart-item" key={ item.id }>
                <img src={ item.image } alt={ item.name } className="cart-image" />

                <div className="cart-details">
                  <h5 className="product-title">{ item.name }</h5>
                  <p className="product-price">
                    Price: <strong>₹{ item.price }</strong>
                  </p>

                  <div className="quantity-controls">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={ () => updateQuantity(item.productId, item.quantity - 1) }
                      disabled={ item.quantity <= 1 }
                    >
                      -
                    </button>
                    <span className="quantity">{ item.quantity }</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={ () => updateQuantity(item.productId, item.quantity + 1) }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={ () => removeItem(item.productId) }
                  >
                    Remove
                  </button>


                 
                </div>
              </div>
            )) }
          </div>

          <div className="cart-total">
            <h4>Total: <span>₹{ Number(totalPrice).toFixed(2) }</span></h4>
            <button className="btn btn-success btn-lg mt-3">Proceed to Checkout</button>
          </div>
        </div>
      ) }
    </div>
  );
};

export default Cart;
