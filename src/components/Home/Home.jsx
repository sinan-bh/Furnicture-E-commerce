import React, { useState } from "react";
import "./Style.css";
import { Dataset } from "../../assets/data-set.js/dataSet";
import homeImage from "../../assets/img/Home.png";
import { Link } from "react-router-dom";

const category = [
  
  {
    id    : 0,
    image : 'https://i.pinimg.com/564x/11/28/9b/11289bd6046de90ae7c46fdfccd74e64.jpg',
    name  : "All" ,
    to    : "/allproducts"
  },
  {
    id    : 1,
    image : 'https://i.pinimg.com/564x/fb/73/88/fb7388a28de92845d5d77292d606b06c.jpg',
    name  : "Sofa" ,
    to    : "/allproducts/livingroom"
  },
  {
    id    :  2,
    image : 'https://i.pinimg.com/564x/63/d0/d9/63d0d99654d048bf3c5c68ea8015694a.jpg',
    name  : "Bed" ,
    to    : "/allproducts/bedroom"
  },
  {
    id    :  3,
    image : 'https://i.pinimg.com/736x/43/a0/49/43a049423366ff9f70bca58694959beb.jpg',
    name  : "Dining Set",
    to    :  "/allproducts/diningset"
  },
  {
    id    :  4,
    image : 'https://i.pinimg.com/564x/75/68/e5/7568e5cbcb331adc86f3d76cc62b0368.jpg',
    name  : "Storage Set",
    to    :  "/allproducts/bedroom"
  },
  {
    id    :  5,
    image : 'https://i.pinimg.com/564x/21/c9/c2/21c9c2a3464def80a6b99ddcd92f849e.jpg',
    name  : "Wardrobe" ,
    to    : "/allproducts/bedroom"
  },
  {
    id    :  6,
    image : 'https://i.pinimg.com/564x/9e/66/30/9e66301b0b0fa604aa8dbcdb7f4b9879.jpg',
    name  : "Outdoor Furniture",
    to    :  "/allproducts/livingroom"
  },
  {
    id    :  7,
    image : 'https://i.pinimg.com/564x/5f/d5/3e/5fd53eab03b452db5cf6b84d40bfdd33.jpg',
    name  : "Tray Table",
    to    :  "/allproducts/livingroom"
  },
  
];

console.log(category);

const Home = () => {

  return (
    <div className="home">
      <div>
        <img src={homeImage} alt="" className="home-img" />
      </div>
      <div className="container card card-container m-5">
        <h2 className="text-center mt-4">Categories</h2>
        <div className="  p-5 ">
          <div  className="row ms-3 ">
          {category.map((list) => (
            <div key={list.id} className="col-md-3 mb-4">
              <Link to={list.to}>
              <img src={list.image} alt={list.name} className="card category-image" />
              </Link>
              <h5 className="text-center mt-3 me-3">{list.name}</h5>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
