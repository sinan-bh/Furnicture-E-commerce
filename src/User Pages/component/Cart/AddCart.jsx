import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/CartContext";
import CardItems from "./CardItems";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import Spinner from "../../../popup box/Spinner";

function AddCart() {
  const { cart, setOrder, cartProduct } = useContext(userContext);
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const data = JSON.parse(localStorage.getItem("currentUser"));

  const userID = data.userID;

  useEffect(() => {
    if (userID) {

      const fetchData = async () => {
        try {
          // const res = await fetch(`http://localhost:3000/users/cart/${userID}`, {
          const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/users/cart/${userID}`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json"
            },
            credentials: 'include',
          });
          const product = await res.json();
          console.log(product);

          setCartItem(product);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }
  }, [cartProduct,userID]);

  useEffect(() => {
    if (cartItem?.length > 0) {
      const totalItemCount = cartItem?.reduce((total, item) => total + item.quantity, 0);
      setCount(totalItemCount);

      const totalCartPrice = cartItem?.reduce((total, item) => total + item.quantity * item.prodid.offerPrice, 0);
      setPrice(totalCartPrice.toFixed(2));
    } else {
      setCount(0);
      setPrice(0);
    }
  }, [cartItem]);

 

  const handleCheckout = async () => {
    console.log(price);
    
    // const response = await fetch(`http://localhost:3000/users/payment/${userID}`, {
    const response = await fetch(`https://backend-ecommerce-furniture.onrender.com/users/payment/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
      }),
      credentials: 'include',
    });

    const order = await response.json();
    console.log(order);
    
    setOrder(order);
    localStorage.setItem("order", JSON.stringify({ order }));

    navigate("/payment");
  };

  const handleItemRemove = (id) => {
    setCartItem(cartItem?.filter(item => item.prodid._id !== id));
  };

  const carts = cartItem?.filter((item) => item.prodid);
  const hasItemsInCart = carts.length > 0;

  if (loading) {
    return <div><Spinner /></div>;
  }
 

  return (
    <div>
      <Link to={'/orderstatus'} className="orderstatus btn btn-secondary">Order Products Status</Link>
      <div className="container">
        {hasItemsInCart ? (
          <div className="cart-container">
            <h2 className="text-center">Your Carts Are...!</h2>
            <div className="d-flex justify-content-between">
              <h5 className="mb-3">Shopping Cart</h5>
            </div>
            {carts.map((card) => {
              if (card) {
                return <CardItems key={card._id} item={card} onRemove={handleItemRemove} />;
              }
              return null;
            })}
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
