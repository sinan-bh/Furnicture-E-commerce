import React, { useState, useEffect } from "react";
import "./Style.css";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../../lib/store/features/cartSlice";

function CardItems({ userID, item, onRemove, onQuantityChange }) {
  const dispatch = useDispatch();
  const { _id, title, image, price, offerPrice } = item?.prodid || {};
  const quantity = item?.quantity || 1; // Get the quantity from the Redux store

  const handleAdd = (id) => {
    const newQuantity = quantity + 1;
    dispatch(updateQuantity({ userID, prodid: id, quantityChange: 1 }));
    onQuantityChange({ [_id]: newQuantity }); // Callback to update the parent if needed
  };

  const handleRemove = (id) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      dispatch(updateQuantity({ userID, prodid: id, quantityChange: -1 }));
      onQuantityChange({ [_id]: newQuantity }); // Callback to update the parent if needed
    }
  };

  if (!item?.prodid) {
    return null;
  }

  return (
    <div>
      <div className="item-container">
        <img src={image} alt="" className="img-fluid rounded-start" />
        <div className="item-details">
          <h6 className="mb-1">{title}</h6>
        </div>
        <div className="item-controls">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => handleRemove(_id)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => handleAdd(_id)}
          >
            +
          </button>
        </div>
        <div className="item-price">
          <h6 className="text-success">
            Offer $ {(quantity * offerPrice).toFixed(2)}
          </h6>
          <p className="mb-0 text-secondary">
            <del>$ {price}</del>
          </p>
          <br />
          <span
            className="text-danger remove-cart-product"
            onClick={() => onRemove(_id)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardItems;
