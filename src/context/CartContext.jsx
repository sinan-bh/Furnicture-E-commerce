import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Custom Hook/useFetch";

export const userContext = createContext(null);

function CartContext(props) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userDatas, setUserDatas] = useState({});
  const [order,setOrder] = useState({})
  const [wishList,setWishList] = useState([])


  const data = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();

  const { data: products } = useFetch("http://localhost:3000/users/products");

  const addToCart = async (productID) => {
    if (!isLogin) {
      navigate("/login");
    } else {
      if (data) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productID }),
        };

        const { userID } = data;
        const url = `http://localhost:3000/users/cart/${userID}`;

        const response = await fetch(url, options);
        const result = await response.json();
        setCart(result); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      }
    }
  };

  const addFromCart = async (productID) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prodid: productID, quantityChange: 1 }),
    };
    const { userID } = data;
    const url = `http://localhost:3000/users/cart/${userID}`;
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    
    setCart(result); 
  };

  const removeFromCart = async (productID) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prodid: productID, quantityChange: -1 }),
    };
    const { userID } = data;
    const url = `http://localhost:3000/users/cart/${userID}`;
    const response = await fetch(url, options);
    const result = await response.json();
    setCart(result); 
  };

  const removeItem = async (productID) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { userID } = data;
    const url = `http://localhost:3000/users/cart/${userID}/${productID}`;
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return true;
    } else {
      console.error("Failed to remove item");
      return false;
    }
  };

  const addWishList = async (productID) => {
    if (!isLogin) {
      navigate("/login");
    } else {
      if (data) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productID }),
        };

        const { userID } = data;
        const url = `http://localhost:3000/users/wishlist/${userID}`;

        const response = await fetch(url, options);
        const result = await response.json();
        setWishList(result); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      }
    }
  }

  const removeFromWishList = async (productID) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { userID } = data;
    const url = `http://localhost:3000/users/wishlist/${userID}/${productID}`;
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return true;
    } else {
      console.error("Failed to remove item");
      return false;
    }
  };

  const contextValue = {
    products,
    cart,
    searchTerm,
    userDatas,
    order,
    addToCart,
    addFromCart,
    removeFromCart,
    removeItem,
    setSearchTerm,
    setUserDatas,
    setCart,
    setOrder,
    addWishList,
    removeFromWishList,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
}

export default CartContext;
