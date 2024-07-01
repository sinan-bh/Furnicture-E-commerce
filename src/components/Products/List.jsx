import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import { addContext } from "../context/CartContext";


function List({ list }) {
    const{id,image,imageCategory,description,price} = list
    const {addToCart} = useContext(addContext)
    

    
  return (
    <div className="card card-item">
      <div class=" col-md-6">
        <Link to={`${id}`}>
          <img
            src={image}
            className="img-style img-fluid rounded-start"
            alt=""
          />
        </Link>
      </div>
      <div className="text-control">
        <div className=" mt-3 ms-3">
          <Link to={`${id}`} className="text-decoration-none">
            <h5 className="card-title">{imageCategory}</h5>
          </Link>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small class="text-muted">${price}</small>
          </p>
        </div>
        <button className="btn-list btn btn-primary m-3"  onClick={()=>addToCart(id) }>ADD TO CART</button>
      </div>
    </div>
  );
}

export default List;
