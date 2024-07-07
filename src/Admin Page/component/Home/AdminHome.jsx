import React from "react";
import "./admin.css";
import useFetch from "../../../Custom Hook/useFetch";
import Category from "../../../User Pages/component/Home/Category";
import Popular from "../../../User Pages/component/Home/Popular";

function AdminHome() {
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

  const count = user.map((item) => item.order.quantity);

  const orderCount = count.reduce((total, id) => total + Number(id), 0);

  return (
    <div>
      <div className="dashboard-container">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-name card-primary">
              <div className="card-header">Total Products</div>
              <div className="card-body card-body-name ">
                <h5 className="card-title card-title-admin">{productCount}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-name card-success">
              <div className="card-header">Total Registered Users</div>
              <div className="card-body card-body-name">
                <h5 className="card-title card-title-admin">{userCount}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-name card-warning">
              <div className="card-header">Total Orders</div>
              <div className="card-body card-body-name">
                <h5 className="card-title card-title-admin">{orderCount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
