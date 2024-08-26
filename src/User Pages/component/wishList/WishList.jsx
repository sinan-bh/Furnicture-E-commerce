import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { userContext } from "../../../context/CartContext";
import { IoCartSharp } from "react-icons/io5";

const Wishlist = () => {
  const [user, setUser] = useState([]);
  const { removeFromWishList } = useContext(userContext);
  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (data && data.userID) {
      const userID = data.userID;

      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/users/wishlist/${userID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "Application/json",
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          setUser(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchData();
    }
  }, []);

  const handleRemoveItem = async (id) => {
    const success = await removeFromWishList(id);
    if (success) {
      setUser((prevUser) => ({
        ...prevUser,
        data: prevUser.data.filter((item) => item._id !== id),
      }));
    }
  };

  const hasItemsInWishList = user?.data?.length > 0;

  return (
    <div className="wishlist-container">
      {hasItemsInWishList ? (
      <div>
        {user?.data?.map((product) => (
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
            <div className="add-delete">
              <div className="delete-icon">
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
