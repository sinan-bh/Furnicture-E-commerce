import React, { useContext, useEffect, useState } from "react";
import "./OrderDetails.css";
import Pagination from "../../../../popup box/Pagination";
import useFetch from "../../../../Custom Hook/useFetch";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../../popup box/Spinner";
import AdminContext, { formContext } from "../../../../context/AdminContext";

function OrderDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const {updateStatus, setUpdateStatus, loading, order, setUpdateOrderID, updateOrderID, handleSaveClick} = useContext(formContext)
  const ordersPerPage = 5;

  const handleEditClick = (orderId, currentStatus) => {
    setUpdateOrderID(orderId); 
    setUpdateStatus(currentStatus); 
  };

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value); 
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order?.data?.slice(indexOfFirstOrder, indexOfLastOrder);  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div><Spinner /></div>;
  }

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
          totalOrders={order?.data?.length || 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default OrderDetails;