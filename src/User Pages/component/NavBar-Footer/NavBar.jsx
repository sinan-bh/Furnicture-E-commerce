import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { userContext } from "../../../context/CartContext";
import { CiSearch } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import Logo from "../../../assets/img/logo/logo.png";
import "./Style.css";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishListLength] = useState(0);
  const {  searchTerm, setSearchTerm } = useContext(userContext);
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin")); 

useEffect(() => {
  const fetchCartLength = async () => {
    if (isLogin && data) {
      const { userID } = data;
      const response = await fetch(`http://localhost:3000/users/cart/${userID}`);
      if (response.ok) {
        const result = await response.json();
        setCartLength(result.length); 
      } else {
        console.error("Failed to fetch cart data");
      }
    }
  };
  fetchCartLength();
}, [isLogin, data]);

useEffect(() => {
  const fetchWishListLength = async () => {
    if (isLogin && data) {
      const { userID } = data;
      const response = await fetch(`http://localhost:3000/users/wishlist/${userID}`);
      if (response.ok) {
        const result = await response.json();
        console.log(result.data.length);
        
        setWishListLength(result.data.length); 
      } else {
        console.error("Failed to fetch cart data");
      }
    }
  };
  fetchWishListLength();
}, [isLogin, data]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      navigate("/");
    } else {
      navigate("/searchItem");
    }
  };




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

  const handleLogout = () => {
    const confirm = window.confirm("Do you want to Logout?");
    if (confirm) {
      localStorage.removeItem("isLogin");
      alert("Logo Out");
      navigate("/");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="">
        <div className="navbar">
          <div className="nav-icon">
            <Link to={"/"}>
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="display-nav ">
            <div className="navbar-menu">
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
          </div>
          <div className="car-log">
            <div>
              {isLogin ? (
                <Link to="/addcart" className="">
                  <button type="button" className="cart-link ">
                    <IoCartSharp className="icon" />
                    {cartLength > 0 && (
                      <div className="totaldiv fw-bold">{cartLength}</div>
                    )}
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            <div className="wishlist-icon">
              {isLogin ? (
                <Link to="/wishlist" className="">
                  <button type="button" className="cart-link ">
                    <FaRegHeart  className="icon" />
                    {wishlistLength > 0 && (
                      <div className="totaldiv fw-bold">{wishlistLength}</div>
                    )}
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            {isLogin ? (
              <button
                type="button"
                className="log-btn fw-bold"
                onClick={handleLogout}
              >
                <span className="user-login">{data.username}</span>
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
      <div className="container menu-toggle-hide">
        <div className="menu-toggle" onClick={toggleMenu}>
          <IoIosArrowDropdown />
        </div>

        <div
          className={`off-canvas-container ${
            isOpen === false ? "menu-open" : ""
          }`}
        >
          <div className="off-canvas-menu">
            <Link to={"/"} onClick={toggleMenu}>
              Home
            </Link>
            <Link to={"/allproducts"} onClick={toggleMenu}>
              All Products
            </Link>
            <Link to={"/allproducts/livingroom"} onClick={toggleMenu}>
              Living Room
            </Link>
            <Link to={"/allproducts/diningset"} onClick={toggleMenu}>
              Dining Room
            </Link>
            <Link to={"/allproducts/bedroom"} onClick={toggleMenu}>
              Bed Room
            </Link>
            <Link to={"/wishlist"} onClick={toggleMenu}>
              Wish List {wishlistLength}
            </Link>
          </div>
          <div className="content"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
