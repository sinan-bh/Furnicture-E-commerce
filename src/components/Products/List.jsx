import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import { addContext } from "../context/CartContext";

function List({ list }) {
  const { id: productID, image, imageCategory, description, price } = list;
  const { addToCart } = useContext(addContext);


  return (
    <div className="card card-item">
      <div class=" col-md-6">
        <Link to={`/allproducts/${productID}`}>
          <img
            src={image}
            className="img-style img-fluid rounded-start"
            alt=""
          />
        </Link>
      </div>
      <div className="text-control">
        <div className=" mt-3 ms-3">
          <Link
            to={`/allproducts/${productID}`}
            className="text-decoration-none"
          >
            <h5 className="card-title">{imageCategory}</h5>
          </Link>
          <p className="card-text mt-3">{description}</p>
          <p className="card-text ">
            <small class="text-muted ">$ {price}</small>
          </p>
        </div>
        <button
          className="btn-list btn btn-primary m-3"
          onClick={() => addToCart(productID)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default List;