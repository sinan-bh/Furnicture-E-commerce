import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reg() {
  const uniqueId = Date.now().toString();
  const [usrReg, setUsrReg] = useState({
    id: uniqueId,
    name: "",
    email: "",
    uname: "",
    pass1: "",
    pass2: "",
    date: new Date().toISOString().split("T")[0],
    type: "user",
    cart: {},
    order: {
      id: "",
      image: "",
      name: "",
      quantity: "0",
      status: "",
    },
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
    if (!usrReg.name) newErrors.name = "Name is required";
    if (!usrReg.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(usrReg.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!usrReg.uname) newErrors.uname = "Username is required";
    if (!usrReg.pass1) newErrors.pass1 = "Password is required";
    if (!usrReg.pass2) {
      newErrors.pass2 = "Confirm Password is required";
    } else if (usrReg.pass1 !== usrReg.pass2) {
      newErrors.pass2 = "Passwords do not match";
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
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

      const url = "http://localhost:8000/user";

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
              <form>
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
                    name="pass1"
                    value={usrReg.pass1}
                    onChange={handleChange}
                  />
                  {errors.pass1 && (
                    <div className="text-danger">{errors.pass1}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="pass2"
                    value={usrReg.pass2}
                    onChange={handleChange}
                  />
                  {errors.pass2 && (
                    <div className="text-danger">{errors.pass2}</div>
                  )}
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
}

export default Reg;
