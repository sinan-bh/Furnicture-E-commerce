import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/CartContext";
import { AdminDetails } from "../../assets/data-set/Admin-Datas";
import useFetch from "../../Custom Hook/useFetch";

function Login() {
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    uname: "",
    pass: "",
  });

  const { setUserDatas } = useContext(userContext);

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
    if (!formValue.uname) newErrors.uname = "Username is required";
    if (!formValue.pass) newErrors.pass = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      };

      const url = "http://localhost:3000/users/login";

      const response = await fetch(url, options);
      console.log(response);
      
      const result = await response.json();
      console.log(result);

      const { status, uname, token, user } = result;
      console.log(user);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const adminDatas = AdminDetails.find((item) => item.type === "admin");
      if (status === "success") {
        setUserDatas({user: user});
        alert("Login Successfully");
        localStorage.setItem('currentUser',JSON.stringify({uname}))
        localStorage.setItem('isLogin',JSON.stringify(true))
        navigate("/");
      } else if (adminDatas.type === formValue.uname) {
        localStorage.setItem("isAdmin", JSON.stringify(true));
        alert("Login Successfully");
        navigate("/adminhome");
      } else {
        alert("Username or Password is Incorrect");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card cardSize">
            <div className="card-body d-flex justify-content-center align-items-center">
              <h2 className="text-outline text-white fw-bold">LOGIN PAGE</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="uname"
                    onChange={handleChange}
                    required
                  />
                  {errors.uname && (
                    <div className="text-danger">{errors.uname}</div>
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
