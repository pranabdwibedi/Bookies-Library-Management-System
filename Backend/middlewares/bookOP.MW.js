import bookModel from "../models/book.model.js";
const addBookMW = async (req, res, next) => {
  const requestBody = req.body;
  try {
    if (!requestBody) {
      return res.status(400).send({
        message: "The request body is not present",
      });
    }
    if (!requestBody.name) {
      return res.status(400).send({
        message: "Book name is a mendatory field",
      });
    }
    if (!requestBody.author) {
      return res.status(400).send({
        message: "Author name is a mendatory field",
      });
    }
    if (typeof requestBody.author !== typeof []) {
      console.log(typeof requestBody.author);
      return res.status(400).send({
        message: "Author field should be an array",
      });
    }
    if (!requestBody.language) {
      return res.status(400).send({
        message: "Book language is a mendatory field",
      });
    }
    if (!requestBody.bookType) {
      return res.status(400).send({
        message: "Book type is a mendatory field",
      });
    }
    if(!requestBody.bookDesc){
      return res.status(400).send({
        message: "Book description is a mendatory field",
      });
    }
    if(!requestBody.price){
      return res.status(400).send({
        message: "Please mention price of the book",
      });
    }
    let validationArray = (
      await bookModel.schema.path("bookType").enumValues
    ).map((bookType) => {
      if (bookType === requestBody.bookType) {
        return true;
      }
      else{
        return false
      }
    });
    if (validationArray.indexOf(true) === -1) {
      return res.status(400).send({
        message: "Book type is invalid",
      });
    }
    const today = new Date();
    const year = today.getFullYear();
    if (requestBody.publishYear < 1500 || requestBody.publishYear > year) {
      return res.status(400).send({
        message: "invalid publish year",
      });
    }
    let book;
    // let book = await bookModel.findOne({ name: requestBody.name, language : requestBody.language});
    if (requestBody.edition) {
      book = await bookModel.findOne({
        name: { $regex: new RegExp(requestBody.name.toLowerCase(), "i") },
        language: requestBody.language,
        edition: requestBody.edition,
      });
      if (book) {
        console.log(book);
        return res.status(400).send({
          message: "The book is already present",
        });
      }
    } else {
      book = await bookModel.findOne({
        name: requestBody.name,
        language: requestBody.language,
      });
      if (book) {
        console.log(book);
        return res.status(400).send({
          message: "The book is already present",
        });
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal error occured while validating add book request",
    });
  }
};

const deleteBookMW = async (req, res, next) => {
  const requestBody = req.query;
  try{
    if (!requestBody) {
      return res.status(400).send({
        message: "The request body is not present",
      });
    }
    if (!requestBody.bookId) {
      return res.status(400).send({
        message: "The book Id is menadatory to delete a book",
      });
    }
    const book = await bookModel.findOne({ bookId: requestBody.bookId });
    if (!book) {
      return res.status(400).send({
        message: "The book Id is invalid",
      });
    }
  }catch(err){
    return res.status(500).send({
      message: "Internal error occured while validating",
    });
  }
  next();
};

const updateBookMW = (req, res, next) => {
  const requestBody = req.body;
  if (!requestBody) {
    return res.status(400).send({
      message: "Request body is not present",
    });
  }
  if (!requestBody.bookId) {
    return res.status(400).send({
      message: "Book ID is mendatory field",
    });
  }
  if (
    !requestBody.name&&
    !requestBody.author &&
    !requestBody.bookType &&
    !requestBody.bookDesc &&
    !requestBody.edition &&
    !requestBody.publishYear &&
    !requestBody.totalQty &&
    !requestBody.availableQty&&
    !requestBody.price
  ) {
    return res.status(400).send({
      message: "Please mention fields to update",
    });
  }
  next();
};

const bookInfoMW = async (req, res, next) => {
  try{
    if(!req.query.bookId){
      return res.status(400).send({
        message : "Book Id is a mendatory"
      })
    }
    const book = await bookModel.findOne({ bookId: Number(req.query.bookId) });
    if (!book) {
      return res.status(400).send({
        message: "The book Id is invalid",
      });
    }
    next();
  }catch(err){
    return res.status(500).send({
      message : "Internal error while validating request"
    })
  }
};

const bookInfoByTypeMW = async (req, res, next) => {
  if (!req.query) {
    return res.status(400).send({
      message: "Request Query is not present",
    });
  }
  if (!req.query.bookType) {
    return res.status(400).send({
      message: "Book type is mendatory for searching book by type",
    });
  }
  const book = await bookModel.findOne({ bookType: req.query.bookType });
  if (!book) {
    return res.status(400).send({
      message: "The book is not available of this type",
    });
  }
  next();
};

const getByNameMW = async (req, res, next) => {
  if (!req.query) {
    return res.status(400).send({
      message: "Request Query is not present",
    });
  }
  if (!req.query.name) {
    return res.status(400).send({
      message: "Book name is mendatory for searching book by type",
    });
  }
  next();
};

export {
  addBookMW,
  deleteBookMW,
  updateBookMW,
  bookInfoMW,
  bookInfoByTypeMW,
  getByNameMW,
};
