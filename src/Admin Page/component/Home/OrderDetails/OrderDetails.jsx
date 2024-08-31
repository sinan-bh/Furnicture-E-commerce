import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import useFetch from "../../../../Custom Hook/useFetch";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const [orders,setOrders] = useState([])
  const [updateOrderID, setUpdateOrderID] = useState(null)
  const [updateStatus, setUpdateStatus] = useState("")
  const [dependency, setDependency] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/orders`, {
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

    const url = 'https://backend-ecommerce-furniture.onrender.com/admin/order'

    const response = await fetch(url, option)

    setDependency(response)
    setUpdateOrderID(null); 
  };

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
          </tr>
        </thead>
        <tbody>
          {orders?.data?.map((order) => (
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
                      <tr key={item._id}>
                        <td>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="product-image"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default OrderDetails;
