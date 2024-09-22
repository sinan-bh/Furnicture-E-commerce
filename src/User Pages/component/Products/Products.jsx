import React, { useState } from "react";
import "./products.css";
import List from "./List";
import Pagination from "../../../popup box/Pagination";
import useFetch from "../../../Custom Hook/useFetch";

function Collections({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Adjust the number of products per page

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

  // Determine the correct list to use (all products or filtered by category)
  const list = type === "All" ? products : category;

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = list?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
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
        {currentProducts.map((item) => (
          <List key={item._id} list={item} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={list.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Collections;
