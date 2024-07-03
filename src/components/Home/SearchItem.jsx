import React, { useContext } from "react";
import { Dataset } from "../../assets/data-set.js/dataSet";
import List from "../Products/List";
import "./Style.css";
import { addContext } from "../context/CartContext";

function SearchItem() {
  const { searchTerm } = useContext(addContext);

  const list = Dataset.filter((item) =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-5">
      <h2 className="container text-center pt-5 mt-5 ">
        Searched Items are...!
      </h2>
      <div className=" search  ">
        {list.map((item) => (
          <List key={item.id} list={item}></List>
        ))}
      </div>
    </div>
  );
}

export default SearchItem;
