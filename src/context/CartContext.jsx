import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Custom Hook/useFetch";
import AlertBox from "../popup box/AlertBox"; 
import Spinner from "../popup box/Spinner";

export const userContext = createContext(null);

function CartContext(props) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState({});
  const [cartProduct, setCartProduct] = useState();
  const [trigger, setTrigger] = useState(false);
  const [alert, setAlert] = useState(null); 
  const [confirm, setConfirm] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState({
    name: false,
    userName: false,
    phone: false,
    email: false,
    address: false,
  });
  const [isAnyFieldEditing, setIsAnyFieldEditing] = useState(false);


  const data = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();

  // const { data: products } = useFetch("http://localhost:3000/users/products");
  const { data: products } = useFetch("https://backend-ecommerce-furniture.onrender.com/users/products");

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
          // const url = `http://localhost:3000/users/cart/${userID}`;
          const url = `https://backend-ecommerce-furniture.onrender.com/users/cart/${userID}`;

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
        credentials: 'include'
      };
      const { userID } = data;
      // const url = `http://localhost:3000/users/cart/${userID}`;
      const url = `https://backend-ecommerce-furniture.onrender.com/users/cart/${userID}`;
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
      credentials: 'include'
    };
    const { userID } = data;
    // const url = `http://localhost:3000/users/cart/${userID}`;
    const url = `https://backend-ecommerce-furniture.onrender.com/users/cart/${userID}`;
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
      credentials: 'include'
    };
    const { userID } = data;
    // const url = `http://localhost:3000/users/cart/${userID}/${productID}`;
    const url = `https://backend-ecommerce-furniture.onrender.com/users/cart/${userID}/${productID}`;
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
        // const url = `http://localhost:3000/users/wishlist/${userID}`;
        const url = `https://backend-ecommerce-furniture.onrender.com/users/wishlist/${userID}`;

        const response = await fetch(url, options);
        const result = await response.json();
        if (response.ok) {
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
      credentials: 'include'
    };
    const { userID } = data;
    // const url = `http://localhost:3000/users/wishlist/${userID}/${productID}`;
    const url = `https://backend-ecommerce-furniture.onrender.com/users/wishlist/${userID}/${productID}`;
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return true;
    } else {
      console.error("Failed to remove item");
      return false;
    }
  };

  useEffect(() => {
    const userID = data?.userID;
    if (userID) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            // `http://localhost:3000/users/profile/${userID}`,
             `https://backend-ecommerce-furniture.onrender.com/users/profile/${userID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const fetchedData = await res.json();
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }
  }, [data?.userID]);

  const updateUserData = async () => {
    const { userID } = data;
    try {
      // const res = await fetch(`http://localhost:3000/users/profile/${userID}`, {
      const res = await fetch( `https://backend-ecommerce-furniture.onrender.com/users/profile/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
        
      });
      if (res.ok) {
        const updatedUser = await res.json();
        console.log(updatedUser);
        
        setUserData(updatedUser);
        setIsEditing({
          name: false,
          userName: false,
          phone: false,
          email: false,
          address: false,
        });
        setIsAnyFieldEditing(false); 
      } else {
        console.error("Failed to update profile data");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogout = () => {
    setConfirm({
      message: `Hey ${data.username}, Do you want to logout?`,
      onConfirm: () => {
        localStorage.removeItem("isLogin");
        setAlert({ type: "success", message: "Logged out successfully." });
        setTimeout(() => setAlert(null), 1000);
        navigate("/");
        setConfirm(null);
      },
      onCancel: () => {
        setConfirm(null);
      }
    });
  };

  const contextValue = {
    products,
    cart,
    searchTerm,
    userData,
    order,
    cartProduct,
    trigger,
    isEditing,
    isAnyFieldEditing,
    loading,
    confirm,
    addToCart,
    addFromCart,
    removeFromCart,
    removeItem,
    setSearchTerm,
    setUserData,
    setCart,
    setOrder,
    addWishList,
    removeFromWishList,
    setCartProduct,
    setTrigger,
    setIsEditing,
    setIsAnyFieldEditing,
    updateUserData,
    handleChange,
    setLoading,
    handleLogout,
    setAlert,
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
