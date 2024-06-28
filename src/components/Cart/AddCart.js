import React, { useContext } from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import { addContext } from "../context/CartContext";
import CardItems from "./CardItems";
import '../Cart/AddCart.js'

function AddCart() {
  const { cartItem } = useContext(addContext);
  console.log(cartItem);
  return (
    <div>
      <div>
        <h2 className="text-center">Your Carts Are...!</h2>
      </div>
      <div className="furcategories">
        {Dataset.map((card) => {
          if (cartItem[card.id] !== 0) {
            console.log(card);
            return <CardItems item={card} />;
          }
        })}
      </div>
    </div>
  );
}

export default AddCart;
