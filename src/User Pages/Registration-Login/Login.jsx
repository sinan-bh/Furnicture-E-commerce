
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import AlertBox from '../../popup box/AlertBox'; 

function Login() {
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    userName: '',
    pass: '',
  });

  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValue.userName) newErrors.userName = 'Username is required';
    if (!formValue.pass) newErrors.pass = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
        credentials: 'include',
      };

      const url = 'http://localhost:3000/login';
      // const url = 'https://backend-ecommerce-furniture.onrender.com/login';

      const response = await fetch(url, options);
      const result = await response.json();

      const { status, userName, token, user, data } = result;
      console.log(result);
      

      if (!response.ok) {
        setAlert({ type: 'error', message: 'Login failed' });
        setTimeout(() => setAlert(null), 1000);
        return;
      }

      if (formValue.userName === userName) {
        if (!token) {
          localStorage.removeItem("isLogin");
        }else{
          if (user) {
            setAlert({ type: 'success', message: 'Login successful' });
            localStorage.setItem('currentUser', JSON.stringify({ username: userName, userID: user._id }));
            localStorage.setItem('isLogin', JSON.stringify(true));
            setTimeout(() => navigate('/'), 1000);
          }
        }
      } else if (formValue.userName === data) {
        console.log('userName',userName);
        
        localStorage.setItem('isAdmin', JSON.stringify(true));
        setAlert({ type: 'success', message: 'Login successfully' });
        setTimeout(() => navigate('/adminhome'), 1000);
      } else {
        setAlert({ type: 'error', message: 'Username or Password is Incorrect' });
        setTimeout(() => setAlert(null), 1000);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login">
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
              <h2 className="text-outline fw-bold">LOGIN PAGE</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="userName"
                    onChange={handleChange}
                    required
                  />
                  {errors.userName && (
                    <div className="text-danger">{errors.userName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="pass"
                    onChange={handleChange}
                    required
                  />
                  {errors.pass && (
                    <div className="text-danger">{errors.pass}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-navy btn-block form-group p-1"
                >
                  Login
                </button>
                <Link to={"/registration"}>
                  <button
                    type="button"
                    className="btn-navy btn-block form-group p-1"
                  >
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
