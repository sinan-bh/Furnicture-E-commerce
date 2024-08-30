import React, { useEffect, useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

import './home-combonent.css'

function ProductsCount() {
  const [products, setProducts] = useState([]);
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/products`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const product = await res.json();
        console.log(product);

        setProducts(product);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/orders/details`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const orders = await res.json();

        setOrder(orders);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);

  const livingRoomItems = products
    ?.filter((type) => type.type === "Living Room Furniture")
    .reduce((total, item) => total + Number(item.quantity), 0);
  const diningRoomItems = products
    ?.filter((type) => type.type === "Dining Room Furniture")
    .reduce((total, item) => total + Number(item.quantity), 0);
  const bedRoomItems = products
    ?.filter((type) => type.type === "Bedroom Furniture")
    .reduce((total, item) => total + Number(item.quantity), 0);

  const livingRoom = products?.filter(
    (type) => type.type === "Living Room Furniture"
  ).length;
  const diningRoom = products?.filter(
    (type) => type.type === "Dining Room Furniture"
  ).length;
  const bedRoom = products?.filter(
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
