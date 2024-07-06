import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBarAdmin() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-admin ">
          <div className="mb-5 nav-hover">
          <Link to="/adminhome" className="fw-bold text-decoration-none mb-3 text-secondary">
            Home
          </Link>
          </div>
          <div className="mb-5 nav-hover">
          <Link to="/adminhome/userdatas" className="fw-bold text-decoration-none mb-3  text-secondary">
            User
          </Link>
          </div>
          <div className=" nav-hover">
          <Link to="/adminhome/product-details" className="fw-bold text-decoration-none mb-3 text-secondary">
            Products
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
