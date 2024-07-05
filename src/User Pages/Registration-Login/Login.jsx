import React, { useContext, useState } from "react";
 import "./login.css";
import { Link, useNavigate} from "react-router-dom";
import { addContext } from "../../context/CartContext";
import { AdminDetails } from "../../assets/data-set/Admin-Datas";

function Login() {
  const datas = JSON.parse(localStorage.getItem("registrationData"));

 

  const [errors, setErrors] = useState({});
  const [formValue,setFormValue] = useState({
    lname : '',
    lpass : ''
  })

  const {setLog,setUserDatas } = useContext(addContext)

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
      if (!datas || datas.length === 0) {
        alert('Please Register');
        navigate('/registration');
      } else {
        const user = datas.find(user => user.uname === formValue.lname && user.pass1 === formValue.lpass);
        const adminDatas = AdminDetails.filter(item=> item.admin === 'admin' && item.pass === '123');
        setUserDatas(user)
        if (user) {
          setLog(formValue)
          alert("Login Successfully");
          navigate('/');
        } else if (adminDatas) {
          setLog(formValue)
          alert("Login Successfully");
          navigate('/admin');
        } else{
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
                  {errors.lname && <div className="text-danger">{errors.lname}</div>}
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
                  {errors.lpass && <div className="text-danger">{errors.lpass}</div>}
                </div>
                <button
                  type="button"
                  className="btn-navy btn-block form-group p-1"
                  onClick={onSubmit}
                >
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
