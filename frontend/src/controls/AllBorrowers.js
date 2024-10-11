import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function AllBorrowers({ isLogin, setIsLogin, isAdmin}) {
    const [allBorrowers, setAllBorrowers] = useState([]);
    useEffect(()=>{
        fetchAllBorrowers();
    },[])
    const fetchAllBorrowers = async() =>{
        try{
            axios.get('http://localhost:8000/LMS/api/v1/transaction/all',{
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            }).then(response=>{
                setAllBorrowers(response.data)
            }).catch(err=>{
                setAllBorrowers([]);
            })
        }catch(err){
            console.log(err)
        }
    }
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
  if(allBorrowers.length === 0){
    return (
      <div className="contentViewport pt-5 d-flex justify-content-center align-items-center">
          <h1>There are no borrowers to display</h1>
      </div>
    );
  }
  return (
    <div className="contentViewport pt-5">
      <div className="mt-5">
        <div className="container">
          <h2>Borrowers List</h2>
          <table className=" w-100 border">
            <thead>
              <tr className="text-center fs-5 border">
                <th>Book Name</th>
                <th>Book ID</th>
                <th>Availability</th>
                <th>Borrow Date</th>
                <th>User Name</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody className="fs-5">
              {allBorrowers.map((borrower, index) => (
                <tr key={index} className="text-center border">
                  <td className="text-start p-3">{borrower.bookName}</td>
                  <td >{borrower.bookId}</td>
                  <td>{borrower.availableQty}</td>
                  <td>{borrower.borrowDate}</td>
                  <td>{borrower.userName}</td>
                  <td>{borrower.userId}</td>
                  <td>{borrower.email}</td>
                  <td>{borrower.mobileNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllBorrowers;
