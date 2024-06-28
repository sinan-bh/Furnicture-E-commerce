import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Registration = () => {
  const [reg, setReg] = useState({
    name: "",
    email: "",
    uname: "",
    pass1: "",
    pass2: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReg({
      ...reg,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (reg.pass1 === reg.pass2) {
      localStorage.setItem("registrationData", JSON.stringify(reg));
      navigate('/login')
      alert("Registration Complete");
    } else {
      navigate('/')
      alert("The Passwords do not match");
    }
  };

  return (
    <div className=" registration me-5">
      <div className="row justify-content-center ">
        <div className="col-md-6 ">
          <div className="card cardSize">
            <div className="card-body d-flex justify-content-center aling-items-center">
              <h1 className="text-outline text-white fw-bold mt-5">User Registration</h1>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={reg.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    value={reg.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="uname"
                    value={reg.uname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password 1"
                    name="pass1"
                    value={reg.pass1}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="pass2"
                    value={reg.pass2}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-block form-group"
                  onClick={onSubmit}
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
};

export default Registration;
