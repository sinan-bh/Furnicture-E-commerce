import React, { createContext, useEffect, useState } from "react";
import { Dataset } from "../assets/data-set/dataSet";
import { useNavigate } from "react-router-dom";

export const addContext = createContext(null);


function CartContext(props) {

  const [cartItem, setCartItem] = useState({});
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userDatas,setUserDatas] = useState([])
 

  const [log, setLog] = useState({
    id:'',
    lname: "",
    lpass: "",
  });




  const navigate = useNavigate();


  useEffect(() => {
    const totalCount = Object.keys(cartItem).reduce(
      (total, id) => total + cartItem[id],
      0
    );

    const totalPrice = Object.keys(cartItem).reduce((total, id) => {
      const price = Dataset.find(
        (value) => value.id === Number(id)
      )?.offerPrice;
      return total + cartItem[id] * price;
    }, 0);
    setPrice(totalPrice);
    setCount(totalCount);
   
  }, [cartItem]);

 


  const addToCart = async(productID) => {
    if (!log.lname) {
      navigate("/login");
    } else {
      setCartItem((prev) => {
        if (prev[productID]) {
          
         return { ...prev, [productID]: prev[productID] + 1 }
        }
         return { ...prev, [productID]: 1 }
        })
    }
  };


  useEffect(()=>{

    const setCart = async()=>{

      try {

        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({cart: cartItem}),
        };
  
        const url = `http://localhost:8000/user/${log.id}`
  
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } 
      } catch (error) {
        console.error("Failed to add/edit product:", error);
      }
      
    }
    setCart()

  },[cartItem])

  useEffect(()=>{
    if (log.id) {

    const url = `http://localhost:8000/user/${log.id}`

    fetch(url)
      .then(res=>res.json())
      .then(data=> setCartItem(data.cart))

    }
   

  },[log.id])


  const removeFromCart = (productID) => {
    setCartItem((prev) => {
      const newCart = {
        ...prev,
        [productID]: Math.max(1, prev[productID] - 1),
      };
      return newCart;
    });
  };


  const removeItem = (productID) => {
    setCartItem((prev) => {
      const newCart = { ...prev, [productID]: 0 };
      return newCart;
    });
  };


  const removeAllItem = () => {
    setCartItem({});
  };

  
  const contextValue = {
    Dataset,
    cartItem,
    price,
    count,
    searchTerm,
    log,
    userDatas,
    addToCart,
    removeFromCart,
    removeItem,
    removeAllItem,
    setSearchTerm,
    setLog,
    setUserDatas,
    setCartItem,
    
  };





  return (
    <addContext.Provider value={contextValue}>
      {props.children}
    </addContext.Provider>
  );
}

export default CartContext;
