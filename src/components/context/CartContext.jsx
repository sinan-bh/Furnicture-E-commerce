import React, { createContext, useEffect, useState } from 'react'
import { Dataset } from '../../assets/data-set.js/dataSet'


export const addContext = createContext(null)

const getDefualtCart = () => {
    const cart = {}
    for (let i = 1; i < Dataset.length+1; i++) {
        cart[i] = 0;
        
    }
    return cart
}
function CartContext(props) {

    const [cartItem , setCartItem] = useState(getDefualtCart)
    const [price,setPrice] = useState(0)
    const [count,setCount] = useState(0)
    
    
  
    
    useEffect(()=>{
      const totalCount = Object.keys(cartItem).reduce((total,id)=>total + cartItem[id],0)

      // const removeItem = totalCount - Object.keys(cartItem).filter(item=>item)


      const totalPrice = Object.keys(cartItem).reduce((total,id)=>{
      const price = Dataset.find(value=>value.id == id)?.price
        return total + cartItem[id]* price
           
     },0)
      setPrice(totalPrice)
      setCount(totalCount)
    },[cartItem])


    const addToCart = (listID) => {
        setCartItem((prev)=> ({ ...prev, [listID]: prev[listID] + 1 }))

    }

    const removeFromCart = (listID) => {
        setCartItem(prev=> {
          if (prev[listID] === 1) {
            const newCartItems = { ...prev };
            delete newCartItems[listID];
            return newCartItems;
          }
          return { ...prev, [listID]: prev[listID] - 1 };
        });
    }

    //   const removeCart = (id) => {

    // // addToCart( cartItem[id] = 0 )
    // console.log(id);

    // const removCount = 

    // setCount(removCount)
  // }


    const contextValue = {cartItem,addToCart,removeFromCart,price,count,setCount}

  return (
    <addContext.Provider value={contextValue}>
      {props.children}
    </addContext.Provider>
  )
}

export default CartContext
