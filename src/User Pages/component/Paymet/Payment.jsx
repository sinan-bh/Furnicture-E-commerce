import React, { useState } from "react";
import "./Style.css";
import Logo from "../../../assets/img/logo/logo.png";
import AlertBox from "../../../popup box/AlertBox";
import { useNavigate } from "react-router-dom";
import { updateUserData, setUserData } from "../../../lib/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../../../utils/axios";

function Payment() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("order"));
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserData({ [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!userData?.name) formErrors.name = "Name is required";
    if (!userData?.address) formErrors.address = "Address is required";
    if (!userData?.email) formErrors.email = "Email is required";
    if (!userData?.phone) formErrors.phone = "Phone number is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const { order_id, currency, total_ammount } = order.order.order;

  const handlePay = async () => {
    if (validateForm() && order_id) {
      const options = {
        key: "rzp_test_54robFK9s1sJwo",
        amount: total_ammount,
        currency,
        order_id,
        name: "Plush Paradise",
        description: "Purchase Description",
        image: Logo,
        handler: async (response) => {
          try {
            const userID = JSON.parse(localStorage.getItem("currentUser")).userID;
            const res = await axiosPrivate.put(
              `/users/verify_payment/${userID}`,
              {
                order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            setAlert({ message: res.data, type: "success" });
            navigate("/orderstatus");
            setTimeout(() => setAlert(null), 2000);
          } catch (error) {
            setAlert({ message: "Payment verification failed", type: "error" });
          }
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phone,
          address: userData?.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      setAlert({ message: "Something went wrong", type: "info" });
    }
  };

  const handleUpdate = () => {
    const userID = JSON.parse(localStorage.getItem("currentUser")).userID;
    dispatch(updateUserData({ userID, userData }));
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Check Out</h2>
        {alert && (
          <AlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <form>
          <div className="d-flex flex-wrap">
            <div className="card-details">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name...."
                  value={userData?.name || ""}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>
            <div className="card-details">
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={userData?.email || ""}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 0000000000"
                  value={userData?.phone || ""}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userData?.address || ""}
                  onChange={handleChange}
                />
                {errors.address && (
                  <span className="error">{errors.address}</span>
                )}
              </div>
            </div>
          </div>
          <div className="pay-btn">
            <button type="button" onClick={handlePay}>
              Make Payment
            </button>
            <button type="button" onClick={handleUpdate} className="handleUpdate">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
