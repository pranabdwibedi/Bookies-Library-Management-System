import React from 'react'

function Table({heading, books}) {
  
  return (
    <div className="vw-100 v-100 fullViewport overflow-scroll">
      <div>
      <h1 className="ms-5">{heading}</h1>
      <h4 className="ms-5">Total no. of Books : {books.length}</h4>
      <table className="w-90 mx-auto table table-hover" border={1}>
        <thead className="text-center">
          <tr>
            <th className="w-5 text-wrap">ID</th>
            <th>Name of Book</th>
            <th>Authors Names</th>
            <th>Language</th>
            <th>Book Edition</th>
            <th>Publish Year</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book,index) => (
            <tr key={index}>
              <td className='text-center'>{book.bookId}</td>
              <td className="w-30">{book.name}</td>
              <td>{book.author.map((author)=>{
                if(author === book.author[book.author.length-1]){
                  return author
                }
                return author+", "
              })}</td>
              <td className="text-center">{book.language}</td>
              <td className="text-center">{book.edition}</td>
              <td className="text-center">{book.publishYear}</td>
              <td className="text-center">{book.availableQty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Table
