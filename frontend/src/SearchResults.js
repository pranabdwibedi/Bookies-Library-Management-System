import React from 'react'
import ValidateToken from './utils/ValidateToken'
import BookCard from './components/BookCard'
function SearchResult({heading,array,isLogin,setIsLogin,isAdmin,setIsAdmin}) {
  setIsLogin(ValidateToken)
  return (
    <div className='contentViewport'>
      {/* <Table heading={heading} books={array}/> */}
      <BookCard heading={heading} books={array} isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    </div>
  )
}

export default SearchResult
