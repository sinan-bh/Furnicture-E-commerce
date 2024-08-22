import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function AddCart() {
  const { removeAllItem, cart, setOrder } = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [price, setPrice] = useState(() => {
    return parseFloat(localStorage.getItem("cartPrice")) || 0;
  });
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem("cartCount")) || 0;
  });

  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (data && data.userID) {
      const userID = data.userID;

      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/users/cart/${userID}`);
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (cart.data && user.length > 0) {
      const carts = user.filter((item) => item.prodid);

      const totalItem = cart.data.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCount(totalItem);
      localStorage.setItem("cartCount", totalItem);

      const totalPrice = cart.data.reduce((total, item) => {
        const priceItem = carts.find(
          (value) => value.prodid._id === item.prodid
        );
        if (priceItem) {
          return total + item.quantity * priceItem.prodid.offerPrice;
        }
        return total;
      }, 0);

      setPrice(totalPrice);
      localStorage.setItem("cartPrice", totalPrice.toFixed(2));
    }
  }, [cart, user]);

  const handleCheckout = async () => {
    const userID = data.userID;
    const response = await fetch(`http://localhost:3000/users/payment/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price.toFixed(2) * 100,
      }),
    });

    const order = await response.json();
    setOrder(order)
    console.log(order);

    navigate("/payment");
  };

  const carts = user?.filter((item) => item.prodid);
  const hasItemsInCart = carts?.length > 0;

  return (
    <div className="container">
      {hasItemsInCart ? (
        <div className="cart-container">
          <h2 className="text-center">Your Carts Are...!</h2>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Shopping Cart</h5>
            <a
              href="#"
              className="text-danger float-end"
              onClick={removeAllItem}
            >
              Remove all
            </a>
          </div>
          {carts.map((card) => {
            if (card) {
              return <CardItems key={card._id} item={card} />;
            }
            return null;
          })}
          <hr />
          <div className="cart-summary">
            <h6>Sub-Total ({count} items)</h6>
            <h6>${price.toFixed(2)}</h6>
          </div>
          <div className="text-end">
            <button className="btn btn-secondary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center card empt-cart">
          <h2>Your cart is empty...!</h2>
        </div>
      )}
    </div>
  );
}

export default AddCart;
