import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function AddCart() {
  const { cart, setOrder, setCartProduct } = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [price, setPrice] = useState();
  const [count, setCount] = useState();

  const cartPrice = parseFloat(localStorage.getItem("cartPrice")) || price;
  const cartCount = parseInt(localStorage.getItem("cartCount")) || count;

  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (data && data.userID) {
      const userID = data.userID;

      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/users/cart/${userID}`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json"
            },
            credentials: 'include',
          });
          const product = await res.json();
          console.log(product);

          setUser(product);
          setCartProduct(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (cart?.data?.length > 0 && user?.length > 0) {
      const carts = user.filter((item) => item.prodid);
      const totalItem = cart.data.reduce((total, item) => {
        const matchingProduct = carts.find(
          (cartItem) => cartItem.prodid._id === item.prodid
        );
        return matchingProduct ? total + item.quantity : total;
      }, 0);
      setCount(totalItem === 0 ? 1 : totalItem);
      localStorage.setItem("cartCount", totalItem);

      const totalPrice = cart.data.reduce((total, item) => {
        const priceItem = carts.find(
          (cartItem) => cartItem.prodid._id === item.prodid
        );
        if (priceItem) {
          if (item.quantity === 0) {  
            return total + 1 * priceItem.prodid.offerPrice;
          }else{
            return total + item.quantity * priceItem.prodid.offerPrice;
          }
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
        amount: price,
      }),
      credentials: 'include',
    });

    const order = await response.json();
    setOrder(order);
    localStorage.setItem("order", JSON.stringify({ order }));
    console.log(order);

    navigate("/payment");
  };

  const handleItemRemove = (id) => {
    setUser(user.filter(item => item.prodid._id !== id));
  };

  const carts = user.filter((item) => item.prodid);
  const hasItemsInCart = carts.length > 0;

  return (
    <div>
      {/* <Link to={'/orderstatus'} className="orderstatus btn btn-secondary">Order Products Status</Link> */}
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
              <h6>Sub-Total ({cartCount} items)</h6>
              <h6>${cartPrice}</h6>
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
