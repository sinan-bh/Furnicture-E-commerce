import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reg() {
  const [usrReg, setUsrReg] = useState({
    name: "",
    email: "",
    uname: "",
    pass: "",
  });

  console.log(usrReg);

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
    if (!usrReg.name) newErrors.name = "Name is required";
    if (!usrReg.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(usrReg.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!usrReg.uname) newErrors.uname = "Username is required";
    if (!usrReg.pass) newErrors.pass1 = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    const validationErrors = validate();
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usrReg),
      };

      const url = "http://localhost:3000/users/registration";

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Registration Complete");
      navigate("/login");
    } catch (error) {
      console.error("Failed to add/edit product:", error);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration me-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card cardSize">
            <div className="card-body d-flex  justify-content-center align-items-center">
              <h1 className="text-outline text-white fw-bold ">
                User Registration
              </h1>
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
                    name="uname"
                    value={usrReg.uname}
                    onChange={handleChange}
                  />
                  {errors.uname && (
                    <div className="text-danger">{errors.uname}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password 1"
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
                  className="btn btn-secondary btn-block form-group"
                  // onClick={onSubmit}
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
