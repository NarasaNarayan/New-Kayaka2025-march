import React, { useState } from "react";
import all_product from "../assets/all_product.js";
import { useNavigate } from "react-router-dom";

const Category = ({ search }) => {
    const navigate = useNavigate();
    
    // State to manage filtered products
    const [products, setProducts] = useState(all_product);
    const [activeCategory, setActiveCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    // ✅ Filter products based on category, price range, and search term
    const filteredProducts = products.filter((product) => 
        product.new_price >= minPrice &&
        product.new_price <= maxPrice &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // ✅ Get unique categories
    const categories = ["All", ...new Set(all_product.map((product) => product.category))];

    // ✅ Handle category selection
    const categoryHandler = (category) => {
        setProducts(category === "All" ? all_product : all_product.filter((item) => item.category === category));
        setActiveCategory(category);
    };

    // ✅ Add to Cart Function
    const addToCart = async (product) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in to add items to cart.");
            return;
        }

        try {
            const response = await fetch('https://new-kayaka2025-march.onrender.com/api/cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id || product.id, 
                    name: product.name, 
                    price: product.new_price, 
                    quantity: 1,
                    image: product.image 
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Added to cart: ${data.message || "Success"}`);
                console.log(data);
            } else {
                alert(`Error: ${data.message}`);
                console.error("Error:", data.message);
            }
        } catch (error) {
            alert("Failed to add to cart. Please try again.");
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            {/* Category Filter Buttons */}
            <div className="d-flex justify-content-center gap-2 flex-wrap">
                {categories.map((category) => (
                    <button 
                        key={category} 
                        onClick={() => categoryHandler(category)} 
                        className={`btn ${activeCategory === category ? "btn-success" : "btn-primary"}`}>
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="row mt-4">
                {filteredProducts.map((item) => (
                    <div key={item._id || item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card">
                            <img src={item.image} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Price: ₹{item.new_price}</p>
                                <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
