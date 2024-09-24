import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import { userContext } from "../../../context/CartContext";
import useFetch from "../../../Custom Hook/useFetch";
import Spinner from "../../../popup box/Spinner";

function ProductDetails() {

  const { addToCart } = useContext(userContext);
  const { productID } = useParams();
  const {
    data: products,
    loading,
    error,
  } = useFetch(`http://localhost:3000/users/products/${productID}`);


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  

  return (
    <div className="productDetails">
    <div className="card1">
      {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
  
      {products && (
        <div className="product-details1">
          <img
            src={products.image}
            alt={products.name}
            className="product-image1"
          />
          <h2 className="product-title1">{products.title}</h2>
          <div className="product-category1">{products.details}</div>
          <p className="product-price1">₹ price {products.price}</p>
          <p className="product-price1">₹ offerPrice {products.offerPrice}</p>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default ProductDetails;
