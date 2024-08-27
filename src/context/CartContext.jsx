import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Custom Hook/useFetch";
import AlertBox from "../User Pages/component/popup box/AlertBox"; 

export const userContext = createContext(null);

function CartContext(props) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userDatas, setUserDatas] = useState({});
  const [order, setOrder] = useState({});
  const [wishList, setWishList] = useState([]);
  const [cartProduct, setCartProduct] = useState(0);
  const [alert, setAlert] = useState(null); 


  const data = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();

  const { data: products } = useFetch("http://localhost:3000/users/products");

  const addToCart = async (productID) => {
    if (!isLogin) {
      setAlert({ type: "error", message: "You are not logged in. Please log in." });
      setTimeout(() => setAlert(null), 2000);
      navigate("/login");
    } else {
      if (data) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: productID }),
            credentials: 'include',
          };

          const { userID } = data;
          const url = `http://localhost:3000/users/cart/${userID}`;

          const response = await fetch(url, options);
          const result = await response.json();
          if (response.ok) {
            setCart(result);
            setAlert({ type: "success", message: "Product added to cart." });
            setTimeout(() => setAlert(null), 2000);
          } else {
            setAlert({ type: "info", message: "Alread  added product to cart." });
            setTimeout(() => setAlert(null), 2000);
          }
      }
    }
  };

  const addFromCart = async (productID) => {
    if (data) {
      
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
      setCart(result);
    }
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
      setAlert({ type: "error", message: "You are not logged in. Please log in." });
      setTimeout(() => setAlert(null), 2000);
      navigate("/login");

    } else {
      if (data) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productID }),
          credentials: 'include',
        };

        const { userID } = data;
        const url = `http://localhost:3000/users/wishlist/${userID}`;

        const response = await fetch(url, options);
        const result = await response.json();
        if (response.ok) {
          setWishList(result);
          setAlert({ type: "success", message: "Product added to wishlist." });
          setTimeout(() => setAlert(null), 2000);
        } else {
          setAlert({ type: "info", message: "Already added  product to wishlist." });
          setTimeout(() => setAlert(null), 2000);
        }
      }
    }
  };

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
    cartProduct,
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
    setCartProduct,
  };

  return (
    <userContext.Provider value={contextValue}>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {props.children}
    </userContext.Provider>
  );
}

export default CartContext;
