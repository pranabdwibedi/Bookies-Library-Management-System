import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";

function UpdateBook({ isLogin, isAdmin, setIsLogin }) {
  const [bookId, setBookId] = useState();
  const [isValid, SetIsValid] = useState(false);
  const [bookName, setBookName] = useState("");
  const [authors, setAuthors] = useState([]);
  const [edition, setEdition] = useState();
  const [language, setLanguage] = useState("");
  const [publishYear, setPublishYear] = useState();
  const [bookType, setBookType] = useState();
  const [bookDesc, setBookDesc] = useState();
  const [totalQty, setTotalQty] = useState();
  const [availableQty, setAvailableQty] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState()

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
  setIsLogin(ValidateToken);
  if (!isLogin) {
    return (
      <div className="vh-92 d-flex flex-column justify-content-center align-items-center">
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
      <div className="vh-92 d-flex flex-column justify-content-center align-items-center">
        <h1>You have no rights to access this page !</h1>
        <NavLink to="/">
          <button className="btn btn-success">Home</button>
        </NavLink>
      </div>
    );
  }

  const searchBook = async (event) => {
    event.preventDefault();
    try {
      await axios
        .get(
          `http://localhost:8000/LMS/api/v1/books/bookInfo?bookId=${bookId}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          SetIsValid(true);
          setBookName(response.data.name);
          setAuthors(authorsArrayToString(response.data.author));
          setBookType(response.data.bookType);
          setBookDesc(response.data.bookDesc);
          setEdition(response.data.edition);
          setPublishYear(response.data.publishYear);
          setTotalQty(response.data.totalQty);
          setLanguage(response.data.language);
          setAvailableQty(response.data.availableQty);
          setPrice(response.data.price)
          setTimeout(() => {
            setMessage();
          }, 2000);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setTimeout(() => {
            setMessage();
          }, 2000);
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
  const authorsArrayToString = (authorArray) => {
    if (authorArray.length === 1) {
      return String(authorArray[0]);
    }
    let authorsName;
    authorArray.map((author) => {
      authorsName += `, ${author}`;
    });
    return authorsName;
  };

  const updateBook = async (event) => {
    event.preventDefault();
    let newData = {
      bookId: bookId,
      name: bookName.trim(),
      author: stringToArray(authors.trim()),
      edition: edition,
      bookType: bookType,
      bookDesc :bookDesc.trim(),
      publishYear: publishYear,
      totalQty: totalQty,
      availableQty: availableQty,
      language: language,
      price : price
    };
    try {
      await axios
        .put("http://localhost:8000/LMS/api/v1/books/update", newData, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage();
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setTimeout(() => {
            setMessage();
          }, 5000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contentViewport pt-5">
      <div className="d-flex updateBookContainer flex-column gap-2 justify-content-center align-items-center">
        <h1>
          <u>Update details of a book</u>
        </h1>
        <form
          className="d-flex flex-wrap gap-2 align-items-center findBookForm flex-column"
          onSubmit={searchBook}
        >
          <label htmlFor="bookIdInput">
            <b>Enter book ID :</b>
          </label>
          <div className="d-flex justify-content-center gap-3 align-items-center">
            <input
              className="form-control w-60 align-self-center inputField text-white bg-transparent"
              id="bookIdInput"
              aria-describedby="bookIdInput"
              type="number"
              value={bookId}
              placeholder="Enter book Id"
              onChange={(e) => setBookId(e.target.value)}
            />

            <button type="submit" className="btn btn-success mx-auto">
              Find Book
            </button>
          </div>
          <p className={`${isValid ? "visually-hidden" : ""} mt-2 fs-4`}>
            {message}
          </p>
        </form>
        <form
          onSubmit={updateBook}
          className={`updateBookForm d-flex flex-wrap justify-content-evenly align-items-center p-2 rounded-2 text-white ${
            isValid ? "" : "visually-hidden"
          }`}
        >
          <div className="mb-3">
            <label htmlFor="bookNameField" className="form-label">
              Name of the book
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="bookNameField"
              aria-describedby="bookName"
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bookAuthorsField" className="form-label">
              Author(s) of the book
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="bookAuthorsField"
              aria-describedby="bookAuthor"
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bookEditionField" className="form-label">
              Edition
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="bookEditionField"
              aria-describedby="bookEdition"
              type="number"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="BooklanguageField" className="form-label">
              Choose book language
            </label>
            <select
              className="form-select bg-transparent text-white"
              id="BooklanguageField"
              aria-label="book language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="ENGLISH" className="bg-black text-white">English</option>
              <option value="HINDI" className="bg-black text-white">Hindi</option>
              <option value="ODIA" className="bg-black text-white">Odia</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bookPublishYearField" className="form-label">
              Publish Year
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="bookPublishYearField"
              aria-describedby="publishYear"
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalBookQty" className="form-label">
              Total Quantity
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="totalBookQty"
              aria-describedby="totalQuantity"
              type="number"
              value={totalQty}
              onChange={(e) => setTotalQty(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="AvailableQuantity" className="form-label">
              Available Quantity
            </label>
            <input
              className="form-control inputField text-white bg-transparent"
              id="AvailableQuantity"
              aria-describedby="booksAvailable"
              type="number"
              value={availableQty}
              onChange={(e) => setAvailableQty(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="priceField" className="form-label">
            Price
          </label>
          <input
            className="form-control  inputField text-white bg-transparent"
            placeholder="Enter book Price"
            id="priceField"
            aria-describedby="book price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
          <div className="mb-3 AddDescriptionBox">
            <label htmlFor="description" className="form-label">
              Description of the book :
            </label>
            <textarea
              class="form-control w-100 inputField text-white bg-transparent" rows={5}
              placeholder="add book description here ..."
              id="description"
              value={bookDesc}
              onChange={(e) => {
                setBookDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mb-5 mt-3 w-90">
            <label htmlFor="selectBookType" className="mb-2 form-label">
              Select the book type :
            </label>
            <div className="d-flex justify-content-evenly gap-4 flex-wrap">
              {allCategories.map((category, index) => {
                if (category === bookType) {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectBookType"
                        id={`bookTypeRadio${index}`}
                        value={category}
                        onChange={(e) => {
                          setBookType(e.target.value);
                        }}
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`bookTypeRadio${index}`}
                      >
                        {category}
                      </label>
                    </div>
                  );
                }
                return (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectBookType"
                      id={`bookTypeRadio${index}`}
                      value={category}
                      onChange={(e) => {
                        setBookType(e.target.value);
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
          <div className="mb-3 d-flex flex-column">
            <p className="fs-4">{message}</p>
            <button type="submit" className="btn btn-success mx-auto">
              Update Book Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
