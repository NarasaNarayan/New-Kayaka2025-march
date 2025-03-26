import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ products, updateQuantity, removeItem }) => {
  // Calculate Total Price
  const totalPrice = products.reduce((total, item) => {
    const price = item.new_price || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  return (
    <div className="container mt-5">
      {products.length === 0 ? (
        <div className="text-center">
          <h1 className="mt-5">No items in cart</h1>
          <Link to="/product">
            <button className="btn btn-warning btn-lg mt-4">Shop Now</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-container">
            {products.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-image" />

                <div className="cart-details">
                  <h5 className="product-title">{item.name}</h5>
                  <p className="product-price">
                    Price: <strong>₹{item.new_price}</strong>
                  </p>

                  <div className="quantity-controls">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h4>Total: <span>₹{Number(totalPrice).toFixed(2)}</span></h4>
            <button className="btn btn-success btn-lg mt-3">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
