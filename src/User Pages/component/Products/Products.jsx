import React from "react";
// import { Dataset } from "../../assets/data-set/dataSet";
import "./products.css";
import List from "./List";
import useFetch from "../../../Custom Hook/useFetch";

function Collections({ type }) {

  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:8000/products");

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
    type === "All" ? products : products.filter((list) => list.type === type);

  return (
    <div className="container  card-list pb-5 mb-5">
      <h2 className="categories-head text-center">
        {type === "All" && "All Products"}
        {type === "Living Room Furniture" && "Living Room Furniture"}
        {type === "Dining Room Furniture" && "Dining Room Furniture"}
        {type === "Bedroom Furniture" && "Bedroom Furniture"}
      </h2>
      <div className=" furcategories">
        {list.map((item) => (
          <List key={item.id} list={item}></List>
        ))}
      </div>
    </div>
  );
}

export default Collections;
