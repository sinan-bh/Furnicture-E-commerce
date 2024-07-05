import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./Style.css";
import { addContext } from "../../context/CartContext";

function ProductDetails() {

  
  const { addToCart, Dataset } = useContext(addContext);

  const { productID } = useParams();

  const cart = Dataset.find((item) => item.id === Number(productID));

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
