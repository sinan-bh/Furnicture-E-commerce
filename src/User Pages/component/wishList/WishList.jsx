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
            `http://localhost:3000/users/wishlist/${userID}`
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

  console.log(user);

  const handleRemoveItem = async (id) => {
    removeFromWishList(id);
  };

  return (
    <div className="wishlist-container">
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
          <div className="product-price">offerPrice ${product.offerPrice}</div>
          <div className="add-delete">
            <div className="delete-icon"><IoCartSharp /></div>
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
  );
};

export default Wishlist;
