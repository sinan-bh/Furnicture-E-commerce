import React from "react";
import "./Style.css";
import homeImage from "../../assets/img/Home/Home.png";
import Popular from "../../User Pages/component/Home/Popular";
import Category from "../../User Pages/component/Home/Category";

const Home = () => {
  return (
    <div className="home">
      <div>
        <img src={homeImage} alt="" className="home-img" />
      </div>
      <div className="container">
        <Category />
        <Popular />
      </div>
    </div>
  );
};

export default Home;
