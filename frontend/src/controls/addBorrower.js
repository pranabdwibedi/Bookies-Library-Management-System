import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function AddBorrower({ isLogin, isAdmin, setIsLogin }) {
  const [userId, setUserId] = useState();
  const [bookId, setBookId] = useState();
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const [message, setMessage] = useState();
  setIsLogin(ValidateToken);
  if (!isLogin) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center">
          You are not Logged in!
          <br />
          Please Login
        </h1>
        <NavLink to="/login">
          <button className="btn btn-success">Login</button>
        </NavLink>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>You have no rights to access this page !</h1>
        <NavLink to="/">
          <button className="btn btn-success">Home</button>
        </NavLink>
      </div>
    );
  }

  const addBorrowerOperation = async (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      bookId: bookId,
      borrowedDate: date,
    };
    axios
      .post("http://localhost:8000/LMS/api/v1/transaction/new", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  return (
    <div className="contentViewport pt-5">
      <div className="d-flex updateBookContainer flex-column gap-2 justify-content-center align-items-center h-100">
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center pt-4">
          <h1>
            <u>Issue Book</u>
          </h1>
          <form
            onSubmit={addBorrowerOperation}
            className="addBorrowerForm justify-content-evenly align-items-center p-4 rounded-2 text-white"
          >
            <div className="mb-3">
              <label htmlFor="userIdInput" className="form-label">
                User ID
              </label>
              <input
                className="form-control inputField text-white bg-transparent"
                id="userIdInput"
                aria-describedby="userIdInput"
                placeholder="Enter user ID"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bookIdInput">Book ID : </label>
              <input
                className="form-control inputField text-white bg-transparent"
                id="bookIdInput"
                aria-describedby="bookIdInput"
                type="number"
                placeholder="Enter Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="borrowDateInput">Enter Borrow Date : </label>
              <input
                className="form-control text-white bg-transparent"
                id="borrowDateInput"
                aria-describedby="borrowDateInput"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <p>{message}</p>
              <button type="submit" className="btn btn-success mx-auto">
                Add Borrower
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBorrower;
