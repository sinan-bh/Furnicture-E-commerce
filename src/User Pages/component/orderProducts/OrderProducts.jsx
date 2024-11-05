import React, { useEffect, useState } from "react";
import "./OrderProducts.css";
import Spinner from "../../../popup box/Spinner";

function OrderProducts() {
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (data && data.userID) {
      const userID = data.userID;

      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/users/order/${userID}`,
            //  `https://backend-ecommerce-furniture.onrender.com/users/order/${userID}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await res.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setLoading(false)
        }
      };
      fetchData();
    }
  }, []);

  const hasItemsInOrder = order?.order?.length > 0;

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div>
      {hasItemsInOrder ? (
        <div className="order-product-container">
          <h2 className="text-center pt-3 m-3">Order Producus Status</h2>
          <div className="">
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {order?.order?.map((order) => (
                  <tr key={order._id}>
                    <td>{order.date}</td>
                    <td>
                      <table className="inner-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Prize</th>
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
                              <td>{item.quantity}</td>
                              <td>{item.productPrize}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>${order.total_ammount}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white card empt-cart">
          <h2>Your cart is empty...!</h2>
        </div>
      )}
    </div>
  );
}

export default OrderProducts;
