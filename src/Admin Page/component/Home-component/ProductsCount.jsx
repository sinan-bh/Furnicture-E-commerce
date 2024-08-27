import React from "react";
import useFetch from "../../../Custom Hook/useFetch";

function ProductsCount() {
  const { data: user, loading, error } = useFetch("http://localhost:3000/admin/allusers");
  const {
    data: products,
    load,
    err,
  } = useFetch("http://localhost:3000/admin/products");

  console.log(user);
  

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
    .reduce((total, item) => total + item.quantity, 0);
  const diningRoomItems = products
    .filter((type) => type.type === "Dining Room Furniture")
    .reduce((total, item) => total + item.quantity, 0);
  const bedRoomItems = products
    .filter((type) => type.type === "Bedroom Furniture")
    .reduce((total, item) => total + item.quantity, 0);

  const livingRoom = products.filter(
    (type) => type.type === "Living Room Furniture"
  ).length;
  const diningRoom = products.filter(
    (type) => type.type === "Dining Room Furniture"
  ).length;
  const bedRoom = products.filter(
    (type) => type.type === "Bedroom Furniture"
  ).length;

  return (
    <div>
      <h1 className="text-center">
        <span className="bold">Products</span>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="">Category</th>
            <th scope="col">Total Products</th>
            <th scope="col">Total Products Items</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Living Room</td>
            <td>{livingRoom}</td>
            <td>{livingRoomItems}</td>
          </tr>
          <tr>
            <td>Dining Room</td>
            <td>{diningRoom}</td>
            <td>{diningRoomItems}</td>
          </tr>
          <tr>
            <td>Bed Room</td>
            <td>{bedRoom}</td>
            <td>{bedRoomItems}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsCount;
