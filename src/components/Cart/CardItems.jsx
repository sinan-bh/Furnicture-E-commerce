import React from 'react'
import "../Cart/CardItems.jsx";


function CardItems({item}) {
    const {id,image,imageCategory,description,price} = item
  return (
    <div className="card card-item g-0">
    <div className=" col-md-4">
        <img
          src={image}
          className="img-style img-fluid rounded-start mt-4"
          alt=""
        />
    </div>
    <div className="text-control">
      <div className=" mt-3 ms-3">
          <h5 className="card-title">{imageCategory}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small class="text-muted">{price}</small>
        </p>
      </div>
    </div>
  </div>
  )
}

export default CardItems
