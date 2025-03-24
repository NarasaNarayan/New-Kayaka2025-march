import React from "react";
import all_product from "../assets/all_product.js";

const Products = ({search}) => {
    const filteredProducts = all_product.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <div className="container" style={{marginTop:'100px',}}>
      <h1 className="text-center">Popular Products</h1>
      <div style={{ width: "10%", margin: "auto", height: "10px", backgroundColor: "black" }}></div>

      {/* Make Products Centered */}
      <div className="row mt-4 justify-content-center" >
        {filteredProducts.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div className="card shadow-sm p-3" style={{ width: "100%", maxWidth: "300px" }}>
              <img src={item.image} className="card-img-top img-fluid" alt={item.name} />
              <div className="card-body">
                <p className="card-title text-small">{item.name}</p>
                <p className="card-title">Category: {item.category}</p>
                <p className="card-title">Price: {item.new_price}</p>
                <button className="btn btn-primary w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
