import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { userContext } from "../../../context/CartContext";
import { IoCartSharp } from "react-icons/io5";
import AlertBox from "../../../popup box/AlertBox";
import Spinner from "../../../popup box/Spinner";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const [alert, setAlert] = useState(null);
  const { removeFromWishList, addToCart, setTrigger, loading, setLoading } = useContext(userContext);
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data.userID;

  useEffect(() => {
    if (data && data.userID) {

      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/users/wishlist/${userID}`,
            // `https://backend-ecommerce-furniture.onrender.com/users/wishlist/${userID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "Application/json",
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          setWishList(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }
  }, [userID]);

  const addToCartItem = async (id) => {
    await addToCart(id)
    setTrigger(id)
  }

  const handleRemoveItem = async (id) => {
    const success = await removeFromWishList(id);
    if (success) {
      setWishList((prevUser) => ({
        ...prevUser,
        data: prevUser.data.filter((item) => item._id !== id),
      }));
      setTrigger(true)
      setAlert({ type: "info", message: "Remove From WishList" });
      setTimeout(() => setAlert(null), 1000);
    }
  };

  const hasItemsInWishList = wishlist?.data?.length > 0;

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className="wishlist-container">
    {alert && (
      <AlertBox
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(null)}
      />
    )}
    <h1 className="wishlist-title">My Wishlist</h1>
    <div className="wishlist-grid">
      {wishlist?.data?.length > 0 ? (
        wishlist.data.map((item) => (
          <div key={item._id} className="wishlist-item">
            <img
              src={item.image}
              alt={item.name}
              className="wishlist-item-image"
            />
            <div className="wishlist-item-details">
              <h2 className="wishlist-item-name">{item.name}</h2>
              <p className="wishlist-item-price">₹ {item.price}</p>
              <div className="wishlist-item-actions">
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="wishlist-item-remove-button"
                >
                  🗑️
                </button>
                <Link to={"/cart"} onClick={() => addToCartItem(item._id)}>
                  <IoCartSharp className="wishlist-item-add-to-cart" />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="wishlist-empty-message">Your wishlist is empty.</p>
      )}
    </div>
  </div>
  );
};

export default Wishlist;
