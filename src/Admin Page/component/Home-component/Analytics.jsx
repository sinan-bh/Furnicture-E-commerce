import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

import './home-combonent.css'
import Spinner from "../../../popup box/Spinner";
import { formContext } from "../../../context/AdminContext";

function Analytics() {
  const { users, loading, orderDetails, products} = useContext(formContext)

  const userCount = users?.data?.length;
  const productCount = products?.length;
  const orderCount = orderDetails?.total_purchase;
  const totalRevanue = orderDetails?.revanue;

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="text-center my-5">
        <span className="bold">Analytics</span>
      </h1>
      <div className="card-container-bg ">
        <div className="card-1 ">
          <div className="">
            <span className="bold">Products</span>
          </div>
          <div className="card-body">
            <h2>{productCount}</h2>
            <p className="positive">Total Products Since last week</p>
          </div>
        </div>
        <div className="card-1">
          <div className="">
            <span className="bold">Users</span>
          </div>
          <div className="card-body">
            <h2>{userCount}</h2>
            <p className="positive">Total Register Users Since last week</p>
          </div>
        </div> 
        <div className="card-1">
          <div className="">
            <span className="bold">Orders</span>
          </div>
          <div className="card-body">
            <h2>{orderCount}</h2>
            <p className="positive">Total Orders Since last week</p>
          </div>
        </div>
        <div className="card-1">
          <div className="">
            <span className="bold">Total Revanue</span>
          </div>
          <div className="card-body">
            <h2>${totalRevanue?.toFixed(2)}</h2>
            <p className="positive">Popular products Since last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
