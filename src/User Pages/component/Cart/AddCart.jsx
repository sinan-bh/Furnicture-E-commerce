import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/CartContext";
import CardItems from "./CardItems";
import { useNavigate } from "react-router-dom";
import "./Style.css";


function AddCart() {

  const { removeAllItem } = useContext(userContext);
  const navigate = useNavigate();
  const [user,setUser] = useState()

  console.log(user);
  
 
  
  const handleCheckout = () => {
    navigate("/payment");
  }
  
  const data = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {


    if (data && data.userID) {
      const userID = data.userID

        const FetchData = async () => {
          const res = await fetch(`http://localhost:3000/users/cart/${userID}`)
          const data = await res.json()
          console.log(data);
          
          setUser(data);        
        }
        FetchData()
      }
    }, []);

    const carts = user?.filter(item=> item.prodid)
    console.log(carts);

    const totalItem = carts?.reduce((total,item)=> total + item.quantity,0)    

    const totalPrice = carts?.reduce((total, item) => {  
      console.log(item.quantity);
          
      const price = carts?.find((value) => value.prodid === item.prodid)      
      return total + item.quantity * price.prodid.offerPrice.toFixed();
    }, 0);

    console.log(totalPrice);
    
    
 
   
  const hasItemsInCart = carts?.some((item) => item !== 0);
  console.log(hasItemsInCart);
  

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
            <h6>Sub-Total ({totalItem} items)</h6>
            <h6>${totalPrice}</h6>
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
