import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/CartContext";
import { AdminDetails } from "../../assets/data-set/Admin-Datas";
import useFetch from "../../Custom Hook/useFetch";

function Login() {

  const {
    data: userData
  } = useFetch("http://localhost:8000/user");


  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    lname: "",
    lpass: "",
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
    if (!formValue.lname) newErrors.lname = "Username is required";
    if (!formValue.lpass) newErrors.lpass = "Password is required";
    return newErrors;
  };

  const onSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (!userData || userData.length === 0) {
        alert("Please Register");
        navigate("/registration");
      } else {
        const user = userData.find(
          (user) =>
            user.uname === formValue.lname && user.pass1 === formValue.lpass
        );
        const adminDatas = AdminDetails.find((item) => item.type === "admin");
        setUserDatas(user);
        if (user) {
          alert("Login Successfully");
          localStorage.setItem('currentUser',JSON.stringify({...formValue,id : user.id}))
          localStorage.setItem('isLogin',JSON.stringify(true))
          navigate("/");
        } else if (adminDatas.type === formValue.lname) {
          localStorage.setItem('isAdmin',JSON.stringify(true))
          alert("Login Successfully");
          navigate("/adminhome");
        } else {
          alert("Username or Password is Incorrect");
        }
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
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="lname"
                    onChange={handleChange}
                    required
                  />
                  {errors.lname && (
                    <div className="text-danger">{errors.lname}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="lpass"
                    onChange={handleChange}
                    required
                  />
                  {errors.lpass && (
                    <div className="text-danger">{errors.lpass}</div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-navy btn-block form-group p-1"
                  onClick={onSubmit}
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
