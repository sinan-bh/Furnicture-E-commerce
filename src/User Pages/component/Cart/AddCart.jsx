import React, { useContext, useEffect, useState } from "react";
import CardItems from "./CardItems";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartProducts,
  removeFromCart,
  updateQuantity,
} from "../../../lib/store/features/cartSlice";
import Spinner from "../../../popup box/Spinner";
import { axiosPrivate } from "../../../utils/axios";

function AddCart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data?.userID;

  useEffect(() => {
    if (userID) {
      dispatch(fetchCartProducts(userID));
    }
  }, [userID, dispatch]);


  useEffect(() => {
    if (cart?.length > 0) {
      const totalItemCount = cart?.reduce((total, item) => total + Number(item.quantity), 0);
      setCount(totalItemCount);

       const totalCartPrice = cart.reduce((total, item) => {
        const offerPrice = item?.prodid?.offerPrice || 0; 
        return total + item.quantity * offerPrice;
      }, 0);
      setPrice(totalCartPrice.toFixed(2));
    } else {
      setCount(0);
      setPrice(0);
    }
  }, [cart, userID]);

  const handleCheckout = async () => {
    try {
      const response = await axiosPrivate.post(
        `/users/payment/${userID}`,
        { amount: price },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      const order = response.data;
      localStorage.setItem("order", JSON.stringify({ order }));
      navigate("/payment");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleItemRemove = (productID) => {
    dispatch(removeFromCart({ userID, productID }));
    dispatch(fetchCartProducts(userID))
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Link to={"/orderstatus"} className="orderstatus btn btn-secondary">
        Order Products Status
      </Link>
      <div className="container">
        {cart?.length > 0 ? (
          <div className="cart-container">
            <h2 className="text-center">Your Carts Are...!</h2>
            <div className="d-flex justify-content-between">
              <h5 className="mb-3">Shopping Cart</h5>
            </div>
            {cart?.map((card) => (
              <CardItems
                key={card?._id}
                userID={userID}
                item={card}
                onRemove={handleItemRemove}
              />
            ))}
            <hr />
            <div className="cart-summary">
              <h6>Sub-Total ({count} items)</h6>
              <h6>${price}</h6>
            </div>
            <div className="text-end">
              <button className="btn btn-secondary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white card empt-cart">
            <h2>Your cart is empty...!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCart;
