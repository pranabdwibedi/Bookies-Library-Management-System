import React from 'react'
import Login from './Login';

function GetAllBooks({book,isLogin,isAdmin,setIsLogin,setIsAdmin}) {
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
    <div className='contentViewport pt-5'>
          <div className='d-flex flex-wrap justify-content-center align-items-center mt-4'>
            <div className='Image d-flex justify-content-center align-items-center'>
              <img src="/bookLogo.png" alt="Book Image" className='w-100'/>
            </div>
            <div className='Header'>
              <div className='BookHeader h-100'>
              <h1>{book.name}</h1>
              <p>Publish Year : <b>{book.publishYear}</b></p>
              <p>by <b>{book.author}</b> (Author)</p>
              <p>Category : <b>{book.bookType}</b></p>
              <p>Language : <b>{book.language}</b></p>
              
              <p>Edition : <b>{book.edition}</b></p>
              <p>
                  
                    Available :{" "}
                    <b>
                    <span
                      className={`${
                        book.availableQty === 0 ? "text-danger" : ""
                      }`}
                    >
                      {book.availableQty !== 0 ? "Yes" : "No"}
                    </span>
                  </b>
                </p>
              </div>
            </div>
            <div className='w-100 h-50 m-2 d-flex flex-column descriptionBox'>
              <h1>Description :</h1>
              <p>{book.bookDesc}</p>
            </div>
          </div>

    </div>
  )
}

export default GetAllBooks
