import React, { useEffect, useState } from "react";
import "./OrderProducts.css";

function OrderProducts() {
  const [user, setUser] = useState([]);
  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (data && data.userID) {
      const userID = data.userID;

      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/users/order/${userID}`
          );
          const data = await res.json();
          setUser(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchData();
    }
  }, []);

  console.log(user.data);

  const hasItemsInOrder = user?.order?.length > 0;

  return (
    <div className="order-details-container">
        <h2 className="text-center bold m-2 p-2">Order Products Status</h2>
      {hasItemsInOrder ? (
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
            {user?.order?.map((user) => (
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
      ) : (
        <div className="text-center bg-white card empt-cart">
          <h2>Your cart is empty...!</h2>
        </div>
      )}
    </div>
  );
}

export default OrderProducts;
