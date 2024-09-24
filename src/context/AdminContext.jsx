import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Custom Hook/useFetch";

export const formContext = createContext();

function AdminContext(props) {
  const [users,setUsers] = useState([])
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("")
  const [orderDetails, setOrderDetails] = useState([]);
  const [updateOrderID, setUpdateOrderID] = useState(null)
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [dependency, setDependency] = useState()
  const isAdmin = JSON.parse(localStorage.getItem("isAmin"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/allusers`, {
        // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/allusers`, {
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
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/products`, {
        // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/products`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const product = await res.json();
        setProducts(product);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [trigger]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/orders/details`, {
        const res = await fetch(`http://localhost:3000/admin/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const Orders = await res.json();
        setOrder(Orders)
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [isAdmin,updateStatus,dependency]); 

  const handleSaveClick = async (orderId) => {

    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({order_id: orderId, status: updateStatus}),
      credentials: 'include',
    }

    const url = 'http://localhost:3000/admin/order'
    // const url = 'https://backend-ecommerce-furniture.onrender.com/admin/order'

    const response = await fetch(url, option)

    setDependency(response)
    setUpdateOrderID(null); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/orders/details`, {
        const res = await fetch(`http://localhost:3000/admin/orders/details`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const order = await res.json();

        setOrderDetails(order);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const formValue = {
    users,
    order,
    updateStatus,
    loading,
    isAdmin,
    dependency,
    updateOrderID,
    products,
    trigger,
    orderDetails,
    setUsers,
    setUpdateStatus,
    setOrder,
    setLoading,
    setDependency,
    handleSaveClick,
    setUpdateOrderID,
    setProducts,
    setTrigger,
  };

  return (
    <formContext.Provider value={formValue}>
      {props.children}
    </formContext.Provider>
  );
}

export default AdminContext;
