import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import { addContext, userContext } from "../../../context/CartContext";
import useFetch from "../../../Custom Hook/useFetch";

function ProductDetails() {

  
  const { addToCart } = useContext(userContext);

  const { productID } = useParams();
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:8000/products");


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const cart = products.find((item) => item.id === productID);

  return (
    <div className="container product mt-5">
      <div className="  mt-5 ">
        <div className="d-flex">
          <div key={cart.id} className="cart-image card">
            <img src={cart.image} alt={cart.imageCategory} />
          </div>
          <div className="card text-center cart-product pt-5">
            <h2 className="text-success">{cart.imageCategory}</h2>
            <p className="pt-3 description text-start">{cart.details}</p>
            <div className="addtocart">
              <div>
                <h5 className="text-success">$ {cart.offerPrice}</h5>
                <del className="text-secondary">$ {cart.price} </del>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => addToCart(productID)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
