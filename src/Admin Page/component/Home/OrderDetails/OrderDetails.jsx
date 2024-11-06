import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../../../lib/store/features/adminSlice";
import "./OrderDetails.css";
import Pagination from "../../../../popup box/Pagination";
import Spinner from "../../../../popup box/Spinner";
import { Link } from "react-router-dom";

function OrderDetails() {
  const [updateStatus, setUpdateStatus] = useState("")
  const [updateOrderID, setUpdateOrderID] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  
  const dispatch = useDispatch(); 
  const { loading, error, orders } = useSelector((state) => state.admin); 
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleEditClick = (orderId, currentStatus) => {
    setUpdateOrderID(orderId);
    setUpdateStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value);
  };

  const handleSaveClick = (orderId) => {    
    dispatch(updateOrderStatus({ orderId: orderId, status: updateStatus }));
    setUpdateOrderID(null); 
    dispatch(fetchOrders())
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div><Spinner /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center pt-3">Order Products Status</h2>
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
          totalOrders={orders?.length || 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default OrderDetails;
