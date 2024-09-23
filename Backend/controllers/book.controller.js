import bookModel from "../models/book.model.js";
//controller to add a book to the database
const addBookController = async (req, res) => {
  try {
    const requestBody = req.body;
    const allDoc = await bookModel.find();
    const noOfBooks = allDoc.length;
    let bookId;
    //check if any id is available and if found then assign
    for (let i = 1; true; i++) {
      let book = await bookModel.findOne({ bookId: noOfBooks + i });
      if (!book) {
        bookId = noOfBooks + i;
        break;
      }
    }
    // if(!bookId){
    //     bookId = noOfBooks+1
    // }
    for (let i = 1; i <= noOfBooks; i++) {
      let book = await bookModel.findOne({ bookId: i });
      if (!book) {
        bookId = i;
      }
    }

    const newBook = {
      name: requestBody.name,
      author: requestBody.author,
      bookId: bookId,
      language: requestBody.language,
      bookType: requestBody.bookType,
      bookDesc : requestBody.bookDesc
    };
    if (requestBody.edition) {
      newBook.edition = requestBody.edition;
    }
    if (requestBody.publishYear) {
      newBook.publishYear = requestBody.publishYear;
    }
    if (requestBody.totalQty) {
      newBook.totalQty = requestBody.totalQty;
      newBook.availableQty = requestBody.totalQty;
    }
    const bookCreated = await bookModel.create(newBook);
    return res.status(201).send({
        message : "Book is added to the Database"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal error while adding book",
    });
  }
};

//controller to remove a book from database
const removeBookController = async (req, res) => {
  const requestBody = req.body;
  try {
    const deletedBook = await bookModel.deleteOne({
      bookId: requestBody.bookId,
    });
    deletedBook.message = "Book deleted Successfully";
    return res.status(200).send(deletedBook);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal error occured while deleting the book",
    });
  }
};

//controller to update the book details
const updateBookController = async (req, res) => {
  const requestBody = req.body;

  try {
    if(requestBody.name){
        await bookModel.updateOne(
            { bookId: requestBody.bookId },
            { name : requestBody.name }
          ); 
    }
    if(requestBody.bookDesc){
      await bookModel.updateOne(
        {bookId : requestBody.bookId},
        {bookDesc : requestBody.bookDesc}
      );
    }
    if (requestBody.author) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { author: requestBody.author }
      );
    }
    if (requestBody.edition) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { edition: requestBody.edition }
      );
    }
    if (requestBody.bookType) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { bookType: requestBody.bookType }
      );
    }
    if(requestBody.language){
        await bookModel.updateOne(
            { bookId: requestBody.bookId },
            { language : requestBody.language }
          ); 
    }
    if (requestBody.publishYear) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { publishYear: requestBody.publishYear }
      );
    }
    if (requestBody.totalQty) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { totalQty: requestBody.totalQty }
      );
    }
    if (requestBody.availableQty) {
      await bookModel.updateOne(
        { bookId: requestBody.bookId },
        { availableQty: requestBody.availableQty }
      );
    }
    res.status(200).send({
      message: "Updated book detail successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal error occured ! while updating the book details",
    });
  }
};

const readBookInfoController = async (req, res) => {
  if (req.query.bookId) {
    const bookInfo = await bookModel.findOne({ bookId: req.query.bookId });
    return res.status(200).send(bookInfo);
  } else {
    const books = await bookModel.find();
    return res.status(200).send(books);
  }
};
const getAllBookCategories = async (req, res) => {
  try {
    const categories = await bookModel.schema.path("bookType").enumValues;
    return res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Error occured while fetching all book types",
    });
  }
};
const getBookCategories = async (req, res) => {
  try {
    const categories = await bookModel.distinct("bookType");

    return res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal error while fetching book categories",
    });
  }
};

const getBookByType = async (req, res) => {
  const requestQuery = req.query;
  try {
    const books = await bookModel.find({ bookType: requestQuery.bookType });
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({
      message: "Internal error while getting books by type",
    });
  }
};

const getBookByName = async (req, res) => {
  const name = req.query.name.toLowerCase();
  if (name) {
    const books = await bookModel.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (books) {
      return res.status(200).send(books);
    }
    return res.status(400).send({
      message: "The book is not added till now",
    });
  }
  const books = await bookModel.find();
  return res.status(400).send(books);
};

export {
  addBookController,
  removeBookController,
  updateBookController,
  readBookInfoController,
  getBookCategories,
  getBookByType,
  getBookByName,
  getAllBookCategories
};
