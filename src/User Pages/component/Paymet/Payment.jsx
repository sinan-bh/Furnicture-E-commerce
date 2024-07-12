import React, { useContext, useState } from "react";
import "./Style.css";
import { userContext } from "../../../context/CartContext";

function Payment() {
  const { price } = useContext(userContext);
  const username = JSON.parse(localStorage.getItem("currentUser"));
  const [formData, setFormData] = useState({
    name: username.lname || "",
    address: "",
    state: "",
    email: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.city) formErrors.city = "City is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      alert("Updated");
    }
  };

  const handlePay = () => {
    if (validateForm()) {
      alert("Pay successfully");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Check Out</h2>
        <form>
          <div className="d-flex">
            <div className="card-details">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name...."
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <span className="error">{errors.state}</span>}
              </div>
            </div>
            <div className="card-details ms-5">
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="text"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>
          </div>
          <div className="pay">
            <button
              type="button"
              className="finish-pay-btn me-3"
              onClick={handleUpdate}
            >
              update
            </button>
            <button
              type="button"
              className="finish-pay-btn"
              onClick={handlePay}
            >
              pay ${price}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
