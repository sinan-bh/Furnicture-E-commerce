import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../lib/store/features/userSlice'; 
import AlertBox from '../../popup box/AlertBox'; 
import './login.css'; 
import { clearAlert } from '../../lib/store/features/userSlice';

function Reg() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.user.alert); 
  const [usrReg, setUsrReg] = useState({
    name: '',
    email: '',
    userName: '',
    pass: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsrReg({
      ...usrReg,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!usrReg.name) newErrors.name = 'Name is required';
    if (!usrReg.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(usrReg.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!usrReg.userName) newErrors.userName = 'Username is required';
    if (!usrReg.pass) newErrors.pass = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Dispatch the registration action
        await dispatch(registerUser(usrReg)).unwrap();
        setTimeout(() => navigate('/login'), 1000);
      } catch (error) {
        console.error('Failed to register:', error);
        // You can handle errors in the Redux slice, no need to manage alert locally
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration me-5">
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
              <h1 className="text-outline fw-bold">User Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={usrReg.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    value={usrReg.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="userName"
                    value={usrReg.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && (
                    <div className="text-danger">{errors.userName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="pass"
                    value={usrReg.pass}
                    onChange={handleChange}
                  />
                  {errors.pass && (
                    <div className="text-danger">{errors.pass}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-navy btn-block form-group"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reg;
