import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  {
    title: "libero, vitae orci",
    description: "libero, vitae orci felis, Ut venenatis sapien Nullam odio convallis.",
    image: "https://via.placeholder.com/150",
    rating: 5.0,
  },
  {
    title: "libero, vitae orci",
    description: "libero, vitae orci felis, Ut venenatis sapien Nullam odio convallis.",
    image: "https://via.placeholder.com/150",
    rating: 5.0,
  },
  {
    title: "libero, vitae orci",
    description: "libero, vitae orci felis, Ut venenatis sapien Nullam odio convallis.",
    image: "https://via.placeholder.com/150",
    rating: 5.0,
  },
  {
    title: "libero, vitae orci",
    description: "libero, vitae orci felis, Ut venenatis sapien Nullam odio convallis.",
    image: "https://via.placeholder.com/150",
    rating: 5.0,
  },
];

const ProductCarousel = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="p-4 rounded bg-warning text-dark">
            <h6>1500+ Items</h6>
            <h3 className="fw-bold">libero, vitae orci</h3>
            <p>libero, vitae orci felis, Ut venenatis sapien Nullam odio convallis. commodo sit ultrices tincidunt at, gravida volutpat nisl.</p>
          </div>
        </div>

        <div className="col-md-8">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {products.map((product, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded shadow">
                        <img src={product.image} className="img-fluid" alt="product" />
                        <h5 className="fw-bold mt-2">{product.title}</h5>
                        <p>{product.description}</p>
                        <p>⭐ {product.rating}</p>
                        <button className="btn btn-dark">Shop Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
