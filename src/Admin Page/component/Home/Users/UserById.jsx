import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../../../popup box/Pagination";
import Spinner from "../../../../popup box/Spinner";
import { formContext } from "../../../../context/AdminContext";

const UserById = () => {
  const [ordersUser, setOrdersUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    handleSaveClick,
    updateOrderID,
    dependency,
    loading,
    setLoading,
    setUpdateOrderID,
    updateStatus,
    setUpdateStatus,
  } = useContext(formContext);
  const ordersPerPage = 5;
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/admin/user/${userId}`, {
          // const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const order = await res.json();
        console.log(order);

        setOrdersUser(order);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersUser?.order?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPurchased = ordersUser?.order
    ?.map((item) => item.products.length)
    .reduce((acc, item) => acc + item, 0);
  const totalPrize = ordersUser?.order?.reduce(
    (acc, item) => acc + item.total_ammount,
    0
  );
  const hasItemOrder = ordersUser?.order?.length;

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
          <div>Name : {ordersUser?.data?.name}</div>
          <div>E-mail : {ordersUser?.data?.email}</div>
          <div>Phone Number :{ordersUser?.data?.phone}</div>
        </div>
        <div>
          <div>Address :{ordersUser?.data?.address}</div>
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
              totalOrders={ordersUser?.data?.length || 0}
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
