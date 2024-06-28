import React, { useState } from "react";
import "./Home.css";
import { Dataset } from "../../assets/data-set.js/dataSet";
import homeImage from "../../assets/img/Home.png";
import { Link } from "react-router-dom";

const Home = () => {
  const data = Dataset.filter((list) => list.id <= 10);

  return (
    <div>
      <div>
        <img src={homeImage} alt="" className="home-img" />
      </div>
      <div className="Catogaries">
        <div className="catogaries-link">
          <Link to="/allproducts">COLLECTIONS</Link>
          <Link to="/allproducts/livingroom">LIVING ROOM</Link>
          <Link to="/allproducts/diningset">DINING SET</Link>
          <Link to="/allproducts/bedroom">BED ROOM</Link>
          <Link to="/"></Link>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="filterCategories">
            {data.map((list) => (
              <div className="card grid-style mt-5 bg-secondary" key={list.id}>
                <div>
                  <img
                    src={list.image}
                    alt=""
                    className="img-fluid rounded-start "
                  />
                  <div className="card-body mt-3">
                    <h4 className="card-title text-center">{list.imageCategory}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
