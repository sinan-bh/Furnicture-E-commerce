import React, { useContext, useState } from "react";
import './Style.css'
import { Link, useHistory, useNavigate} from "react-router-dom";
import { addContext } from "../context/CartContext";

function Login() {
  const datas = JSON.parse(localStorage.getItem("registrationData"));

  // const history = useHistory()
 

  const [errors, setErrors] = useState({});

  const {log,setLog} = useContext(addContext)

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  
  // const from = location.state?.from?.pathname || "/";
  // console.log(from);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog({
      ...log,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!log.lname) newErrors.lname = "Username is required";
    if (!log.lpass) newErrors.lpass = "Password is required";
    return newErrors;
  };

  const onSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (datas.uname === log.lname && datas.pass1 === log.lpass) {
        alert("Login Successfully");
        navigate('/')
        // history.goBack() 
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
