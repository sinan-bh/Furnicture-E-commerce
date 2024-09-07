// src/components/Reg.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../popup box/AlertBox'; 
import './login.css'; 

function Reg() {
  const [usrReg, setUsrReg] = useState({
    name: '',
    email: '',
    userName: '',
    pass: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
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
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usrReg),
        };

        const url = 'http://localhost:3000/users/registration';
        // const url = 'https://backend-ecommerce-furniture.onrender.com/users/registration';

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setAlert({ type: 'success', message: 'Registration Complete' });
        setTimeout(() => navigate('/login'), 1000);
      } catch (error) {
        console.error('Failed to register:', error);
        setAlert({ type: 'error', message: 'Registration failed' });
        setTimeout(() => setAlert(null), 1000);
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
          onClose={() => setAlert(null)}
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
