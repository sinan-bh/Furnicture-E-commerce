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
<<<<<<< HEAD
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishList);

=======
  const navigete = useNavigate()
  const { removeFromWishList, addToCart, setTrigger,trigger, loading, setLoading } =
    useContext(userContext);
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data?.userID;

  useEffect(() => {
    if (userID) {
      dispatch(fetchWishlist(userID));
    }
<<<<<<< HEAD
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
=======
  }, [userID,trigger]);

  const addToCartItem = async (id) => {
    await addToCart(id);
    setTrigger(!trigger);
  };

  const handleRemoveItem = async (id) => {
    const success = await removeFromWishList(id);
    if (success) {
      setWishList((prevUser) => ({
        ...prevUser,
        data: prevUser.data.filter((item) => item._id !== id),
      }));
      setAlert({ type: "info", message: "Remove From WishList" });
      setTimeout(() => setAlert(null), 1000);
      setTrigger(true);
    }
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66
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
<<<<<<< HEAD
        {items?.length > 0 ? (
          items?.map((item) => (
            <div key={item._id} className={wishStyle["wishlist-item"]}>
=======
        {wishlist?.data?.length > 0 ? (
          wishlist.data.map((item) => (
            <div key={item._id} className={wishStyle["wishlist-item"]} >
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66
              <img
                src={item.image}
                alt={item.name}
                className={wishStyle["wishlist-item-image"]}
<<<<<<< HEAD
                onClick={() => handleDetails(item._id)}
=======
                onClick={()=>handleDetails(item._id)}
>>>>>>> 4c9eb599ba297559085d511ce885143557c0db66
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
