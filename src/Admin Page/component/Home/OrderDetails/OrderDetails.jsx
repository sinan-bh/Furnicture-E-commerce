import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import Pagination from "../../../../popup box/Pagination";
import useFetch from "../../../../Custom Hook/useFetch";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const [orders,setOrders] = useState([])
  const [updateOrderID, setUpdateOrderID] = useState(null)
  const [updateStatus, setUpdateStatus] = useState("")
  const [dependency, setDependency] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/orders`, {
        // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const order = await res.json();

        setOrders(order);

      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [dependency]);

  const handleEditClick = (orderId, currentStatus) => {
    setUpdateOrderID(orderId); 
    setUpdateStatus(currentStatus); 
  };

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value); 
  };

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
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.data?.slice(indexOfFirstOrder, indexOfLastOrder);

  console.log(currentOrders);
  

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-center pt-3">Order Producus Status</h2>
      <div className="order-details-container">
        <table className="order-details-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Edit</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders?.map((order) => (
              <tr key={order._id}>
                <td>{order.date}</td>
                <td>
                  <table className="inner-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.products?.map((item) => (
                        <tr key={item.prodid._id}>
                          <td>
                            <img
                              src={item.prodid.image}
                              alt={item.prodid.title}
                              className="product-image"
                            />
                          </td>
                          <td>{item.prodid.title}</td>
                          <td>{item.prodid.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>${order.total_ammount}</td>
                <td>{order.payment}</td>
                <td>
                  {updateOrderID === order._id ? (
                    <select value={updateStatus} onChange={handleStatusChange}>
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td>
                  {updateOrderID === order._id ? (
                    <button onClick={() => handleSaveClick(order._id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(order._id, order.status)}>Edit</button>
                  )}
                </td>
                <td><div>{order.userID.name}</div><Link to={`/adminhome/user/${order.userID._id}`}>click here</Link ></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          ordersPerPage={ordersPerPage}
          totalOrders={orders?.data?.length || 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default OrderDetails;