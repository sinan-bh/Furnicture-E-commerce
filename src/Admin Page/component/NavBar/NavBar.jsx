import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

function NavBarAdmin() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-admin ">
          <div className="mb-5 nav-hover">
          <Link to="/adminhome" className="fw-bold text-decoration-none mb-3 text-secondary">
          <AiFillHome className="nav-home"/>
          </Link>
          </div>
          <div className="mb-5 nav-hover">
          <Link to="/adminhome/userdatas" className="fw-bold text-decoration-none mb-3  text-secondary">
          <FaUsers className="nav-users"/>
          </Link>
          </div>
          <div className=" nav-hover">
          <Link to="/adminhome/product-details" className="fw-bold text-decoration-none mb-3 text-secondary">
          <AiFillProduct className="nav-products"/>
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
