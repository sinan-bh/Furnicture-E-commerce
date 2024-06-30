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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReg({
      ...reg,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!reg.name) newErrors.name = "Name is required";
    if (!reg.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(reg.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!reg.uname) newErrors.uname = "Username is required";
    if (!reg.pass1) newErrors.pass1 = "Password is required";
    if (!reg.pass2) {
      newErrors.pass2 = "Confirm Password is required";
    } else if (reg.pass1 !== reg.pass2) {
      newErrors.pass2 = "Passwords do not match";
    }
    return newErrors;
  };

  const onSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("registrationData", JSON.stringify(reg));
      navigate("/login");
      alert("Registration Complete");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration me-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card cardSize">
            <div className="card-body d-flex  justify-content-center align-items-center">
              <h1 className="text-outline text-white fw-bold ">User Registration</h1>
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
                  {errors.name && <div className="text-danger">{errors.name}</div>}
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
                  {errors.email && <div className="text-danger">{errors.email}</div>}
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
                  {errors.uname && <div className="text-danger">{errors.uname}</div>}
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
                  {errors.pass1 && <div className="text-danger">{errors.pass1}</div>}
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
                  {errors.pass2 && <div className="text-danger">{errors.pass2}</div>}
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
