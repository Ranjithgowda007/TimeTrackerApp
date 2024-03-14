import "./Css/style1.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/LoginContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [onfocused, setOnfocused] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.email === "user@gmail.com" && values.password === "password") {
      login();
      navigate("/employlist");
    } else {
      setError("Invalid email or password");
    }
  };

  const handlechange = (e) => {
    setValues({ ...values, password: e.target.value });
    const value = e.target.value;
    value.length ? setOnfocused(true) : setOnfocused(false);
  };

  return (
    <div className="body1 w-100 d-flex justify-content-center align-items-center vh-100">
      <div className="box1 d-flex align-items-center justify-content-center">
        <div className="container1 d-flex flex-column text-center text-white">
          <div className="text-warning">{error && error}</div>
          <div className="top-header">
            <header>
              <h1>LOGIN</h1>
            </header>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field d-flex justify-space-between">
              <input
                type="text"
                className="input w-100 ps-4"
                placeholder="Email Id"
                required
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="input-field d-flex align-items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-100 ps-4"
                placeholder="Password"
                required
                value={values.password}
                onChange={handlechange}
              />
              {onfocused && (
                <i
                  className= {
                    showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", paddingRight:'7px', fontSize: '17px'}}
                ></i>
              )}
            </div>
            <div className="input-field">
              <input type="submit" className="submit" value="Login" />
            </div>

            <div className="bottom d-flex text-white flex-row align-items-center">
              <div className="left d-flex">
                <input type="checkbox" id="check" className="px-3" />
                <label htmlFor="check" className="px-2">
                  Remember Me
                </label>
              </div>
              <div className="right">
                <label>
                  <Link to="#">Forgot password?</Link>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
