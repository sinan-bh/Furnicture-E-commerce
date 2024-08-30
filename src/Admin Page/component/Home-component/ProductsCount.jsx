import React from "react";
import useFetch from "../../../Custom Hook/useFetch";

import './home-combonent.css'

function ProductsCount() {
  const { data: user, loading, error } = useFetch("http://localhost:3000/admin/allusers");
  const {
    data: products,
    load,
    err,
  } = useFetch("http://localhost:3000/admin/products");

  console.log(user);
  
  const { data: orders } = useFetch("http://localhost:3000/admin/orders/details")

  if (loading || load) {
    return <div>Loading...</div>;
  }

  if (error || err) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || !products || user.length === 0 || products.length === 0) {
    return <div>No products found.</div>;
  }

  const livingRoomItems = products
    .filter((type) => type.type === "Living Room Furniture")
    .reduce((total, item) => total + parseInt(item.quantity), 0);
  const diningRoomItems = products
    .filter((type) => type.type === "Dining Room Furniture")
    .reduce((total, item) => total + parseInt(item.quantity), 0);
  const bedRoomItems = products
    .filter((type) => type.type === "Bedroom Furniture")
    .reduce((total, item) => total + parseInt(item.quantity), 0);

  const livingRoom = products.filter(
    (type) => type.type === "Living Room Furniture"
  ).length;
  const diningRoom = products.filter(
    (type) => type.type === "Dining Room Furniture"
  ).length;
  const bedRoom = products.filter(
    (type) => type.type === "Bedroom Furniture"
  ).length;

  console.log(orders);
  

  return (
    <div className="productCountTable">
      <h1 className="">
        <span className="bold">Products</span>
      </h1>
      <table className="productCountTableItem">
        <thead>
          <tr>
            <th scope="col" className="">Category</th>
            <th scope="col">Products</th>
            <th scope="col">Products Items</th>
            <th scope="col">Purchased Products</th>
            <th scope="col">Total Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Living Room</td>
            <td>{livingRoom}</td>
            <td>{livingRoomItems}</td>
            <td>{orders?.livingPurchased}</td>
            <td>{livingRoomItems - orders?.livingPurchased}</td>
          </tr>
          <tr>
            <td>Dining Room</td>
            <td>{diningRoom}</td>
            <td>{diningRoomItems}</td>
            <td>{orders?.diningPurchased}</td>
            <td>{diningRoomItems - orders?.diningPurchased}</td>
          </tr>
          <tr>
            <td>Bed Room</td>
            <td>{bedRoom}</td>
            <td>{bedRoomItems}</td>
            <td>{orders?.bedPurchased}</td>
            <td>{bedRoomItems - orders?.bedPurchased}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsCount;
