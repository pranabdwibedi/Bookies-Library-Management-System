import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function AddBook({ isLogin, isAdmin, setIsLogin }) {
  const [bookName, setBookName] = useState('');
  const [bookDesc, setBookDesc] = useState('')
  const [authors, setAuthors] = useState([]);
  const [edition, setEdition] = useState();
  const [language, setLanguage] = useState();
  const [publishYear, setPublishYear] = useState();
  const [bookType, setBookType] = useState();
  const [toalQty, setTotalQty] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState();
  const [price, setPrice] = useState();
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        await axios
          .get("http://localhost:8000/LMS/api/v1/books/bookCategories", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            setAllCategories(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategories();
  }, []);
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
  if (!isAdmin) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>You have no rights to access this page !</h1>
        <NavLink to="/">
          <button className="btn btn-success">Home</button>
        </NavLink>
      </div>
    );
  }

  const addBook = async (event) => {
    event.preventDefault()
    let data = {
      name: bookName.trim(),
      language: language,
      author: stringToArray(authors.trim()),
      edition: edition,
      bookType: bookType,
      bookDesc : bookDesc.trim(),
      publishYear: publishYear,
      totalQty: toalQty,
      price : price
    };

    try {
      await axios
        .post("http://localhost:8000/LMS/api/v1/books/add", data, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage("");
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const stringToArray = (str) => {
    let start = 0;
    let end = 0;
    let authorSet = new Set([]);
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === ",") {
        end = i;
        let author = str.slice(start, end);
        authorSet.add(author);
        if (str.charAt(i) === " ") {
          start = i + 2;
        } else {
          start = i + 1;
        }
      }
      if (i === str.length - 1) {
        authorSet.add(str.slice(start, str.length));
      }
    }
    const authorArray = Array.from(authorSet);
    return authorArray;
  };

  return (
    <div className="contentViewport pt-5">
      <div className="d-flex updateBookContainer flex-column gap-2 justify-content-center align-items-center">
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center pt-4">
      <h1>
        <u>Add new Book</u>
      </h1>
      <form
        onSubmit={addBook}
        className="addBookForm d-flex flex-wrap justify-content-evenly align-items-center p-2 rounded-2 text-white"
      >
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name of the book
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="nameInput"
            aria-describedby="book name"
            type="text"
            value={bookName}
            placeholder="Enter book name"
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="authorInput" className="form-label">
            Author(s) of the book
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="authorInput"
            aria-describedby="Author input"
            type="text"
            placeholder="Enter authors name"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookEditionInput" className="form-label">
            Edition
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            id="bookEditionInput"
            aria-describedby="Book Edition"
            type="number"
            placeholder="Enter book edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookLanguage" className="form-label">
            Choose book language
          </label>
          <select
            className="form-select bg-transparent text-white"
            id="bookLanguage"
            aria-label="book language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option disabled selected hidden className="bg-black text-white">Select book language</option>
            <option value="ENGLISH" className="bg-black text-white">English</option>
            <option value="HINDI" className="bg-black text-white">Hindi</option>
            <option value="ODIA" className="bg-black text-white">Odia</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="bookPublishYear" className="form-label">
            Publish Year
          </label>
          <input
            className="form-control  inputField text-white bg-transparent"
            placeholder="Enter book publish year"
            id="bookPublishYear"
            aria-describedby="Book Publish Year"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookTotalQty" className="form-label">
            Total Quantity
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            placeholder="Enter Quantity"
            id="bookTotalQty"
            aria-describedby="book total quantity"
            type="number"
            value={toalQty}
            onChange={(e) => setTotalQty(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priceField" className="form-label">
            Price
          </label>
          <input
            className="form-control inputField text-white bg-transparent"
            placeholder="Enter book Price"
            id="priceField"
            aria-describedby="book price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3 AddDescriptionBox">
        <label htmlFor="bookDescription" className="form-label">
            Description of the book : 
        </label>
        <textarea class="form-control w-100 inputField text-white bg-transparent" rows={5} placeholder="add book description here ..." id="bookDescription" value={bookDesc} onChange={(e)=>{
          setBookDesc(e.target.value)
        }}></textarea>
        </div>
        <div className="mb-2 mt-3 w-90">
          <label htmlFor="" className="mb-2 form-label">
            Select the book type : 
          </label>
          <div className="d-flex justify-content-evenly gap-4 flex-wrap">
            {allCategories.map((category, index) => {
              return (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={`bookTypeRadio${index}`}
                    onClick={() => {
                      setBookType(category);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`bookTypeRadio${index}`}
                  >
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex flex-column">
          <p>{message}</p>
        <button type="submit" className="btn btn-success mx-auto">
          Add Book
        </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}

export default AddBook;
