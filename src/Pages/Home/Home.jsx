import React from "react";
import "./Style.css";
import homeImage from "../../assets/img/Home/Home.png";
import Category from "../../components/Home/Popular";
import Popular from "../../components/Home/Category";

const Home = () => {
  return (
    <div className="home">
      <div>
        <img src={homeImage} alt="" className="home-img" />
      </div>
      <Popular />
      <Category />
    </div>
  );
};

export default Home;
