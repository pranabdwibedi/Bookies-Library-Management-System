import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ValidateToken from './utils/ValidateToken'
import BookCard from './components/BookCard'
function GetBookByType({bookType,isLogin,setIsLogin, allBooks}) {
    const [categoryBooks, setCategoryBooks] = useState([]);
    useEffect(()=>{
        setCategoryBooks(allBooks.filter((book)=>{
            if(book.bookType === bookType){
                return true;
            }
            return false;
        }))
    },[])
    setIsLogin(ValidateToken)
    if(!isLogin){
        return (
            <div className='vh-92 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center'>You are not Logged in!<br/>Please Login</h1>
                <NavLink to='/login'>
                <button className='btn btn-success'>Login</button>
                </NavLink>
            </div>
        );
    }
    return (
        <div className='contentViewport'>
            <BookCard heading={`${bookType} Books`} books={categoryBooks}/>
        </div>
        
    )
}




export {GetBookByType}