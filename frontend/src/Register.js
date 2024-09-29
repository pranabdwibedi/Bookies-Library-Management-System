import axios from "axios";
import React, { useState } from "react";
function Register() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState();
  const [password, setPassword] = useState("");
  const [isAdmin, SetIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("")
  const [message, setMessage] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()

    let data = {
        name : name,
        userId : userId,
        email : email,
        mobileNo : mobNo,
        password : password,
    }
    if(isAdmin){
        data.userType = "ADMIN"
        data.adminSecret = adminSecret
    }

    try{
        const response = await axios.post('http://localhost:8000/LMS/api/v1/users/signup',data);
        setMessage(response.data.message)
    }catch(err){
        console.log(err)
        setMessage(err.response.data.message)
    }
  };
  const handleAdminCheck = () => {
    if(isAdmin){
        SetIsAdmin(false)
    }else{
        SetIsAdmin(true)
    }
  };
  return (
    <div className="contentViewport d-flex registerPage">
      <form onSubmit={handleSubmit} className="registerForm m-auto text-light d-flex flex-wrap flex-column rounded-4 p-4">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            className="form-control"
            id="fullName"
            aria-describedby="userName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            className="form-control"
            id="userId"
            aria-describedby="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email ID
          </label>
          <input
            className="form-control"
            id="emailId"
            aria-describedby="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">
            Mobile No
          </label>
          <input
            className="form-control"
            id="mobileNo" 
            aria-describedby="emailHelp"
            type="number"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="AdminCheck"
            onClick={handleAdminCheck}
          />
          <label className="form-check-label" htmlFor="AdminCheck">
            ADMIN
          </label>
        </div>
        <div className={`mb-3 ${isAdmin?"":"visually-hidden"}`}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Secret Code
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <p>
            {message}
          </p>
        </div>
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
          <button type="submit" className="btn btn-success mx-auto">
            Register
          </button>
        </div>
      </form>
      </div>
  );
}

export default Register;
