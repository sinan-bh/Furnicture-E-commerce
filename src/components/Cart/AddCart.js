import React, { useContext } from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import { addContext } from "../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";




function AddCart() {
  const { cartItem,price,count,removeCount } = useContext(addContext);
  const navigate = useNavigate()
  const istrue = localStorage.getItem('registrationData')
  const handlerClick = () => {
    if (!istrue) {
      navigate('/login')
    }else{
      navigate('/payment')
    }
  }
 
  return (
    <div className="container">
      <div>
        <h2 className="text-center">Your Carts Are...!</h2>
      </div>
      <div className="cart-container">
      <div className="d-flex justify-content-between">
          <h5 className="mb-3">Shopping Cart</h5>
          <a href="#" className=" text-danger  float-end ">
            Remove all
          </a>
        </div>
        {Dataset.map((card) => {
          if (cartItem[card.id] !== 0) {
            return <CardItems item={card} />;
          }
        })}
        <hr />
        <div className="cart-summary">
          <h6>Sub-Total ({count} items)</h6>
          <h6>${price}</h6>
        </div>
        <dir className="text-end">
          <button className="btn btn-primary " onClick={handlerClick}>Checkout</button>
        </dir>
      </div>
    </div>
  );
}

export default AddCart;
