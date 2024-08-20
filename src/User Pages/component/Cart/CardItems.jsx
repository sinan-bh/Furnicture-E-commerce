import React, { useState, useContext, useEffect } from "react";
import "./Style.css";
import { userContext } from "../../../context/CartContext";

function CardItems({ item }) {
  const [qty, setQty] = useState(item.quantity);

  

  const { _id,title, image,  price, offerPrice } = item.prodid;
  const { addFromCart, removeFromCart, removeItem } =
  useContext(userContext);

  const handleAdd = () => {
    setQty(qty + 1); 
    addFromCart(_id); 
  };

  const handleRemove = () => {
    if (qty > 1) {
      setQty(qty - 1); 
    }
    removeFromCart(_id); 
  };
 
    
  const handleRemoveItem = (id) => {
    removeItem(id); 
    
  };
  return (
    <div>
      <div className="">
        <div className="item-container">
          <img src={image} alt="" className="img-fluid rounded-start" />
          <div className="item-details">
            <h6 className="mb-1">{title}</h6>
          </div>
          <div className="item-controls">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleRemove(_id)}
            >
              -
            </button>
            <span className="mx-2">{qty}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleAdd(_id)}
            >
              +
            </button>
          </div>
          <div className="item-price">
            <h6 className="text-success">Offer $ {offerPrice}</h6>
            <p className="mb-0 text-secondary">
              <del>$ {price}</del>
            </p>
            <br />
            <a
              href="#"
              className="text-danger text-decoration-none"
              onClick={() => handleRemoveItem(_id)}
            >
              Remove
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItems;
