import React, { useContext } from 'react'
import { Dataset } from '../../assets/data-set.js/dataSet'
import { addContext } from '../context/CartContext'
import List from '../categories/List'






function SearchItem() {

    const {searchTerm} = useContext(addContext)

    

    const list = Dataset.filter(item =>
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
        
      );

  return (
    <div>
        <h2 className='container text-center pt-5 mt-5 text-white'>Seardched Items are...!</h2>
      <div className=" furcategories m-5 py-5">
      {list.map((item) => (
          <List  key={item.id} list={item}></List>
            ))}
      </div>
    </div>
  )
}

export default SearchItem
