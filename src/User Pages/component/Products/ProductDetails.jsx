import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import Spinner from "../../../popup box/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../../../lib/store/features/productSlice";

function ProductDetails() {
  const { productID } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsById(productID));
  }, [dispatch, productID]);

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!product || product.length === 0) {
    return <div>No product found.</div>;
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

        {product && (
          <div className="product-details1">
            <img
              src={product.image}
              alt={product.name}
              className="product-image1"
            />
            <h2 className="product-title1">{product.title}</h2>
            <div className="product-category1">{product.details}</div>
            <p className="product-price1">₹ price {product.price}</p>
            <p className="product-price1">₹ offerPrice {product.offerPrice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
