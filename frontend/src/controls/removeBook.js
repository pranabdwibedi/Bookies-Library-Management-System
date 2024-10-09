import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";
function RemoveBook({ isLogin, isAdmin, setIsLogin }) {
  const [bookId, setBookId] = useState();
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState();
  const [book, setBook] = useState({});
  setIsLogin(ValidateToken)
  if (!isLogin) {
    return (
      <div className="vh-92 d-flex flex-column justify-content-center align-items-center">
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
      <div className="vh-92 d-flex flex-column justify-content-center align-items-center">
        <h1>You have no rights to access this page !</h1>
        <NavLink to="/">
          <button className="btn btn-success">Home</button>
        </NavLink>
      </div>
    );
  }

  const findBook = async (event) => {
    event.preventDefault();
    try {
      await axios
        .get(
          `http://localhost:8000/LMS/api/v1/books/bookInfo?bookId=${bookId}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setBook(response.data);
          setIsValid(true);
          setMessage('')
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setIsValid(false);
        });
    } catch (err) {
      console.log(err);
    }
  };


  const deleteBook = async() =>{
    try{
        await axios.delete(`http://localhost:8000/LMS/api/v1/books/remove?bookId=${bookId}`,{
            headers : {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(response=>{
            setMessage(response.data.message)
            setTimeout(()=>{
              setMessage('')
              window.location.reload();
            },500)
        }).catch(err=>{
            setMessage(err.response.data.message)
        })
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="contentViewport pt-5">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>
          <u>Delete a Book</u>
        </h1>
        <form
          onSubmit={findBook}
          className="d-flex flex-column gap-3 justify-content-center align-items-center deleteBookForm"
        >
          <div className="d-flex gap-3 justify-content-center">
            <label htmlFor="bookIdInput" className="align-self-center">Book ID : </label>
            <input
              className="form-control w-50 inputField text-white bg-transparent"
              id="bookIdInput"
              aria-describedby="bookIdInput"
              type="number"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          <span className={`${isValid?'visually-hidden':''}`}>{message}</span>
          <button type="submit" className="btn btn-outline-danger">
            Delete
          </button>
          
        </form>
        <div
          className={`${isValid ? "" : "visually-hidden"} bookDeatilsToDelete d-flex align-items-center flex-column gap-2 mt-3`}
        >
          <h3>
            <u>Book details</u>
          </h3>
          <table className="w-100">
            <thead></thead>
            <tbody>
              <tr>
                <td>Book name : </td>
                <td>{book.name}</td>
              </tr>
              <tr>
                <td>Author(s) : </td>
                <td>{book.author}</td>
              </tr>
              <tr>
                <td>Book type : </td>
                <td>{book.bookType}</td>
              </tr>
              <tr>
                <td>Book language : </td>
                <td>{book.language}</td>
              </tr>
              <tr>
                <td>Book edition : </td>
                <td>{book.edition}</td>
              </tr>
              <tr>
                <td>Publish year : </td>
                <td>{book.publishYear}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={deleteBook} type="button" className="btn btn-outline-danger">
            Confirm Delete
          </button>
          <p className="rounded-2 text-center fs-3 text-white mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default RemoveBook;
