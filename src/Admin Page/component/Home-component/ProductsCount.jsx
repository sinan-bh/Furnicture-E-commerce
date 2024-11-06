import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

import './home-combonent.css'
import Spinner from "../../../popup box/Spinner";
import { formContext } from "../../../context/AdminContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails, fetchProducts } from "../../../lib/store/features/adminSlice";

function ProductsCount() {
  const dispatch = useDispatch()
  const {products,orderDetails,loading} = useSelector(state=> state.admin)

  useEffect(()=> {
    dispatch(fetchProducts())
    dispatch(fetchOrderDetails())
  }, [dispatch])
  
  const livingRoomItems = products
    ?.filter((type) => type?.type === "Living Room Furniture")
    ?.reduce((total, item) => total + Number(item?.quantity), 0);
  const diningRoomItems = products
    ?.filter((type) => type?.type === "Dining Room Furniture")
    ?.reduce((total, item) => total + Number(item?.quantity), 0);
  const bedRoomItems = products
    ?.filter((type) => type?.type === "Bedroom Furniture")
    ?.reduce((total, item) => total + Number(item?.quantity), 0);

  const livingRoom = products?.filter(
    (type) => type.type === "Living Room Furniture"
  ).length;
  const diningRoom = products?.filter(
    (type) => type.type === "Dining Room Furniture"
  ).length;
  const bedRoom = products?.filter(
    (type) => type.type === "Bedroom Furniture"
  ).length;

  if (loading) {
    return <div><Spinner /></div>;
  }

  console.log(orderDetails);
  

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
            <td>{orderDetails?.livingPurchased}</td>
            <td>{livingRoomItems - orderDetails?.livingPurchased}</td>
          </tr>
          <tr>
            <td>Dining Room</td>
            <td>{diningRoom}</td>
            <td>{diningRoomItems}</td>
            <td>{orderDetails?.diningPurchased}</td>
            <td>{diningRoomItems - orderDetails?.diningPurchased}</td>
          </tr>
          <tr>
            <td>Bed Room</td>
            <td>{bedRoom}</td>
            <td>{bedRoomItems}</td>
            <td>{orderDetails?.bedPurchased}</td>
            <td>{bedRoomItems - orderDetails?.bedPurchased}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsCount;
