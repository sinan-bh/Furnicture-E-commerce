import React, { useState, useContext } from "react";
import "./Style.css";
import { userContext } from "../../../context/CartContext";

function CardItems({ item }) {
  const { _id, image, title, price, offerPrice } = item;

  const { cartItem, addToCart, removeFromCart, removeItem } =
    useContext(userContext);

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
              onClick={() => removeFromCart(_id)}
            >
              -
            </button>
            <span className="mx-2">{cartItem[_id]}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => addToCart(_id)}
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
