import React, { useContext } from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import { addContext } from "../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";
import "./Style.css";



function AddCart() {
  const { cartItem, price, count, removeAllItem } = useContext(addContext);
  const navigate = useNavigate();

 

 

 
    const handleCheckout = () => {
        navigate("/payment");
    }
 

  const hasItemsInCart = Object.values(cartItem).some((item) => item !== 0);

  return (
    <div className="container">
      {hasItemsInCart ? (
        <div className="cart-container">
          <h2 className="text-center">Your Carts Are...!</h2>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Shopping Cart</h5>
            <a
              href="#"
              className="text-danger float-end"
              onClick={removeAllItem}
            >
              Remove all
            </a>
          </div>
          {Dataset.map((card) => {
            if (cartItem[card.id] !== 0) {
              return <CardItems key={card.id} item={card} />;
            }
            return null;
          })}
          <hr />
          <div className="cart-summary">
            <h6>Sub-Total ({count} items)</h6>
            <h6>${price}</h6>
          </div>
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center card empt-cart">
          <h2>Your cart is empty...!</h2>
        </div>
      )}
    </div>
  );
}

export default AddCart;
