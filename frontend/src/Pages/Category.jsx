import React, { useState } from "react";
import all_product from "../assets/all_product.js";
import { useNavigate } from "react-router-dom";

const Category = ({ search }) => {
    const navigate = useNavigate();
    
    const [products, setProducts] = useState(all_product);
    const [activeCategory, setActiveCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    // ✅ Filter products based on category, price range, and search term
    const filteredProducts = products.filter((product) => {
        return product.new_price >= minPrice && product.new_price <= maxPrice &&
               product.name.toLowerCase().includes(search.toLowerCase());
    });

    // ✅ Handling category filter
    const categories = [...new Set(all_product.map((product) => product.category))];

    const categoryHandler = (category) => {
        setProducts(category === "All" ? all_product : all_product.filter((item) => item.category === category));
        setActiveCategory(category);
    };

    // ✅ Add Product to Cart
    const addToCart = async (product) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Please log in to add items to cart.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id, 
                    name: product.name, 
                    price: product.new_price, 
                    quantity: 1,
                    image: product.image // ✅ Ensure Image is Sent
                })
            });
    
            const data = await response.json();
            if (response.ok) {
               alert("Added to cart:", data);
               console.log(data);
               
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    
    
    
    
    
    

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="d-flex justify-content-center">
                <button onClick={() => categoryHandler("All")} className={`btn ${activeCategory === "All" ? "btn-success" : "btn-primary"}`}>
                    All
                </button>
                {categories.map((category) => (
                    <button key={category} onClick={() => categoryHandler(category)} className={`btn ${activeCategory === category ? "btn-success" : "btn-primary"}`}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="row">
                {filteredProducts.map((item) => (
                    <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card">
                            <img src={item.image} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <p>{item.name}</p>
                                <p>Price: ₹{item.new_price}</p>
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
