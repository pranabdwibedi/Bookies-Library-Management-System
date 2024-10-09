import mongoose from 'mongoose'
import userModel from './user.model.js'
import bookModel from './book.model.js'
const transactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : userModel
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : bookModel
    },
    borrowedDate : {
        type : Date,
        default : Date.now,
        get: (value) => {
            // Convert Date to YYYY-MM-DD format when retrieving
            return value ? value.toISOString().split('T')[0] : null;
          },
          set: (value) => {
            // Ensure the date is stored in ISO format when saving
            return new Date(value);
          }
    }
},{toJSON: { getters: true }, toObject: { getters: true }, versionKey : false, timestamps : true})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;