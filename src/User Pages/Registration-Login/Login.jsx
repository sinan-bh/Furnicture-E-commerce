// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import AlertBox from '../../popup box/AlertBox'; 
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAlert } from '../../lib/store/features/userSlice';

function Login() {
  const [formValue, setFormValue] = useState({
    userName: '',
    pass: '',
  });

  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formValue))
      .unwrap()
      .then(()=> {
        localStorage.setItem('isLogin', JSON.stringify(true));
      })
      .then(() => {
        setTimeout(() => navigate('/'), 1000);
      })
      .catch(() => {
        setTimeout(() => dispatch(clearAlert()), 1000);
      });
  };

  return (
    <div className="login">
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => dispatch(clearAlert())}
        />
      )}
      <div className="row justify-content-center">
        <div className="">
          <div className="card cardSize">
            <div className="card-body d-flex justify-content-center align-items-center">
              <h2 className="text-outline fw-bold">LOGIN PAGE</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="userName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="pass"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-navy btn-block form-group p-1">
                  Login
                </button>
                <Link to={"/registration"}>
                  <button type="button" className="btn-navy btn-block form-group p-1">
                    Sign In
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
