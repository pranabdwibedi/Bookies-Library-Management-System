import Book from "../models/book.model.js";
import User from "../models/user.model.js";

const addTransactionMW = async (req, res, next) => {
  const userId = req.body.userId;
  const bookId = req.body.bookId;
  const borrowedDate = req.body.borrowedDate;
  if (!userId) {
    return res.status(400).send({
      message: "The User Id is not present in the request",
    });
  }
  if (!bookId) {
    return res.status(400).send({
      message: "The Book Id is not present in the request",
    });
  }
  if (!borrowedDate) {
    return res.status(400).send({
      message: "The Borrow date is not present in the request",
    });
  }
  try {
    const user = await User.findOne({ userId: userId });
    const book = await Book.findOne({ bookId: bookId });
    if (!user) {
      return res.status(400).send({
        message: "The User is not valid",
      });
    }
    if (!book) {
      return res.status(400).send({
        message: "The Book is not valid",
      });
    }
    if(user.userType === "ADMIN"){
      return res.status(400).send({
        message: "Admin can't borrow books",
      });
    }
    if (borrowedDate) {

        const reqDay = Number(borrowedDate.substring(8))
        const reqMonth = Number(borrowedDate.substring(5,7))
        const reqYear = Number(borrowedDate.substring(0,4))
      const nowDate = new Date(Date.now());
      const nowYear = nowDate.getFullYear();
      const nowMonth = (nowDate.getMonth() + 1)
      const nowDay = (nowDate.getDate());
      if(reqYear > nowYear){
        return res.status(400).send({
            message: "You have entered a future date",
          });
      }
      else if(reqYear === nowYear){
        if(reqMonth > nowMonth){
            return res.status(400).send({
                message: "You have entered a future date",
              });
        }
        else if(reqMonth === nowMonth){
            if(reqDay > nowDay){
                return res.status(400).send({
                    message: "You have entered a future date",
                  });
              }
            }
        }

    }
    if (user.borrowedBooks.indexOf(book._id) !== -1) {
        return res.status(400).send({
            message: "The user already borrowed this book",
          });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Internal error while validating request",
    });
  }
};
const removeTransactionMW = async (req, res, next) => {
  const userId = req.query.userId;
  const bookId = req.query.bookId;
  if (!userId) {
    return res.status(400).send({
      message: "The User Id is not present in the request",
    });
  }
  if (!bookId) {
    return res.status(400).send({
      message: "The Book Id is not present in the request",
    });
  }
  try {
    const user = await User.findOne({ userId: userId });
    const book = await Book.findOne({ bookId: bookId });
    if (!user) {
      return res.status(400).send({
        message: "The User is not valid",
      });
    }
    if (!book) {
      return res.status(400).send({
        message: "The Book is not valid",
      });
    }
    if (user.borrowedBooks.length === 0) {
      return res.status(400).send({
        message: "The User is didn't borrow any book",
      });
    }
    if (user.borrowedBooks.indexOf(book._id) === -1) {
      return res.status(400).send({
        message: "The User is didn't borrow this book",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Internal error while validating request",
    });
  }
};
const getTransactionMW = (req,res,next)=>{
  if(!req.query.userId){
    return res.status(400).send({
      message : "User ID is not present in the request"
    })
  }
  if(!req.query.bookId){
    return res.status(400).send({
      message : "Book ID is not present in the request"
    })
  }
  next();
}
export { addTransactionMW, removeTransactionMW, getTransactionMW };
