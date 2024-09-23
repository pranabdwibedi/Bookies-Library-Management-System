import mongoose from 'mongoose'
import bookModel from './book.model.js'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 30
    },
    userId : {
       type : String,
       required : true,
       unique : true,
       lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true
    },
    mobileNo :{
        type : Number,
        unique : true,
        required : true,
        max : 9999999999,
        min : 1000000000
    },
    borrowedBooks : {
        type : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : bookModel
            }
        ],
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["ADMIN", "CUSTOMER"]
    }
},{versionKey : false,timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;