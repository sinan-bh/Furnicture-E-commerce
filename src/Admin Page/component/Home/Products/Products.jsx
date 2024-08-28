import React, { useState } from "react";
import useFetch from "../../../../Custom Hook/useFetch";
import "./products.css";
import { Link } from "react-router-dom";

function Products({ type }) {

  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: products,
    loading,
    error,
    setData: setProducts,
  } = useFetch("http://localhost:3000/admin/products");


  const handleDelete = async (id) => {
    const confirm = window.confirm('Do You Want Delete Product....?')
    if (confirm) {
      
      alert('Deleted')
      try {
        const response = await fetch(`http://localhost:6000/admin/product/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    };
    }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
    
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const filteredProducts = products.filter(
    (product) =>
      type === "All" || product.category === type
  ).filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="adminhome">
      <h2 className="text-center">
        {type === "All" && "All Products"}
        {type === "livingroom" && "Living Room Furniture"}
        {type === "diningroom" && "Dining Room Furniture"}
        {type === "bedroom" && "Bedroom Furniture"}
      </h2>
      <div className="search-addBtn">
      <div className="AddBtn">
        <button className="btn btn-success mb-2">
          <Link to={"/adminhome/add-edit-product"} className="text-none text-white">Add New Product</Link>
        </button>
      </div>
      <div className="search-container-products mb-3">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control search-input"
        />
      </div>
      </div>
      <div className="categorys ">
        <div className="category-name">Select category</div>
        <div className="category-type">
          <div value="All" className=" product-name ms-3">
            <Link to={"/adminhome/product-details"} className="text-none">All Products</Link>
          </div>
          <div value="Living Room Furniture" className="ms-3 product-name">
            <Link to={"/adminhome/product-details/product-lvingroom"} className="text-none">
              Living Room Furniture
            </Link>
          </div>
          <div value="Dining Room Furniture" className="ms-3 product-name">
            <Link to={"/adminhome/product-details/product-diningset"} className="text-none">
              Dining Room Furniture
            </Link>
          </div>
          <div value="Bedroom Furniture" className="ms-3 product-name">
            <Link to={"/adminhome/product-details/product-bedroom"} className="text-none">
              Bedroom Furniture
            </Link>
          </div>
        </div>
      </div>
      <div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">ProductId</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Details</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product,index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.details}</td>
                <td className="amount">
                  <div>Price: <span className="text-secondary">${product.price}</span></div>
                  <div className="mt-5">Offer Price: <span className="text-success">${product.offerPrice}</span></div>
                </td>
                <td className="edit-del">
                  <Link
                    to={`/adminhome/add-edit-product/${product._id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
