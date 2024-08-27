import React from "react";
import "./OrderDetails.css";
import useFetch from "../../../../Custom Hook/useFetch";
import { useParams } from "react-router-dom";

function OrderDetails() {

  const {
    data: user,
    error,
    loading,
  } = useFetch("http://localhost:3000/admin/orders");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || user.length === 0) {
    return <div>No products found.</div>;
  }

  console.log(user.data);

  return (
    <div className="user-details-container">
      <table className="user-details-table">
        <thead>
          <tr>
            <th rowSpan="1">Date</th>
            <th colSpan="3">Products</th>
            <th colSpan="1">Total Ammount</th>
            <th>Status</th>
          </tr>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user?.data?.map((user) => (
              <tr key={user._id}>
                <td>{user.date}</td>
                {user?.products?.map((item) => (
                  <>
                    <td key={item._id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="user-image"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                  </>
                ))}
                <td>${user.total_ammount}</td>
                <td>{user.status}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
