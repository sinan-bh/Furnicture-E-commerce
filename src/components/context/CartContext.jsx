import React, { createContext, useEffect, useState } from 'react'
import { Dataset } from '../../assets/data-set.js/dataSet'
import { useNavigate } from 'react-router-dom'


export const addContext = createContext(null)

const getDefualtCart = () => {
    const cart = {}
    for (let i = 1; i < Dataset.length+1; i++) {
        cart[i] = 0;
        
    }
    return cart
}
function CartContext(props) {

    const [cartItem , setCartItem] = useState(getDefualtCart())
    const [price,setPrice] = useState(0)
    const [count,setCount] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    

    const [log, setLog] = useState({
      lname: "",
      lpass: "",
    });
    

    const navigate = useNavigate()
    
   
    
    useEffect(()=>{
      const totalCount = Object.keys(cartItem).reduce((total,id)=>total + cartItem[id],0)

      const totalPrice = Object.keys(cartItem).reduce((total,id)=>{
      const price = Dataset.find(value=>value.id == id)?.price
        return total + cartItem[id]* price
           
     },0)
      setPrice(totalPrice)
      setCount(totalCount)
    },[cartItem])


    const addToCart = (listID) => {
        if (!log.lname) {
          navigate("/login");
        } else {
          setCartItem((prev)=> ({ ...prev, [listID]: prev[listID] + 1 }))
        }
      }

    const removeFromCart = (listID) => {
      setCartItem((prev) => {
          const newCart = { ...prev, [listID]: Math.max(0, prev[listID] - 1) };
          return newCart;
      });
  };

  const removeItem = (listID) => {
    setCartItem((prev) => {
        const newCart = { ...prev, [listID]: 0 };
        return newCart;
    });
};

const removeAllItem = () => {
  setCartItem(getDefualtCart())
}




const contextValue = { cartItem, addToCart, removeFromCart, removeItem,removeAllItem,setSearchTerm, price, count ,searchTerm,log,setLog};

  return (
    <addContext.Provider value={contextValue}>
      {props.children}
    </addContext.Provider>
  )
}

export default CartContext
