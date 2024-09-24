import React, { useContext, useState } from "react";
import "./Style.css";
import Logo from "../../../assets/img/logo/logo.png";
import AlertBox from "../../../popup box/AlertBox";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../context/CartContext";

function Payment() {
  const { setTrigger,userData,setUserData, updateUserData } = useContext(userContext);
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("order"));
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
            const userID = JSON.parse(
              localStorage.getItem("currentUser")
            ).userID;
            const res = await fetch(
              `http://localhost:3000/users/verify_payment/${userID}`,
              {
                // fetch(`https://backend-ecommerce-furniture.onrender.com/users/verify_payment/${userID}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
                credentials: "include"
              }
            );

            const text = await res.text();
            setAlert({ message: text, type: "success" });
            setTrigger(true);
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
          <div className="pay">
            <button
              type="button"
              className="finish-update-btn"
              onClick={updateUserData}
            >
              Update
            </button>
            <button
              type="button"
              className="finish-pay-btn"
              onClick={handlePay}
            >
              Pay ${total_ammount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
