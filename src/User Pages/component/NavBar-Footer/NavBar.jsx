import React, { useState, useEffect, useRef } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { CiSearch, CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import Logo from "../../../assets/img/logo/logo.png";
import ConfirmBox from "../../../popup box/ConfirmBox";
import AlertBox from "../../../popup box/AlertBox";

import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../../../lib/store/features/cartSlice";
import { fetchWishlist } from "../../../lib/store/features/whishListSlice";
import {
  setSearchTerm,
} from "../../../lib/store/features/userSlice";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { items } = useSelector((state) => state.wishList);
  const { searchTerm } = useSelector((state) => state.user);

  console.log(searchTerm);

  useEffect(() => {
    dispatch(fetchCartProducts(data?.userID));
    dispatch(fetchWishlist(data?.userID));
  }, [data?.userID, dispatch]);


  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleMEnuClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMEnuClick);
    return () => {
      document.removeEventListener("mousedown", handleMEnuClick);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setConfirm({
      message: `Do you want to logout?`,
      onConfirm: () => {
        localStorage.removeItem("isLogin");
        setAlert({ type: "success", message: "Logged out successfully." });
        setTimeout(() => setAlert(null), 1000);
        navigate("/");
        setConfirm(null);
      },
      onCancel: () => {
        setConfirm(null);
      },
    });
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
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
                  <div className="text  m-2 px-2">
                    <Link
                      to="/allproducts"
                      className="fw-bold text-decoration-none"
                      style={{ color: "black" }}
                    >
                      All Products
                    </Link>
                  </div>
                  <div className="text m-2 px-2">
                    <Link
                      to="/allproducts/livingroom"
                      className="fw-bold text-decoration-none"
                      style={{ color: "black" }}
                    >
                      Living Room
                    </Link>
                  </div>
                  <div className="text m-2 px-2">
                    <Link
                      to="/allproducts/diningset"
                      className="fw-bold text-decoration-none"
                      style={{ color: "black" }}
                    >
                      Dining Set
                    </Link>
                  </div>
                  <div className="text mt-2 px-2">
                    <Link
                      to="/allproducts/bedroom"
                      className="fw-bold text-decoration-none"
                      style={{ color: "black" }}
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
                <CiSearch size={20} />
              </div>
            </div>
          </div>
          <div className="car-log">
            <div>
              {isLogin ? (
                <Link to="/addcart" className="">
                  <button type="button" className="cart-link ">
                    <IoCartSharp className="icon" />
                    {cart?.length > 0 && (
                      <div className="totaldiv fw-bold">{cart?.length}</div>
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
                    <FaRegHeart className="icon" />
                    {items?.length > 0 && (
                      <div className="totaldiv fw-bold">{items?.length}</div>
                    )}
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            {isLogin ? (
              <div className="profile-dropdown">
                <button
                  type="button"
                  className="log-btn fw-bold"
                  onClick={toggleDropdown}
                >
                  <CgProfile size={20} />
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menus" ref={menuRef}>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={toggleDropdown}
                    >
                      Profile <CgProfile />
                    </Link>
                    <Link
                      to="/orderstatus"
                      className="dropdown-item"
                      onClick={toggleDropdown}
                    >
                      Order <BsCartCheck />
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleLogout()}
                    >
                      <span onClick={toggleDropdown}>
                        Logout <TbLogout />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="log-btn fw-bold">
                Login
                <CiLogin />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <IoIosClose size={30} /> : <IoIosMenu size={30} />}
        </div>
        <div
          className={`off-canvas-container ${isOpen ? "menu-open" : ""}`}
          ref={menuRef}
        >
          <div className="off-canvas-menu">
            <Link to={"/"} className="menu-item" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to={"/allproducts"}
              className="menu-item"
              onClick={toggleMenu}
            >
              All Products
            </Link>
            <Link to={"/livingroom"} className="menu-item" onClick={toggleMenu}>
              Living Room
            </Link>
            <Link to={"/diningset"} className="menu-item" onClick={toggleMenu}>
              Dining Room
            </Link>
            <Link to={"/bedroom"} className="menu-item" onClick={toggleMenu}>
              Bed Room
            </Link>
            <Link className="menu-item" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
