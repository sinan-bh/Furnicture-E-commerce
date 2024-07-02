import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./Style.css";
import { addContext } from "../context/CartContext";

function ProductDetails() {
  const { addToCart, Dataset } = useContext(addContext);
  console.log(Dataset);

  const { productID } = useParams();
  console.log(productID);

  const cart = Dataset.find((item) => item.id === Number(productID));

  return (
    <div className="container product mt-5">
      <div className="  mt-5 ">
        <div className="d-flex">
          <div key={cart.id} className="cart-image card">
            <img src={cart.image} alt={cart.imageCategory} />
          </div>
          <div className="card text-center cart-product pt-5">
            <h2>{cart.imageCategory}</h2>
            <p className="pt-3 description text-start">{cart.description}</p>
            <div className="addtocart">
              <h4>$ {cart.price} </h4>
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
