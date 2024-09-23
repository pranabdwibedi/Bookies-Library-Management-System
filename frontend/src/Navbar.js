import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidateToken from "./utils/ValidateToken";
function Navbar({
  isLogin,
  setIsLogin,
  keyword,
  setKeyword,
  setSearchBooks,
  isAdmin,
  setIsAdmin,
}) {
  const navigate = useNavigate();
  setIsLogin(ValidateToken)
  const handleSearch = async (event) => {
    event.preventDefault();
    //logic for search
    try {
      await axios
        .get(
          `http://localhost:8000/LMS/api/v1/books/bookInfo/name?name=${keyword}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setSearchBooks(response.data);
          navigate("/searchResult");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Error while searching");
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    setIsLogin(false);
    setIsAdmin(false);
    navigate('/login')
  };
  return (
    <div className="navigationBar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="/logo.png" alt="" height={30} className="m-2" />
            Bookies
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className={`nav-item ${isLogin ? "" : "visually-hidden"}`}>
                <NavLink className="nav-link" to="/books/all">
                  All books
                </NavLink>
              </li>
              <li className={`nav-item ${isLogin ? "" : "visually-hidden"}`}>
                <NavLink className="nav-link" to="/books/categories">
                  Categories
                </NavLink>
              </li>
              <li className={`nav-item dropdown ${isLogin && isAdmin ? "" : "visually-hidden"}`}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/books/controls/add">
                    Add New Book
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/books/controls/update">
                    Update Book Details
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/books/controls/remove">
                    Delete a Book
                  </NavLink>
                </li>
              </ul>
            </li>
            </ul>

            <form
              onSubmit={handleSearch}
              className={`d-flex me-4 ${isLogin ? "" : "visually-hidden"}`}
              role="search"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <div
              className={`d-flex gap-4 mx-3 ${
                isLogin ? "visually-hidden" : ""
              }`}
            >
              <NavLink to="/login">
                <button type="button" className={`btn btn-primary ${isLogin?"visually-hidden":""}`}>
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button type="button" className={`btn btn-primary ${isLogin?"visually-hidden":""}`}>
                  Register
                </button>
              </NavLink>
            </div>

            <div role="button" className={`userIconContainer ${isLogin?"":"visually-hidden"}`} onClick={()=>{navigate('/user/details')}}>
                {/* <button
                  type="button"
                  className={`btn btn-primary ms-5 ${
                    isLogin ? "" : "visually-hidden"
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </button> */}
                <img src="/userLogo.png" alt="user profile pic" height={40} className="me-1 d-inline" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
