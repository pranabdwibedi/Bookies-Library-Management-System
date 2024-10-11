import Book from "../models/book.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const addTransactionController = async(req,res) =>{
    const body = req.body;
    try{
        let book = await Book.findOne({bookId : body.bookId})
        if(!book){
            return res.status(400).send({
                message : "Error while finding books"
            })
        }
        if(book.availableQty <= 0){
            return res.status(400).send({
                message : "Book is not available"
            })
        }
        let newAvailableQty = book.availableQty-1;
        await Book.updateOne({bookId : body.bookId}, {availableQty : newAvailableQty})
        let user = await User.findOne({userId : body.userId})
        if(!user){
            return res.status(400).send({
                message : "Error while finding User"
            })
        }
        const borrowArray = user.borrowedBooks;
        borrowArray.push(book)
        await User.updateOne({userId : body.userId},{borrowedBooks : borrowArray})
        const newTransData = {
            user : user,
            book : book,
        }
        if(body.borrowedDate){
            newTransData.borrowedDate = body.borrowedDate;
        }
        const createdTrans = await Transaction.create(newTransData)
        if(!createdTrans){
            return res.status(400).send({
                message : "Error while creating transaction"
            })
        }
        return res.status(200).send({
            message : "Transaction successful"
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal error while making transaction"
            
        })
    }
}
const getAllorrowersController = async(req,res)=>{
    try{
        let allTransactions = await Transaction.find()
        let transactionArray = [];
        let data = {};
        for(let i = 0;i < allTransactions.length;i++){
            let book = await Book.findById(allTransactions[i].book);
            let user = await User.findById(allTransactions[i].user);
            if(user && book){
                data = {
                    userName : user.name,
                    userId : user.userId,
                    email : user.email,
                    mobileNo : user.mobileNo,
                    bookName : book.name,
                    bookId : book.bookId,
                    availableQty : book.availableQty,
                    borrowDate : allTransactions[i].borrowedDate
                }
                transactionArray.push(data)
            }
        }
        return res.status(200).send(transactionArray)
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message : "Internal error occured while fetching borrowers details"
        })
    }
}
const getTransactionInfo = async(req,res) => {
    const userId = req.query.userId
    const bookId = req.query.bookId
    try{
        const user = await User.findOne({userId : userId});
        const book = await Book.findOne({bookId : bookId});
        if(!user){
            return res.status(404).send({
                message : "User not found"
            })
        }
        if(!book){
            return res.status(404).send({
                message : "Book not found"
            })
        }
        const user_id = user._id;
        const book_id = book._id;
        const transaction = await Transaction.findOne({user : user_id, book : book_id})
        if(!transaction){
            return res.status(404).send({
                message : "User didn't borrow this book"
            })
        }
        const borrowDate = new Date(transaction.borrowedDate);
        let returnDate = '';
        if(req.query.returnDate){  
            returnDate = new Date(req.query.returnDate)
            if(returnDate > Date.now()){
                return res.status(400).send({
                    message : "You have entered a futere return date"
                })
            }
        }else{
            returnDate = new Date(Date.now());
        }
        const formattedReturnDate = (returnDate.toISOString().split("T")[0])
        const timeInMS = returnDate - borrowDate;
        if(timeInMS < 0){
            return res.status(400).send({
                message : "Return date should be greater than the borrow date"
            })
        }
        const timeInDays = Math.floor(timeInMS / (1000 * 60 * 60 * 24))
        return res.status(200).send({
            userName : user.name,
            bookName : book.name,
            borrowDate : transaction.borrowedDate,
            returnDate : formattedReturnDate,
            days : timeInDays,
            price : book.price
        })
        
    }catch(err){
        return res.status(500).send({
            message : "Internal error occured"
        })
    }
}

const deleteTransactionController = async(req,res) =>{
    const userId = req.query.userId
    const bookId = req.query.bookId
    const user = await User.findOne({userId : userId})
    const book = await Book.findOne({bookId : bookId})
    if(book.availableQty >= book.totalQty){
        return res.status(400).send({
            message : "The book is not borrowed from here"
        })
    }
    try{
        const newAvailableQty = book.availableQty+1;
        await Book.updateOne({bookId : bookId},{availableQty : newAvailableQty}); 
        const transaction = await Transaction.deleteOne({user : user._id, book : book._id})
        if(!transaction){
            return res.status(400).send({
                message : "The transaction can't be done"
            })
        }
        await User.findByIdAndUpdate(user._id,{ $pull: { borrowedBooks: book._id }},{new:true})
        return res.status(200).send({
            message : "Transaction Successful"
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal error occured while removing transaction"
        })
    }
}
export {addTransactionController,deleteTransactionController, getTransactionInfo,getAllorrowersController};