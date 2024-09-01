import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { userContext } from "../../../context/CartContext";
import { FaHeart } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

function List({ list }) {
  const { _id: productID, title, image, description, price, offerPrice } = list;

  const { addToCart, addWishList, setTrigger } = useContext(userContext);

  const addToCartItem = async (id) => {
    await addToCart(id)
    setTrigger(id)
  }

  const addToWishListItem = async (id) => {
    await addWishList(id)
    setTrigger(id)
  }



  return (
    <div className=" card-item">
      <div>
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
            <h5 className="card-title">{title}</h5>
          </Link>
          <p className="card-text mt-2">{description}</p>
          <p className="card-text ">
            <p className="text-price m-1 text-success">$ {offerPrice}</p>
            <small class="text-muted ">
              <del>$ {price}</del>
            </small>
          </p>
        </div>
        <div className="wish-cart">
          <div
            className="btn-save"
            onClick={() => addToWishListItem(productID)}
          >
            <FaHeart size={20}/>
          </div>
          <div
            className="btn-list"
            onClick={() => addToCartItem(productID)}
          >
            <MdShoppingCart size={20}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
