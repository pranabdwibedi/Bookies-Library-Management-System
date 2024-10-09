import React from 'react'
import ValidateToken from './utils/ValidateToken'
import BookCard from './components/BookCard'
import { NavLink } from 'react-router-dom';
function SearchResult({keyword,array,isLogin,setIsLogin,isAdmin,setIsAdmin}) {
  setIsLogin(ValidateToken)
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
  if(keyword === ''){
    return (
      <div className='contentViewport pt-5 d-flex justify-content-center align-items-center'>
      <h1>Please enter any word to search</h1>
    </div>
    )
  }
  return (
    <div className='contentViewport pt-5'>
    <BookCard heading={`Search Result for "${keyword}" :`} books={array} isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    </div>
  )
}

export default SearchResult
