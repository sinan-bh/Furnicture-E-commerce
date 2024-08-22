import React, { useContext, useState } from "react";
import "./Style.css";
import { userContext } from "../../../context/CartContext";

function Payment() {
  const { price,order } = useContext(userContext);
  const username = JSON.parse(localStorage.getItem("currentUser"));
  const [formData, setFormData] = useState({
    name: username.lname || "",
    address: "",
    state: "",
    email: "",
    phone: "",
    city: "",
  });

  

  const data = JSON.parse(localStorage.getItem("currentUser"));

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

  const handleUpdate = async () => {
    if (validateForm()) {
     

      alert("Updated");
    }
  };

  const handlePay = async () => {
    if (validateForm()) {

      const { order_id, currency, total_ammount } = order.order;

    const options = {
      key: 'rzp_test_54robFK9s1sJwo', 
      amount: total_ammount* 100,
      currency,
      order_id,
      name: 'Plush Paradise',
      description: 'Purchase Description',
      // image: 'https://your-logo-url.com/logo.png', 
      handler: function (response) {
        console.log(response);
        const userID = data.userID
        fetch(`http://localhost:3000/users/verify_payment/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.text())
          .then((text) => alert(text));
      },
      prefill: {
        name: 'Your Customer Name',
        email: 'faslu@gamil.com',
        contact: '9876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Check Out</h2>
        <form>
          <div className="d-flex flex-wrap">
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
            <div className="card-details">
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
              Update
            </button>
            <button
              type="button"
              className="finish-pay-btn"
              onClick={handlePay}
            >
              Pay ${price}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
