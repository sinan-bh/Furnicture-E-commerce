import React, { useState } from "react";
import "./admin.css";
import useFetch from "../../../Custom Hook/useFetch";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function AdminHome() {
  const { data: user, loading, error } = useFetch("http://localhost:8000/user");
  const {
    data: products,
    load,
    err,
  } = useFetch("http://localhost:8000/products");
  const [value, onChange] = useState(new Date());

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
  const livingRoom = products.filter(
    (type) => type.type === "Living Room Furniture"
  ).length;
  const diningRoom = products.filter(
    (type) => type.type === "Dining Room Furniture"
  ).length;
  const bedRoom = products.filter(
    (type) => type.type === "Bedroom Furniture"
  ).length;

  const livingRoomItems = products
    .filter((type) => type.type === "Living Room Furniture")
    .reduce((total, item) => total + item.quantity, 0);
  const diningRoomItems = products
    .filter((type) => type.type === "Dining Room Furniture")
    .reduce((total, item) => total + item.quantity, 0);
  const bedRoomItems = products
    .filter((type) => type.type === "Bedroom Furniture")
    .reduce((total, item) => total + item.quantity, 0);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      if (date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <div>
      <div className="dashboard dashboard-category mb-5">
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
      <div className="d-flex ">
        <div className="calender">
          <h1 className="clander-name ps-5">Calendar</h1>
          <Calendar
            className="border"
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
          />
        </div>
        <div className="table-prd">
          <div className="category-border">
            <h1 className="text-center">
              <span className="bold">Products</span>
            </h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Total</th>
                  <th scope="col">Quantity</th>
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
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
