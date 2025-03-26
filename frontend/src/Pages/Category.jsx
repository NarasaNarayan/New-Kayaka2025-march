import React, { useState } from "react";
import all_product from "../assets/all_product.js";

const Category = ({ getcart, search }) => {

    const [products, setProducts] = useState(all_product);
    const [activeCategory, setActiveCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [sortOrder, setSortOrder] = useState(null); // To track sorting state (low to high or high to low)

    // Filter products based on category, price range, and search term
    const filteredProducts = products.filter((product) => {
        const isInPriceRange = product.new_price >= minPrice && product.new_price <= maxPrice;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

        return isInPriceRange && matchesSearch;
    });

    // Sorting function for low to high and high to low
    const sortProducts = (order) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (order === "low-to-high") {
                return a.new_price - b.new_price;
            } else if (order === "high-to-low") {
                return b.new_price - a.new_price;
            }
            return 0;
        });
        setProducts(sortedProducts);
        setSortOrder(order);
    };

    // Handling category filter
    const categories = [...new Set(all_product.map((product) => product.category))];

    const categoryHandler = (category) => {
        if (category === "All") {
            setProducts(all_product);
        } else {
            const filtered = all_product.filter((item) => item.category === category);
            setProducts(filtered);
        }
        setActiveCategory(category);
    };

    const addToCart = (item) => {
        getcart(item);
    };

    return (
        <div className="container" style={ { marginTop: '50px', zIndex: '5000' } }>

            <div style={ { position: 'fixed', top: '125px', left: '200px', right: '0', zIndex: '5000', backgroundColor: 'white', padding: '10px' } }> 
                 <div className="d-flex justify-content-center align-items-center">
                <button
                    onClick={ () => categoryHandler("All") }
                    key="All"
                    className={ `btn m-1 ${activeCategory === "All" ? "btn-success" : "btn-primary"}` }
                >
                    All
                </button>
                { categories.map((category) => (
                    <button
                        onClick={ () => categoryHandler(category) }
                        key={ category }
                        className={ `btn m-1 ${activeCategory === category ? "btn-success" : "btn-primary"}` }
                    >
                        { category }
                    </button>
                )) }
            </div>


                <div className="d-flex justify-content-between mt-3">
                    {/* Price Range Input */ }
                    <div>
                        <label>Price Range: ₹{ minPrice } - ₹{ maxPrice }</label>
                        <div>

                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={ maxPrice }
                                onChange={ (e) => setMaxPrice(e.target.value) }
                                className="form-range"
                                style={ { width: "45%" } }
                            />
                        </div>
                    </div>

                    {/* Sorting Buttons */ }
                    <div className="d-flex">
                        <h1 className="mt-3 mx-4">Sort</h1>
                        <select
                            onChange={ (e) => sortProducts(e.target.value) }  // Trigger the sortProducts function based on the selected value
                            className="form-select"
                            value={ sortOrder }  // Set the current sort order to reflect in the select element
                        >
                            <option value="low-to-high" disabled={ sortOrder === "low-to-high" }>Low to High</option>
                            <option value="high-to-low" disabled={ sortOrder === "high-to-low" }>High to Low</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Product Cards */ }
            <div className="row  justify-content-center" style={ { marginTop: '200px', zIndex: '000' } }>
                { filteredProducts.map((item, index) => (
                    <div key={ index } className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                        <div className="card shadow-sm p-3" style={ { width: "100%", maxWidth: "300px" } }>
                            <img src={ item.image } className="card-img-top img-fluid" alt={ item.name } />
                            <div className="card-body">
                                <p className="card-title text-small">{ item.name }</p>
                                <p className="card-title">Category: { item.category }</p>
                                <p className="card-title">Price: ₹{ item.new_price }</p>
                                <button className="btn btn-primary w-100" onClick={ () => addToCart(item) }>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default Category;
