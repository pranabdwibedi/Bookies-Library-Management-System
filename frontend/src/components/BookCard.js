import { useNavigate } from "react-router-dom";

function BookCard({ books, heading, isAdmin }) {
    const navigate = useNavigate()
  return (
    <div className="contentViewport">
        <h1>{heading}</h1>
      <div className="p-5 d-flex flex-wrap gap-5 justify-content-center align-items-center">
        {books.map((book, index) => {
          return (
            <div className="card cards px-2 pt-2" key={index}>
              <img
                src="/bookLogo.png"
                alt="book Image"
                className="card-image-top"
              />
              <div className="card-body d-flex flex-column justify-content-around gap-2">
                <h5 class="card-title">{book.name.substring(0,45)}{(book.name.length < 45)?"":"..."}</h5>
                <span className={`${isAdmin ? "" : "visually-hidden"}`}>
                  Book ID : {book.bookId}
                </span>
                <span>
                  Written by : {" "}
                  {book.author.map((author) => {
                    if (book.author[book.author.length - 1] === author) {
                      return author;
                    }
                    return author + ", ";
                  })}
                </span>
                <span>Published Year : {book.publishYear}</span>
                <span>Language : {book.language}</span>
                <span className={`${isAdmin?"":"visually-hidden"}`}>Available Quantity : <b>{book.availableQty}</b>/<b>{book.totalQty}</b></span>
                <span>
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
                </span>
                <span>Price : <b>₹{book.price}/- </b>per day</span>
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
