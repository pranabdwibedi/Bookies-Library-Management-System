import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function AddBook({ isLogin, isAdmin, setIsLogin }) {
  const [bookName, setBookName] = useState();
  const [bookDesc, setBookDesc] = useState()
  const [authors, setAuthors] = useState([]);
  const [edition, setEdition] = useState();
  const [language, setLanguage] = useState();
  const [publishYear, setPublishYear] = useState();
  const [bookType, setBookType] = useState();
  const [toalQty, setTotalQty] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState();
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
    event.preventDefault();
    let data = {
      name: bookName.trim(),
      language: language,
      author: stringToArray(authors.trim()),
      edition: edition,
      bookType: bookType,
      bookDesc : bookDesc.trim(),
      publishYear: publishYear,
      totalQty: toalQty,
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
    <div className="contentViewport pt-5 d-flex flex-column gap-4 justify-content-center align-items-center">
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
      <h1>
        <u>Add new Book</u>
      </h1>
      <form
        onSubmit={addBook}
        className="addBookForm d-flex flex-wrap justify-content-evenly align-items-center p-2 rounded-2 bg-lightBlue text-white"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name of the book
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Author(s) of the book
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Edition
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="number"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Choose book language
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option disabled selected>Select book language</option>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi</option>
            <option value="ODIA">Odia</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Publish Year
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Total Quantity
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="number"
            value={toalQty}
            onChange={(e) => setTotalQty(e.target.value)}
          />
        </div>
        <div className="mb-3 AddDescriptionBox">
        <label htmlFor="description" className="form-label">
            Description of the book : 
          </label>
        <textarea class="form-control w-100 h-100" placeholder="add book description here ..." id="description" value={bookDesc} onChange={(e)=>{
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
          <br />
          <p>Book ID :</p>
        <button type="submit" className="btn btn-success mx-auto">
          Add Book
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddBook;
