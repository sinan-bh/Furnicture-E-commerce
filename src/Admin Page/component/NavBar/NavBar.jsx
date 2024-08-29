import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertBox from "../../../popup box/AlertBox";
import ConfirmBox from "../../../popup box/ConfirmBox";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

import "./navbar.css";



function NavBarAdmin() {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  
  const handleLogout = ()=> {
    setConfirm({
      message: `Do you want to logout?`,
      onConfirm: () => {
        localStorage.removeItem('isAdmin')
        setAlert({ type: "success", message: "Logged out successfully." });
        setTimeout(() => setAlert(null), 1000);
        navigate("/");
        setConfirm(null); 
      },
      onCancel: () => {
        setConfirm(null); 
      }
    });
  };


  return (
    <nav className="navbar">
    {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {confirm && (
        <ConfirmBox
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={confirm.onCancel}
        />
      )}
      <div className="container-fluid">
        <div className="navbar-admin ">
          <div className="mb-5 nav-hover">
            <Link
              to="/adminhome"
              className="fw-bold text-decoration-none mb-3 text-secondary"
            >
              <AiFillHome className="nav-home" />
            </Link>
          </div>
          <div className="mb-5 nav-hover">
            <Link
              to="/adminhome/userdatas"
              className="fw-bold text-decoration-none mb-3  text-secondary"
            >
              <FaUsers className="nav-users" />
            </Link>
          </div>
          <div className=" nav-hover mb-5">
            <Link
              to="/adminhome/product-details"
              className="fw-bold text-decoration-none mb-3 text-secondary"
            >
              <AiFillProduct className="nav-products" />
            </Link>
          </div>
          <div className=" nav-hover mb-5">
            <Link
              to="/adminhome/order"
              className="fw-bold text-decoration-none mb-3 text-secondary"
            >
              <FaShoppingCart className="nav-products" />
            </Link>
          </div>
          <div className=" nav-hover" onClick={handleLogout}>
            <Link
              className="fw-bold text-decoration-none mb-3 text-secondary"
            >
              <FiLogOut className="nav-products" />
            </Link>
          </div>
        </div>
      </div>
    
    </nav>
  );
}

export default NavBarAdmin;
