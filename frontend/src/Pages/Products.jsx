import React from "react";
import all_product from "../assets/all_product.js";

const Products = () => {
  return(
      <div className="container mt-4">
                <h1 className='text-center'>Popular Products</h1>
                <div style={{ width: '10%', margin: 'auto', height: '10px', backgroundColor: 'black' }}></div>
    
                
                <div className="row mt-4">
                    {all_product.map((item, index) => (
                        <div key={ index } className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                            <div className="card shadow-sm p-3">
                                <img src={ item.image } className="card-img-top img-fluid" alt={ item.name } />
                                <div className="card-body ">
                                    <p className="card-title text-small">{ item.name }</p>
                                    <p className="card-title">Category: { item.category }</p>
                                    <p className="card-title">Price: { item.new_price }</p>
                                    <button className='btn btn-primary'>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
  )
};

export default Products;
