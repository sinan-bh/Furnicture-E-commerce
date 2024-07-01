import React, { useState,useContext } from "react";
import "./Style.css";
import { addContext } from "../context/CartContext";


function CardItems({ item }) {
  const { id, image, imageCategory, price } = item;



  const { cartItem, addToCart, removeFromCart,removeItem  } = useContext(addContext);

  
  const handleRemoveItem = (id) => {
    removeItem(id);
};

  return (
    <div>
      <div className="">
       
        <div className="item-container">
          <img
            src={image}
            alt=""
            className="img-fluid rounded-start"
          />
          <div className="item-details">
            <h6 className="mb-1">{imageCategory}</h6>
            {/* <p className="mb-0 text-muted">250ml</p> */}
          </div>
          <div className="item-controls">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => removeFromCart(id)}>-</button>
            <span className="mx-2">{cartItem[id]}</span>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => addToCart(id)}>+</button>
          </div>
          <div className="item-price">
            <p className="mb-0">${price}</p>
            {/* <a href="#" className="text-muted text-decoration-none">
              Save for later
            </a> */}
            <br />
            <a href="#" className="text-danger text-decoration-none" onClick={()=>handleRemoveItem(id)}>
              Remove
            </a>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default CardItems;
