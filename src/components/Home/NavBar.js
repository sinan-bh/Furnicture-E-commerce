import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { IoCartSharp } from "react-icons/io5";
import { addContext } from "../context/CartContext";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const { cartItem,searchTerm,setSearchTerm } = useContext(addContext);

  const navigate = useNavigate()

  

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

 

  const count = Object.keys(cartItem).reduce((total, key) => (cartItem[key] !== 0 ? total + 1 : total), 0);

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

  const search = () => {
    navigate('/searchItem')
  }


  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-menu d-flex">
            <Link to="/" className="navbar-link fw-bold">
              Home
            </Link>
            <div className="search-bar fw-bold">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
              />
              <button type="button" className="btn1 fw-bold" onClick={()=>search()}>
                Search
              </button>
            </div>
            <Link to="/addcart" className="cart-link">
              <button type="button" className="btn2">
                <IoCartSharp className="icon" />
              {count > 0 && <div className="totaldiv fw-bold">{count}</div>}
              </button>
            </Link>
            <Link to="/login" className="log-btn fw-bold">
              Login
            </Link>
          </div>
        </div>
        <div className="Category">
          <div className="Catogarylink">
            <div className="text m-2 px-2"><Link to="/allproducts" className="fw-bold  text-decoration-none "style={{ color: '#1ba8c4f3' }} >COLLECTIONS</Link></div>
            <div className="text m-2 px-2"><Link to="/allproducts/livingroom" className="fw-bold  text-decoration-none " style={{ color: '#1ba8c4f3' }}>LIVING ROOM</Link></div>
            <div className="text m-2 px-2"><Link to="/allproducts/diningset" className="fw-bold  text-decoration-none " style={{ color: '#1ba8c4f3' }}>DINING SET</Link></div>
            <div className="text mt-2 px-2"><Link to="/allproducts/bedroom" className="fw-bold  text-decoration-none" style={{ color: '#1ba8c4f3' }}>BED ROOM</Link></div>
            {/* <div className="text m-2"><Link to="/"></Link></div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
