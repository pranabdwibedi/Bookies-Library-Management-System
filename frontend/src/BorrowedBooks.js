import React, { useEffect, useState } from "react";
import ValidateToken from "./utils/ValidateToken";
import { NavLink } from "react-router-dom";
import BookCard from "./components/BookCard";
import axios from "axios";
function BorrowedBooks({ isLogin, isAdmin, setIsLogin, setIsAdmin, borrowedBooks }) {
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
  if (borrowedBooks.length === 0) {
    return (
      <div className="contentViewport pt-5 d-flex">
        <h1 className="m-auto">You have not borrowed any books</h1>
      </div>
    );
  }
  return (
    <div className="contentViewport pt-5">
      <BookCard
        heading={"Your Borrowed Books : "}
        books={borrowedBooks}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
    </div>
  );
}

export default BorrowedBooks;
