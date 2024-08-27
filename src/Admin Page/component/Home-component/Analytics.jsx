import React, { useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

function Analytics() {
  const { data: user, loading, error } = useFetch("http://localhost:3000/admin/allusers");
  const {
    data: products,
    load,
    err,
  } = useFetch("http://localhost:3000/admin/products");

  const {
    data: order,
  } = useFetch("http://localhost:3000/admin/orders/details");

  if (loading || load) {
    return <div>Loading...</div>;
  }

  if (error || err) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || !products || user.length === 0 || products.length === 0) {
    return <div>No products found.</div>;
  }

  console.log(user);
  

  const userCount = user.data.length;
  const productCount = products.length;
  const orderCount = order?.total_purchase;
  const totalRevanue = order?.revanue;
  console.log(order);
  

  return (
    <div>
      <h1 className="text-center my-5">
        <span className="bold">Analytics</span>
      </h1>
      <div className="card-container-bg ">
        <div className="card">
          <div className="card-header ps-5">
            <span>Products</span>
          </div>
          <div className="card-body">
            <h2>{productCount}</h2>
            <p className="positive">Total Products Since last week</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header ps-5">
            <span>Users</span>
          </div>
          <div className="card-body">
            <h2>{userCount}</h2>
            <p className="positive">Total Register Users Since last week</p>
          </div>
        </div> 
        <div className="card">
          <div className="card-header ps-5">
            <span>Orders</span>
          </div>
          <div className="card-body">
            <h2>{orderCount}</h2>
            <p className="positive">Total Orders Since last week</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header ps-5">
            <span>Total Revanue</span>
          </div>
          <div className="card-body">
            <h2>$ {totalRevanue}</h2>
            <p className="positive">Popular products Since last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
