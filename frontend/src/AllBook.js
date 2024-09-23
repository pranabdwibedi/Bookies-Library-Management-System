import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import { NavLink } from "react-router-dom";
import ValidateToken from "./utils/ValidateToken";
import BookCard from "./components/BookCard";
export default function AllBook({ isLogin, setIsLogin, isAdmin, setIsAdmin, books }) {
  const [allBooks, setAllBooks] = useState([]);
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
  return (
  <div className="contentViewport">
    {/* <Table heading={"All Books :"} books={allBooks} />; */}
    <BookCard heading={"All Books : "} books={books} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
  </div>
  )
}