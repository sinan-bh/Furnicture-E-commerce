import React from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import "./categories.css";
import List from "./List";

function Collections({ type }) {
  const list =
    type === "All" ? Dataset : Dataset.filter((list) => list.type === type);

  return (
    <div className="container bg-color">
      <h2 className="categories-head text-center" >
        {type === "All" && "All Products"}
        {type === "Living Room Furniture" && "Living Room Furniture"}
        {type === "Dining Room Furniture" && "Dining Room Furniture"}
        {type === "Bedroom Furniture" && "Bedroom Furniture"}
      </h2>
      <div className=" furcategories ">
      {list.map((item) => (
          <List  key={item.id} list={item}></List>
            ))}
      </div>
    </div>
  );
}

export default Collections;
