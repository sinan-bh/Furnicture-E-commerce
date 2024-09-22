import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { userContext } from "../../../context/CartContext";
import { IoCartSharp } from "react-icons/io5";
import AlertBox from "../../../popup box/AlertBox";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const [alert, setAlert] = useState(null);
  const { removeFromWishList, addToCart, setTrigger } = useContext(userContext);
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

  return (
    <div className="wishlist-container">
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {hasItemsInWishList ? (
      <div>
        {wishlist?.data?.map((product) => (
          <div className="product" key={product._id}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
            </div>
            <div className="product-price">price ${product.price}</div>
            <div className="product-price">
              offerPrice ${product.offerPrice}
            </div>
            <div className="add-delete" >
              <div className="delete-icon" onClick={()=> addToCartItem(product._id)}>
                <IoCartSharp />
              </div>
              <div
                className="delete-icon"
                onClick={() => handleRemoveItem(product._id)}
              >
                🗑️
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-center bg-white card empt-cart">
        <h2>Your WishList is empty...!</h2>
      </div>
      )}
    </div>
  );
};

export default Wishlist;
