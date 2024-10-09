import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function RemoveBorrower({ isLogin, isAdmin, setIsLogin }) {
  const [userId, setUserId] = useState();
  const [bookId, setBookId] = useState();
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState(new Date(Date.now()).toISOString().split("T")[0]);
  const [days, setDays] = useState()
  const [price, setPrice] = useState();
  const [calculated, setCalculated] = useState(false);
  const [message, setMessage] = useState();
  const [userName, setUserName] = useState();
  const [bookName, setBookName] = useState();
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

  const calculateprice = async (event) => {
    event.preventDefault();
    await axios.get(`http://localhost:8000/LMS/api/v1/transaction/getInfo?userId=${userId}&bookId=${bookId}&returnDate=${returnDate}`,{
      headers : {
        'x-access-token' : localStorage.getItem('token')
      }
    }).then(res=>{
      setBorrowDate(res.data.borrowDate);
      setUserName(res.data.userName);
      setBookName(res.data.bookName);
      setDays(res.data.days);
      setPrice((res.data.price)*(res.data.days));
      setCalculated(true);
      setMessage('')
    }).catch(err=>{
      setMessage(err.response.data.message)
    })
  }

  const removeBorrowerOperation = async (event) => {
    event.preventDefault()
    axios.delete(`http://localhost:8000/LMS/api/v1/transaction/remove?userId=${userId}&bookId=${bookId}`,{
        headers : {
            "x-access-token" : localStorage.getItem('token')
        }
    }).then(response=>{
        setMessage(response.data.message)
        setTimeout(()=>{
            setMessage("")
            window.location.reload();
        },500)
    }).catch(err=>{
        setMessage(err.response.data.message)
        setTimeout(()=>{
            setMessage("")
        },3000)
    })
  };

  return (
    <div className="contentViewport pt-5">
      <div className="d-flex updateBookContainer h-100 flex-column gap-2 justify-content-center align-items-center">
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center pt-4 w-100">
          <h1>
            <u>Return Book</u>
          </h1>
          <form
            onSubmit={calculateprice}
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
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bookIdInput">Enter book ID : </label>
              <input
                className="form-control inputField text-white bg-transparent"
                id="bookIdInput"
                placeholder="Enter Book ID"
                aria-describedby="bookIdInput"
                type="number"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="returnDateInput">Enter Return Date : </label>
              <input
                className="form-control text-white bg-transparent"
                id="returnDateInput"
                aria-describedby="returnDateInput"
                name="date"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <p>{message}</p>
              <button type="submit" className="btn btn-primary mx-auto">
                Calculate Price
              </button>
            </div>
          </form>
          <div
          className={`${calculated ? "" : "visually-hidden"} bookDeatilsToDelete d-flex align-items-center flex-column gap-2  mt-3`}
        >
          <h3>
            <u>Transaction details</u>
          </h3>
          <table className="w-100">
            <thead></thead>
            <tbody>
              <tr>
                <td>User name : </td>
                <td>{userName}</td>
              </tr>
              <tr>
                <td>Book Name : </td>
                <td>{bookName}</td>
              </tr>
              <tr>
                <td>Borrow Date : </td>
                <td>{borrowDate}</td>
              </tr>
              <tr>
                <td>Return Date : </td>
                <td>{returnDate}</td>
              </tr>
              <tr>
                <td>Days borrowed : </td>
                <td>{days}</td>
              </tr>
              <tr>
                <td>Price to pay : </td>
                <td>{price}/-</td>
              </tr>
            </tbody>
          </table>
          <button onClick={removeBorrowerOperation} type="button" className="btn btn-outline-success">
            Remove Borrower
          </button>
          <p className="rounded-2 text-center fs-3 text-white mt-2">{message}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveBorrower;
