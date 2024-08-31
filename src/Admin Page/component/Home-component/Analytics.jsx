import React, { useEffect, useState } from "react";
import useFetch from "../../../Custom Hook/useFetch";

import './home-combonent.css'

function Analytics() {
  const [users,setUsers] = useState([])
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/allusers`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const users = await res.json();

        setUsers(users);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/products`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const product = await res.json();
        console.log(product);

        setProducts(product);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/orders/details`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const order = await res.json();

        setOrder(order);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);

  const userCount = users?.data?.length;
  const productCount = products?.length;
  const orderCount = order?.total_purchase;
  const totalRevanue = order?.revanue;
  console.log(order);
  

  return (
    <div>
      <h1 className="text-center my-5">
        <span className="bold">Analytics</span>
      </h1>
      <div className="card-container-bg ">
        <div className="card-1 ">
          <div className="">
            <span className="bold">Products</span>
          </div>
          <div className="card-body">
            <h2>{productCount}</h2>
            <p className="positive">Total Products Since last week</p>
          </div>
        </div>
        <div className="card-1">
          <div className="">
            <span className="bold">Users</span>
          </div>
          <div className="card-body">
            <h2>{userCount}</h2>
            <p className="positive">Total Register Users Since last week</p>
          </div>
        </div> 
        <div className="card-1">
          <div className="">
            <span className="bold">Orders</span>
          </div>
          <div className="card-body">
            <h2>{orderCount}</h2>
            <p className="positive">Total Orders Since last week</p>
          </div>
        </div>
        <div className="card-1">
          <div className="">
            <span className="bold">Total Revanue</span>
          </div>
          <div className="card-body">
            <h2>${totalRevanue}</h2>
            <p className="positive">Popular products Since last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
