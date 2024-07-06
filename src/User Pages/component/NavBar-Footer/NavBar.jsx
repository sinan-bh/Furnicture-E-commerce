import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { IoCartSharp } from "react-icons/io5";
import { addContext } from "../../../context/CartContext";
import { CiSearch } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import Logo from "../../../assets/img/logo/logo.png";

const Navbar = () => {
  //State

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  //Context

  const {
    cartItem,
    searchTerm,
    setSearchTerm,
    log,
    setLog,
    setCartItem,
    getDefualtCart,
  } = useContext(addContext);

  const navigate = useNavigate();

  //Search

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      navigate("/");
    } else {
      navigate("/searchItem");
    }
  };

  //Total Cart Items Added

  const count = Object.keys(cartItem).reduce(
    (total, key) => (cartItem[key] !== 0 ? total + 1 : total),
    0
  );

  //NavBar Scrolling

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  //Log Out

  const handleLogout = () => {
    setLog(log.lname !== log.name);
    setCartItem({});
    alert("Logo Out");
    navigate("/");
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar-container">
        <div className="navbar">
          <div className="nav-icon">
            <Link to={"/"}>
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="navbar-menu d-flex">
            <Link to="/" className="navbar-link fw-bold">
              Home
            </Link>
            <div className="Category">
              <div className="Catogarylink">
                <div className="text m-2 px-2">
                  <Link
                    to="/allproducts"
                    className="fw-bold text-decoration-none"
                    style={{ color: "rgb(84,98,102)" }}
                  >
                    All Products
                  </Link>
                </div>
                <div className="text m-2 px-2">
                  <Link
                    to="/allproducts/livingroom"
                    className="fw-bold text-decoration-none"
                    style={{ color: "rgb(84,98,102)" }}
                  >
                    Living Room
                  </Link>
                </div>
                <div className="text m-2 px-2">
                  <Link
                    to="/allproducts/diningset"
                    className="fw-bold text-decoration-none"
                    style={{ color: "rgb(84,98,102)" }}
                  >
                    Dining Set
                  </Link>
                </div>
                <div className="text mt-2 px-2">
                  <Link
                    to="/allproducts/bedroom"
                    className="fw-bold text-decoration-none"
                    style={{ color: "rgb(84,98,102)" }}
                  >
                    Bed Room
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="search-bar fw-bold">
            <input
              type="text"
              placeholder="Search here...."
              value={searchTerm}
              onChange={handleChange}
            />
            <div className="searchBtn">
              <CiSearch />
            </div>
          </div>
          <div className="car-log">
            <div>
              {log.lname ? (
                <Link to="/addcart" className="">
                  <button type="button" className="cart-link ">
                    <IoCartSharp className="icon" />
                    {count > 0 && (
                      <div className="totaldiv fw-bold">{count}</div>
                    )}
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            {log.lname ? (
              <button
                type="button"
                className="log-btn fw-bold"
                onClick={handleLogout}
              >
                {log.lname}
                <CiLogout />
              </button>
            ) : (
              <Link to="/login" className="log-btn fw-bold">
                Login
                <CiLogin />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
