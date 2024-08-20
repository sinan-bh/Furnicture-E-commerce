import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Custom Hook/useFetch";

export const userContext = createContext(null);

function CartContext(props) {
  const [cartItem, setCartItem] = useState({});
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userDatas, setUserDatas] = useState();

  // console.log(userDatas.user._id);
  

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const navigate = useNavigate();

  const { data: products } = useFetch("http://localhost:3000/users/products");

  useEffect(() => {
    const totalCount = Object.keys(cartItem).reduce(
      (total, id) => total + cartItem[id],
      0
    );

    const totalPrice = Object.keys(cartItem).reduce((total, id) => {
      const price = products.find(
        (value) => value.id === id
      )?.offerPrice;
      return total + cartItem[id] * price.toFixed();
    }, 0);
    setPrice(totalPrice);
    setCount(totalCount);
  }, [cartItem]);

  const addToCart = async (productID) => {
    if (!isLogin) {
      navigate("/login");
    } else {
    //   setCartItem((prev) => {
    //     if (prev[productID]) {
    //       return { ...prev, [productID]: prev[productID] + 1 };
    //     }
    //     return { ...prev, [productID]: 1 };
    //   });
    // }
    if (userDatas) {
      
      const options ={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: productID}),
      };

      const {user} = userDatas
  
      const url = `http://localhost:3000/users/cart/${user._id}`;
  
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      }
    }
  };


  // useEffect(() => {
  //   if (currentUser) {
  //     const url = `http://localhost:8000/user/${currentUser.id}`;

  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => setCartItem(data.cart));
  //   }
  // }, [currentUser]);

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
    // setCartItem((prev) => {
    //   const newCart = { ...prev, [productID]: 0 };
    //   return newCart;
    // });
  };

  const removeAllItem = () => {
    setCartItem({});
  };

  useEffect(()=>{

    const count = Object.keys(cartItem).length;
    setCount(count)
    console.log(count);
  },[])

  const contextValue = {
    products,
    cartItem,
    price,
    count,
    searchTerm,
    userDatas,
    addToCart,
    removeFromCart,
    removeItem,
    removeAllItem,
    setSearchTerm,
    setUserDatas,
    setCartItem,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
}

export default CartContext;
