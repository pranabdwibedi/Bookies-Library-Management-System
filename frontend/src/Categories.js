import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ValidateToken from "./utils/ValidateToken";
function Categories({isLogin,setIsLogin, categories}) {
  const navigator = useNavigate();
  setIsLogin(ValidateToken)
  if(!isLogin){
    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center'>You are not Logged in!<br/>Please Login</h1>
            <NavLink to='/login'>
            <button className='btn btn-success'>Login</button>
            </NavLink>
        </div>
    );
}
  const routeToCategory = (category) => {
    navigator(`/books/${category.toLowerCase()}`);
  };
  return (
    <div className="contentViewport d-flex flex-column pt-5">
      <div>
      <h3 className="m-4">Choose your favorite category : </h3>
      <div className="d-flex flex-wrap p-5 gap-2 justify-content-between">
        {categories.map((category, index) => {
          return (
            <div
              role="button"
              className="rounded-circle categoriesBox d-flex justify-content-center align-items-center"
              onClick={() => {
                routeToCategory(category);
              }}
              key={index}
            >
              <h3>{category}</h3>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default Categories;
