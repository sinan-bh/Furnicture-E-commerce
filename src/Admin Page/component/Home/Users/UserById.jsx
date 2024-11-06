import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../../../popup box/Pagination";
import Spinner from "../../../../popup box/Spinner";
import { formContext } from "../../../../context/AdminContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateOrderStatus } from "../../../../lib/store/features/adminSlice";

const UserById = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [updateStatus, setUpdateStatus] = useState("")
  const [updateOrderID, setUpdateOrderID] = useState(null)
  const ordersPerPage = 5;
  const { userId } = useParams();
  const dispatch = useDispatch()
  const {user, loading} = useSelector(state=> state.admin)

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId]);  

  const handleEditClick = (orderId, currentStatus) => {
    setUpdateOrderID(orderId);
    setUpdateStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value);
  };
  const handleSaveClick = () => {
    if (updateOrderID && updateStatus) {
      dispatch(updateOrderStatus({ orderId: updateOrderID, status: updateStatus }));
      dispatch(fetchUser(userId))
      setUpdateOrderID(null); 
    }
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = user?.order?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPurchased = user?.order
    ?.map((item) => item.products.length)
    .reduce((acc, item) => acc + item, 0);
  const totalPrize = user?.order?.reduce(
    (acc, item) => acc + item.total_ammount,
    0
  );
  const hasItemOrder = user?.order?.length;

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="userById card">
      <h2>User Details</h2>
      <div className="userById-container ">
        <div className="userById-left">
          <div>Name : {user?.data?.name}</div>
          <div>E-mail : {user?.data?.email}</div>
          <div>Phone Number :{user?.data?.phone}</div>
        </div>
        <div>
          <div>Address :{user?.data?.address}</div>
          <div>Total Purchased : {totalPurchased}</div>
          <div>Total Prize : {totalPrize?.toFixed()}</div>
        </div>
      </div>
      {hasItemOrder ? (
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
                        <select
                          value={updateStatus}
                          onChange={handleStatusChange}
                        >
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
                        <button onClick={() => handleSaveClick(order._id)}>
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleEditClick(order._id, order.status)
                          }
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              ordersPerPage={ordersPerPage}
              totalOrders={user?.data?.length || 0}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        <div> User Not Purchased </div>
      )}
    </div>
  );
};

export default UserById;
