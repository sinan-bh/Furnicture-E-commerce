import React from "react";
import "./products.css";
import List from "./List";
import useFetch from "../../../Custom Hook/useFetch";


function Collections({ type }) {

  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/users/products");

  const {
    data: category,
  } = useFetch(`http://localhost:3000/users/products?category=${type}`);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }
  

  const list =
    type === "All" ? products : category;

  return (
    <div className="container  card-list pb-5 mb-5">
      <h2 className="categories-head text-center">
        {type === "All" && "All Products"}
        {type === "livingroom" && "Living Room Furniture"}
        {type === "diningroom" && "Dining Room Furniture"}
        {type === "bedroom" && "Bedroom Furniture"}
      </h2>
      <div className=" furcategories">
        {list?.map((item) => (
          <List key={item._id} list={item}></List>
        ))}
      </div>
    </div>
  );
}

export default Collections;
