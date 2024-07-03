import React, { createContext, useEffect, useState } from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import { useNavigate } from "react-router-dom";

export const addContext = createContext(null);

const getDefualtCart = () => {
  const cart = {};
  for (let i = 1; i < Dataset.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
function CartContext(props) {


  const [cartItem, setCartItem] = useState(getDefualtCart());
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");


  const [log, setLog] = useState({
    lname: "",
    lpass: "",
  });


  const navigate = useNavigate();


  useEffect(() => {
    const totalCount = Object.keys(cartItem).reduce(
      (total, id) => total + cartItem[id],
      0
    );

    const totalPrice = Object.keys(cartItem).reduce((total, id) => {
      const price = Dataset.find(
        (value) => value.id === Number(id)
      )?.offerPrice;
      return total + cartItem[id] * price;
    }, 0);
    setPrice(totalPrice);
    setCount(totalCount);
  }, [cartItem]);


  const addToCart = (productID) => {
    if (!log.lname) {
      navigate("/login");
    } else {
      setCartItem((prev) => ({ ...prev, [productID]: prev[productID] + 1 }));
    }
  };


  const removeFromCart = (productID) => {
    setCartItem((prev) => {
      const newCart = {
        ...prev,
        [productID]: Math.max(1, prev[productID] - 1),
      };
      return newCart;
    });
  };


  const removeItem = (productID) => {
    setCartItem((prev) => {
      const newCart = { ...prev, [productID]: 0 };
      return newCart;
    });
  };


  const removeAllItem = () => {
    setCartItem(getDefualtCart());
  };

  
  const contextValue = {
    Dataset,
    cartItem,
    price,
    count,
    searchTerm,
    log,
    addToCart,
    removeFromCart,
    removeItem,
    removeAllItem,
    setSearchTerm,
    setLog,
  };

  return (
    <addContext.Provider value={contextValue}>
      {props.children}
    </addContext.Provider>
  );
}

export default CartContext;
