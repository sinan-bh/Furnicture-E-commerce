import React, { useState, useEffect } from "react";
import "./Style.css";
import { useDispatch } from "react-redux";
import {
  updateQuantity,
} from "../../../lib/store/features/cartSlice";

function CardItems({ userID, item, onRemove, onQuantityChange }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.quantity);
<<<<<<< HEAD
  const { _id, title, image, price, offerPrice } = item?.prodid;

  useEffect(() => {
    setQty(item.quantity);
  }, [item?.quantity]);
=======
  const { _id,title, image,  price, offerPrice } = item.prodid;
  const { addFromCart, removeFromCart, removeItem, setCartProduct,trigger,cartProduct, setTrigger } =
  useContext(userContext);
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66

  const handleAdd = (id) => {
    const updatedQty = qty + 1;
    setQty(updatedQty);
    dispatch(updateQuantity({ userID, prodid: id, quantityChange: 1 }));
    onQuantityChange({ [_id]: updatedQty });
  };

  const handleRemove = (id) => {
    if (qty > 1) {
      const updatedQty = qty - 1;
      setQty(updatedQty);
      dispatch(updateQuantity({ userID, prodid: id, quantityChange: -1 }));
      onQuantityChange({ [_id]: updatedQty });
    }
  };
<<<<<<< HEAD
=======
  
  setCartProduct(qty)
  
  const handleRemoveItem = (id) => {
    removeItem(id).then((success) => {
      if (success) {
        onRemove(id);
        setTrigger(!trigger) 
      }
    });
  };
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66

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
            disabled={qty <= 1}
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
          <h6 className="text-success">
            Offer $ {(qty * offerPrice).toFixed(2)}
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
