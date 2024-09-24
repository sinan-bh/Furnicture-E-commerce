import React, { useContext, useEffect, useState } from "react";
import wishStyle from "./wishlist.module.css"; // Importing CSS module
import { userContext } from "../../../context/CartContext";
import { IoCartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import AlertBox from "../../../popup box/AlertBox";
import Spinner from "../../../popup box/Spinner";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigete = useNavigate()
  const { removeFromWishList, addToCart, setTrigger, loading, setLoading } =
    useContext(userContext);
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data.userID;

  useEffect(() => {
    if (data && data.userID) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            // `http://localhost:3000/users/wishlist/${userID}`,
             `https://backend-ecommerce-furniture.onrender.com/users/wishlist/${userID}`,
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
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userID]);

  const addToCartItem = async (id) => {
    await addToCart(id);
    setTrigger(id);
  };

  const handleRemoveItem = async (id) => {
    const success = await removeFromWishList(id);
    if (success) {
      setWishList((prevUser) => ({
        ...prevUser,
        data: prevUser.data.filter((item) => item._id !== id),
      }));
      setTrigger(true);
      setAlert({ type: "info", message: "Remove From WishList" });
      setTimeout(() => setAlert(null), 1000);
    }
  };

  const handleDetails = (id) => {
    navigete(`/allproducts/${id}`)
  }

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={wishStyle["wishlist-container"]}>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <h1 className={wishStyle["wishlist-title"]}>My Wishlist</h1>
      <div className={wishStyle["wishlist-grid"]}>
        {wishlist?.data?.length > 0 ? (
          wishlist.data.map((item) => (
            <div key={item._id} className={wishStyle["wishlist-item"]} >
              <img
                src={item.image}
                alt={item.name}
                className={wishStyle["wishlist-item-image"]}
                onClick={()=> handleDetails(item._id)}
              />
              <div className={wishStyle["wishlist-item-details"]}>
                <h2 className={wishStyle["wishlist-item-name"]}>{item.title}</h2>
                <div className={wishStyle["wishlist-item-prices"]}>
                  <p className={wishStyle["wishlist-item-price"]}>
                    price ₹ {item.price}
                  </p>
                  <p className={wishStyle["wishlist-item-price"]}>
                    offerPrice ₹ {item.offerPrice}
                  </p>
                </div>
                <div className={wishStyle["wishlist-item-actions1"]}>
                  <div
                    onClick={() => handleRemoveItem(item._id)}
                    className={wishStyle["wishlist-item-remove-button1"]}
                  >
                    <MdDelete />
                  </div>
                  <div onClick={() => addToCartItem(item._id)}>
                      <IoCartSharp
                        className={wishStyle["wishlist-item-add-to-cart"]}
                      />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={wishStyle["wishlist-empty-message"]}>
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
