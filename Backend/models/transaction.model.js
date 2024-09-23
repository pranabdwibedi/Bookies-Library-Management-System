import mongoose from 'mongoose'
import userModel from './user.model.js'
import bookModel from './book.model.js'
const transactionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : userModel
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : bookModel
    }
},{versionKey : false, timestamps : true})