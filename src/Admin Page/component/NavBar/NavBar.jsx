import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBarAdmin() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-admin ">
          <Link to="/adminhome" className="fw-bold text-decoration-none mb-3">
            Home
          </Link>
          <Link to="/admin/userdatas" className="fw-bold text-decoration-none mb-3">
            User
          </Link>
          <Link to="/admin/product-details" className="fw-bold text-decoration-none mb-3">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
