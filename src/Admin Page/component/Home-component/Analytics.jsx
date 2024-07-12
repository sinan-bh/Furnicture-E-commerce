import React, { useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

function Analytics() {
  const { data: user, loading, error } = useFetch("http://localhost:8000/user");
  const {
    data: products,
    load,
    err,
  } = useFetch("http://localhost:8000/products");

  if (loading || load) {
    return <div>Loading...</div>;
  }

  if (error || err) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || !products || user.length === 0 || products.length === 0) {
    return <div>No products found.</div>;
  }

  const userCount = user.length;
  const productCount = products.length;
  const orderCount = user
    .map((item) => item.order.quantity)
    .reduce((total, order) => total + Number(order), 0);

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
            <span>Popular</span>
          </div>
          <div className="card-body">
            <h2>8</h2>
            <p className="positive">Popular products Since last week</p>
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
      </div>
    </div>
  );
}

export default Analytics;
