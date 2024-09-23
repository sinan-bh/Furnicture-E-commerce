import React, { useState } from "react";
import "./products.css";
import List from "./List";
import Pagination from "../../../popup box/Pagination";
import Spinner from "../../../popup box/Spinner";
import useFetch from "../../../Custom Hook/useFetch";

function Collections({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/users/products");

  const {
    data: category,
  } = useFetch(`http://localhost:3000/users/products?category=${type}`);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center  h-100"><Spinner /></div>;
  }

  if (error) {
    return <div>Error: {error?.message || JSON.stringify(error)}</div>;
  }

  if (!products || products?.length === 0) {
    return <div>No products found.</div>;
  }

 
  const list = type === "All" ? products : category;

 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = list?.slice(indexOfFirstProduct, indexOfLastProduct);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container card-list pb-5 mb-5">
      <h2 className="categories-head text-center">
        {type === "All" && "All Products"}
        {type === "livingroom" && "Living Room Furniture"}
        {type === "diningroom" && "Dining Room Furniture"}
        {type === "bedroom" && "Bedroom Furniture"}
      </h2>
      <div className="furcategories">
        {currentProducts?.map((item) => (
          <List key={item._id} list={item} />
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={list?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Collections;
