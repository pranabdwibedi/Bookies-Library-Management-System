import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
import ValidateToken from "./utils/ValidateToken";

const Login = ({ isLogin, setIsLogin, isAdmin, setIsAdmin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      userId: userId,
      password: password,
    };
    try {
      // Make the POST request
      const response = await axios.post(
        "http://localhost:8000/LMS/api/v1/users/login",
        data
      );

      // Handle success
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('mobileNo',response.data.mobileNo);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("userId", response.data.userId)
      localStorage.setItem('name', response.data.name)
      setMessage("You logged in");
      if (ValidateToken()) {
        if(localStorage.getItem('userType') === "ADMIN"){
          setIsAdmin(true);
        }
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  if (isLogin) {
      navigate('/')
  }

  return (
    <div className="contentViewport d-flex justify-content-center align-items-center loginPage">
      <div className="loginForm p-5 rounded text-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User ID
            </label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>{message}</p>
          </div>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <button type="submit" className="btn btn-success mx-auto">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
