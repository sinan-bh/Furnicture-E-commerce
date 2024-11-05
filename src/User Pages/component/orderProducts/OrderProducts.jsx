import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderProducts } from "../../../lib/store/features/cartSlice";
import Spinner from "../../../popup box/Spinner";
import "./OrderProducts.css";

function OrderProducts() {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.cart);
  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
      dispatch(fetchOrderProducts(data.userID));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const hasItemsInOrder = order?.length > 0;

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div>
      {hasItemsInOrder ? (
        <div className="order-product-container">
          <h2 className="text-center pt-3 m-3">Order Products Status</h2>
          <div>
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
                {order.map((orderItem) => (
                  <tr key={orderItem._id}>
                    <td>{orderItem.date}</td>
                    <td>
                      <table className="inner-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItem.products.map((item) => (
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
                              <td>${item.productPrize}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>${orderItem.total_ammount}</td>
                    <td>{orderItem.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white card empt-cart">
          <h2>Your order is empty...!</h2>
        </div>
      )}
    </div>
  );
}

export default OrderProducts;
