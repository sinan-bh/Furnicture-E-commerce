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
  } = useFetch(`http://localhost:3000/users/products/${productID}`);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  // const cart = products.find((item) => item.id === productID);

  return (
    <div className=" product mt-5">
      <div className="flex-style mt-5 ">
          <div key={products.id} className="cart-image ">
            <img src={products.image} alt={products.title} />
          </div>
          <div className=" cart-product">
            <h2 className="text-success">{products.title}</h2>
            <p className=" text-start">{products.details}</p>
            <div className="addtocart">
              <div>
                <h5 className="text-success">$ {products.offerPrice}</h5>
                <del className="text-secondary">$ {products.price} </del>
              </div>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => addToCart(products._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProductDetails;
