import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Dataset } from "../../assets/data-set.js/dataSet";
import "./Style.css";
import { addContext } from "../context/CartContext";

function ProductDetails() {
  const {addToCart} = useContext(addContext)

  const { productId } = useParams();

  const data = Dataset.filter((cart) => cart.id === parseInt(productId));

  console.log(data);

  return (
    <div className="container product mt-5">
      <div className="  mt-5 ">
        {data.map((cart) => (
          <div className="d-flex">
            <div key={cart.id} className="cart-image card">
              <img src={cart.image} alt={cart.imageCategory} />
            </div>
            <div className="card text-center cart-product pt-5">
              <h2>{cart.imageCategory}</h2>
              <p className="pt-3 description text-start">{cart.description}</p>
              <div className="addtocart">
                <h4>$ {cart.price} </h4>
                <button className="btn btn-secondary" onClick={()=>addToCart(productId)}>
                    Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
