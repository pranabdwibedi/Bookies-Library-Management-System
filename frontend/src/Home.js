import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import ValidateToken from "./utils/ValidateToken";
export default function Home({ isLogin, setIsLogin, isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  useEffect(() => {
  }, []);
  setIsLogin(ValidateToken)
  if (!isLogin) {
    return (
      <>
        <Login
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </>
    );
  }
  return (
    <div className="contentViewport d-flex align-items-center justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-4">
                Welcome, <b>{localStorage.getItem('name')}</b>!
              </h1>
              <p className="lead mt-4">
                Welcome to the Library Management System. Here, you can view
                availablle books and streamline your reading experience.
              </p>
              <hr className="my-4" />
              <p>
                Use the navigation bar above to explore our system, or browse
                the library collection.
              </p>
              <button className="btn btn-primary mt-3" onClick={()=>{
                navigate('/books/categories')
              }}>Explore Now</button>
            </div>
          </div>
        </div>
    </div>
  );
}
