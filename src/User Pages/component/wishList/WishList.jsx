import React, { useEffect, useState } from "react";
import wishStyle from "./wishlist.module.css";
import { IoCartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import AlertBox from "../../../popup box/AlertBox";
import Spinner from "../../../popup box/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishList,
} from "../../../lib/store/features/whishListSlice";
import { addToCart } from "../../../lib/store/features/cartSlice";

const Wishlist = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishList);

  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data?.userID;

  useEffect(() => {
    if (userID) {
      dispatch(fetchWishlist(userID));
    }
  }, [dispatch, userID]);

  const addToCartItem = (id) => {
    dispatch(addToCart({ userID, productID: id }));
    setAlert({ type: "success", message: "Added To Cart" });
    setTimeout(() => setAlert(null), 1000);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromWishList({ userID, productID: id }));
    setAlert({ type: "success", message: "Removed from Wishlist" });
    setTimeout(() => setAlert(null), 1000);
  };

  const handleDetails = (id) => {
    navigate(`/allproducts/${id}`);
  };

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
        {items?.length > 0 ? (
          items?.map((item) => (
            <div key={item._id} className={wishStyle["wishlist-item"]}>
              <img
                src={item.image}
                alt={item.name}
                className={wishStyle["wishlist-item-image"]}
                onClick={() => handleDetails(item._id)}
              />
              <div className={wishStyle["wishlist-item-details"]}>
                <h2 className={wishStyle["wishlist-item-name"]}>
                  {item.title}
                </h2>
                <div className={wishStyle["wishlist-item-prices"]}>
                  <p className={wishStyle["wishlist-item-price"]}>
                    Price ₹ {item.price}
                  </p>
                  <p className={wishStyle["wishlist-item-price"]}>
                    Offer Price ₹ {item.offerPrice}
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
