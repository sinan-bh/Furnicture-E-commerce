import React, { useContext } from "react";
import "./Style.css";
import { addContext } from "../context/CartContext";

function Payment() {
  const { log, price } = useContext(addContext);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Check Out</h2>
        <form>
          <div className="d-flex">
            <div className="card-details">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Name...." value={log.lname} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="State" />
              </div>
            </div>
            <div className="card-details ms-5">
              <div className="form-group">
                <label>E-Mail</label>
                <input type="text" placeholder="example@gmai.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 0000000000" />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="City" />
              </div>
            </div>
          </div>
          <div className="pay ">
            <button
              type="button"
              className="finish-pay-btn me-3"
              onClick={() => alert("Updated")}
            >
              update
            </button>
            <button
              type="button"
              className="finish-pay-btn"
              onClick={() => alert("pay successfully")}
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
