import React, { useContext } from "react";
import { userContext } from "../../../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import useFetch from "../../../Custom Hook/useFetch";



function AddCart() {

  const { cartItem, price, count, removeAllItem, userDatas } = useContext(userContext);
  const navigate = useNavigate();

    const handleCheckout = () => {
        navigate("/payment");
    }

    const {user} = userDatas
    
    const {
      data: cart,
      loading,
      error,
    } = useFetch(`http://localhost:3000/users/cart/${user._id}`);
  
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message || JSON.stringify(error)}</div>;
    }
  
    if (!cart || cart.length === 0) {
      return <div>No cart found.</div>;
    }
    
   const carts = cart.map(item=> item.prodid)
   console.log(carts);
   

  const hasItemsInCart = carts.some((item) => item !== 0);

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
            <h6>${price}</h6>
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
