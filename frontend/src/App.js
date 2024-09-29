import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllBook from "./AllBook";
import Navbar from "./Navbar";
import Login from "./Login";
import { useEffect, useState } from "react";
import Register from "./Register";
import ValidateToken from "./utils/ValidateToken";
import Categories from "./Categories";
import { GetBookByType } from "./categoryWiseBook";
import axios from "axios";
import SearchResult from "./SearchResults";
import AddBook from "./controls/AddBook";
import UpdateBook from "./controls/UpdateBook";
import RemoveBook from "./controls/removeBook";
import GetAllBooks from "./GetAllBooks";
import UserInfoPanel from "./userInfoPanel";
import UserDetailUpdate from "./userDetailUpdate";
import UserIdUpdate from "./userIdUpdate";
import UserPwUpdate from "./userPwUpdate";


function App() {
  const [isLogin, setIsLogin] = useState(ValidateToken());
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("userType") === "ADMIN"
  );
  const [categories, setCategories] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [keyword,setKeyword] = useState();
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    fetchAllBooks();
    fetchCategories();
  }, []);
  const fetchAllBooks = async () => {
    await axios
      .get("http://localhost:8000/LMS/api/v1/books/bookInfo", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const sortedBooks = response.data.sort((a, b) => {
          if (a.bookId < b.bookId) return -1; // a comes before b
          if (a.bookId > b.bookId) return 1; // a comes after b
          return 0;
        });
        setAllBooks(sortedBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCategories = async () => {
    await axios
      .get("http://localhost:8000/LMS/api/v1/books/categories", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="FullViewPort">
      
      <BrowserRouter>
        <Navbar
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          setSearchBooks={setSearchBooks}
          keyword={keyword}
          setKeyword = {setKeyword}
        />
        <Routes>
          <Route path="/user/details/update" element={<UserDetailUpdate isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin}/>}></Route>
          <Route
          path="/user/details/userIdUpdate"
          element={<UserIdUpdate isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}
          ></Route>
          <Route path='/user/details/userPWUpdate' element={<UserPwUpdate isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>
          <Route
            path="/"
            element={
              <Home
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route
            path="/books/all"
            element={
              <AllBook
                isLogin={isLogin}
                isAdmin={isAdmin}
                setIsLogin={setIsLogin}
                setIsAdmin={setIsAdmin}
                books={allBooks}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route path="/user/details" element={<UserInfoPanel isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/books/categories"
            element={<Categories isLogin={isLogin} setIsLogin={setIsLogin} categories={categories}/>}
          ></Route>
          <Route
            path="/searchResult"
            element={
              <SearchResult heading={`Search Result for "${keyword}" :`} array={searchBooks} isAdmin={isAdmin} setIsAdmin={setIsAdmin} isLogin={isLogin} setIsLogin={setIsLogin}/>
            }
          ></Route>
          <Route
            path="/books/controls/add"
            element={
              <AddBook
                isLogin={isLogin}
                isAdmin={isAdmin}
                setIsLogin={setIsLogin}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route
            path="/books/controls/update"
            element={
              <UpdateBook
                isLogin={isLogin}
                isAdmin={isAdmin}
                setIsLogin={setIsLogin}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          <Route
            path="/books/controls/remove"
            element={
              <RemoveBook
                isLogin={isLogin}
                isAdmin={isAdmin}
                setIsLogin={setIsLogin}
                setIsAdmin={setIsAdmin}
              />
            }
          ></Route>
          {categories.map((category) => {
            return (
              <Route
                path={`/books/${category.toLowerCase()}`}
                element={
                  <GetBookByType
                    bookType={category}
                    isLogin={isLogin}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                    setIsLogin={setIsLogin}
                    allBooks = {allBooks}
                  />
                }
              ></Route>
            );
          })}
          {
            allBooks.map((book)=>{
              return (
                <Route path={`/books/book/${book.name}`} element={<GetAllBooks book={book} isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin}/>}></Route>
              );
            })
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
