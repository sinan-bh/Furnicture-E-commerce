import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Dataset } from "../../assets/data-set.js/dataSet";
import { IoCartSharp } from "react-icons/io5";
import { addContext } from "../context/CartContext";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const { cartItem } = useContext(addContext);
  const count = Object.keys(cartItem).reduce((total,key)=>cartItem[key] !== 0 ? total + 1 : total,0)

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

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch([...search, value]);
  };

 

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar">
        {/* <Link to="/" className="navbar-brand">
          MyWebsite
        </Link> */}
        <div className="navbar-menu d-flex">
          <Link to="/" style={{ height: 41 }}>
            Home
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleChange}
            />
            <button
              type="button"
              // onClick={handleClick}
              className="btn1"
              style={{ height: 41 }}
            >
              Search
            </button>
          </div>
          <Link to={'/addcart'} style={{ height: 41 }}>
          <button type="button" className="btn2" >
            <IoCartSharp className="icon"/>
          </button>
          </Link>
            <div className="totaldiv">{count ? count : ''}</div>
          <Link to="/login" style={{ height: 41 }} className="log-btn me-5">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
