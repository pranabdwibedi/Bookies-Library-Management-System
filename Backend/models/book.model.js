import mongoose from 'mongoose'


const bookSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    author : {
        type : [String],
        required : true,
    },
    language : {
        type : String,
        required : true,
        enum : ["ENGLISH","HINDI","ODIA"]
    },
    bookId : {
        type : Number,
        required : true,
        unique : true,
        immutable : true
    },
    edition : {
        type : Number,
        default : 1
    },
    bookType : {
        type : String,
        required : true,
        enum : ["INVESTMENT", "SELF-HELP","NOVEL", "SCIENCE", "MATH", "STORY", "POETRY", "HISTORY", "RELIGIOUS"]
    },
    bookDesc : {
        type : String,
        required : true
    },
    publishYear :{
        type : Number,
    },
    totalQty : {
        type : Number,
        required : true,
        default : 0
    },
    availableQty : {
        type : Number,
        default : 0,
    }
},{versionKey:false,timestamps:true})

const Book = mongoose.model("Book",bookSchema)
export default Book