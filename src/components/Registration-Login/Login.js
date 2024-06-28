import React, { useState } from "react";
import './style.css'
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Login() {
  const datas = JSON.parse(localStorage.getItem("registrationData"));
  console.log(datas);
  const [log, setLog] = useState({
    lname: "",
    lpass: "",
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog({
      ...log,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log(datas.uname, log.lname);
    if (datas.uname === log.lname && datas.pass1 === log.lpass) {
      // navigate("/home");
      alert("Login Successfully");
    } else {
      // navigate("/login");
      alert("Username or Password is Incorrect");
    }
  };

  return (
    <div className=" login">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card cardSize ">
            <div className="card-body d-flex justify-content-center aling-items-center">
              <h2 className="text-outline text-white fw-bold ">LOGIN PAGE</h2>
              <form>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="lname"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group ">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="lpass"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="button" className="btn-navy btn-block form-group p-1" onClick={onSubmit}>
                  Login
                </button>
                <Link to={'/registration'}>
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
