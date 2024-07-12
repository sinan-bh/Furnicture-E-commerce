import React from "react";
import "./admin.css";
import 'react-calendar/dist/Calendar.css';
import Analytics from "../Home-component/Analytics";
import ProductsCount from "../Home-component/ProductsCount";

function AdminHome() {
  return (
    <div>
      <div className="dashboard dashboard-category mb-5">
        <Analytics />
      </div>
      <div className="d-flex ">
        <div className="table-prd">
          <div className="category-border">
           <ProductsCount /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
