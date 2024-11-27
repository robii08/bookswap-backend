const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    }, 
    authors:{
        required:true,
        type:String
    }, 
    price:{
        required:true,
        type:String
    }, 
    language:{
        required:true,
        type:String
    },
    genre:{
        required:true,
        type:String
    },  
    description:{
        required:true,
        type:String
    },
    bookImg:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    }
})



const books = mongoose.model("books", bookSchema)

module.exports = books