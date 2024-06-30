import React from 'react';
import './payment.css';

function Payment() {
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Great, that's £124.97!</h2>
        <form>
          <div className="payment-method">
            <label>
              <input type="radio" name="paymentMethod" />
              <span>PayPal</span>
            </label>
            <label>
              <input type="radio" name="paymentMethod" defaultChecked />
              <span>Debit/credit card</span>
            </label>
          </div>
          <div className="card-details">
            <div className="form-group">
              <label>Card number</label>
              <input type="text" placeholder="4111 1111 1111 1111" />
            </div>
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
          <button type="button" className="finish-pay-btn">Finish and pay</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
