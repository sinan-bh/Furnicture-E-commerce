import React, { useContext } from "react";
import List from "../Products/List";
import "./home.css";
import { addContext } from "../../../context/CartContext";
import useFetch from "../../../Custom Hook/useFetch";

function SearchItem() {
  const { searchTerm } = useContext(addContext);

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

  const list = products.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.imageCategory.toLowerCase().includes(searchTerm.toLowerCase())
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
