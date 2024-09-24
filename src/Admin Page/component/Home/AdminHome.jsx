import React from "react";
import "./admin.css";
import "react-calendar/dist/Calendar.css";
import Analytics from "../Home-component/Analytics";
import ProductsCount from "../Home-component/ProductsCount";
import Chart from "../Home-component/Chart";

function AdminHome() {
  return (
    <div>
      <div className="dashboard dashboard-category mb-5">
        <Analytics />
      </div>
      <div className="d-flex">
        <div className="table-prd">
          <div className="Product-Chart ">
            <div className="category-border">
              <ProductsCount />
            </div>
            <div className="category-border">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
