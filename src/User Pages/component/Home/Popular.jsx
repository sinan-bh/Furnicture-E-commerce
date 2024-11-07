import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Spinner from "../../../popup box/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchpPopularProducts } from "../../../lib/store/features/productSlice";

function Popular() {
  const dispatch = useDispatch();
  const { popular, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchpPopularProducts());
  }, []);


  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="category">
      <div className="container card  mt-5">
        <h2 className="text-center mt-4">Popular Products</h2>
        <div className="  p-5 ">
          <div className=" ms-3 grid-style">
            {popular?.map((list) => (
              <div key={list._id} className=" mb-4">
                <Link to={`/allproducts/${list._id}`}>
                  <img
                    src={list.image}
                    alt={list.name}
                    className="card category-image"
                  />
                </Link>
                <h5 className="text-start text-secondary mt-3 me-3">
                  {list.name}
                </h5>
                <div>
                  <h6 className="text-success">$ {list.offerPrice}</h6>
                  <small>
                    <del className="text-danger">$ {list.price}</del>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;
