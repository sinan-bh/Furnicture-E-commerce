import React, { createContext, useContext, useState } from 'react'
import { Dataset } from '../../assets/data-set.js/dataSet'


export const addContext = createContext(null)

const getDefualtCart = () => {
    const cart = {}
    // console.log(cart);
    for (let i = 1; i < Dataset.length+1; i++) {
        cart[i] = 0;
        
    }
    return cart
}

function CartContext(props) {

    const [cartItem , setCartItem] = useState(getDefualtCart())
    const [total,setTotal] = useState(0)
    const addToCart = (listID) => {
        setTotal(total+1)
        alert('card added')
        setCartItem(prev=>({...prev, [listID] : prev[listID] + 1}))
    }

    const removeFromCart = (listID) => {
        setCartItem(prev=>({...prev, [listID] : prev[listID] - 1}))
        setTotal(total-1)
    }

    // const countTotal = () => {
    //     setTotal(pre=>([...pre],cartItem))
    // }

    const contextValue = {cartItem,addToCart,removeFromCart,total}
    // console.log(contextValue);

  return (
    <addContext.Provider value={contextValue}>
      {props.children}
    </addContext.Provider>
  )
}

export default CartContext
