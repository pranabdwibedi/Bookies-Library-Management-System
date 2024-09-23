import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function BookCard({ books, heading, isAdmin }) {
    const navigate = useNavigate()
  return (
    <div className="contentViewport">
        <h1>{heading}</h1>
      <div className="p-5 d-flex flex-wrap gap-5 justify-content-between align-items-center">
        {books.map((book, index) => {
          return (
            <div className="card cards p-2" key={index}>
              <img
                src="/bookLogo.png"
                alt="book Image"
                className="card-image-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 class="card-title">{book.name.substring(0,45)}{(book.name.length < 45)?"":"..."}</h5>
                <p className={`${isAdmin ? "" : "visually-hidden"}`}>
                  Book ID : {book.bookId}
                </p>
                <p>
                  Written by : {" "}
                  {book.author.map((author) => {
                    if (book.author[book.author.length - 1] === author) {
                      return author;
                    }
                    return author + ", ";
                  })}
                </p>
                <p>Published Year : {book.publishYear}</p>
                <p>Language : {book.language}</p>
                <p>
                  <b>
                    Available :{" "}
                    <span
                      className={`${
                        book.availableQty === 0 ? "text-danger" : ""
                      }`}
                    >
                      {book.availableQty !== 0 ? "Yes" : "No"}
                    </span>
                  </b>
                </p>
                <button onClick={()=>{
                    navigate(`/books/book/${book.name}`)
                }} class="btn btn-primary">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookCard;
