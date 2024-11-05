import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAlert } from "../../lib/store/features/userSlice";
import "./login.css";
import AlertBox from "../../popup box/AlertBox";

function Login() {
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    userName: "",
    pass: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.user.alert);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValue.userName) newErrors.userName = "Username is required";
    if (!formValue.pass) newErrors.pass = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const resultAction = await dispatch(loginUser(formValue));

      if (loginUser.fulfilled.match(resultAction)) {
        const { userName, token, user, data } = resultAction.payload;

        if (formValue.userName === userName) {
          if (!token) {
            localStorage.removeItem("isLogin");
          } else {
            if (user) {
              localStorage.setItem(
                "currentUser",
                JSON.stringify({ username: userName, userID: user._id })
              );
              localStorage.setItem("isLogin", JSON.stringify(true));
              setTimeout(() => navigate("/"), 1000);
            }
          }
        } else if (formValue.userName === data) {
          localStorage.setItem("isAdmin", JSON.stringify(true));
          setTimeout(() => navigate("/adminhome"), 1000);
        } else {
          dispatch(clearAlert());
          dispatch({
            type: "user/setAlert",
            payload: {
              type: "error",
              message: "Username or Password is Incorrect",
            },
          });
        }
      } else {
        dispatch(clearAlert());
        dispatch({
          type: "user/setAlert",
          payload: { type: "error", message: "Login failed" },
        });
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
