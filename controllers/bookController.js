const books = require('../models/booksModel')

exports.addBooksController = async(req,res) =>{ 

    const userId=req.payload
    

    const {title, authors,price, language, genre, description} = req.body

    const bookImg = req.file.filename   
    
                          

    try {
        const existingBook = await books.findOne({title})
        if(existingBook){
            res.status(406).json('Book already exist')
        }
        else{
            const newBook = new books({
                title, 
                authors,
                price, 
                language, 
                genre, 
                description,
                bookImg,
                userId
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
        
    } catch (error) {
        res.status(401).json(error) 
    }   
}

exports.getAllBooksController = async(req,res) =>{

    const searchKey = req.query.search
    
    const query= {
        genre:{
            //i removes case sensitivity
            $regex:searchKey,$options:"i"
        }
    }
    try {
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getHomeBookController = async(req,res) =>{
    try {
        const homeBooks = await books.find().limit(3)
        res.status(200).json(homeBooks)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getUserBooksController = async(req,res) =>{
    const userId = req.payload
    try {
        const userBooks = await books.find({userId})
        res.status(200).json(userBooks)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteUserBooksController=async(req,res)=>{
    const {id} = req.params
    
    try {
        const item = await books.findByIdAndDelete({_id:id})
        res.status(200).json("deleted successfully")
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.getABookController = async(req,res)=>{
    const {id} = req.params
    
    try {
        const book = await books.findOne({_id:id})
        res.status(200).json(book)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.updateBookController= async(req,res)=>{
    const {title, authors,price, language, genre, description,bookImg} = req.body
    const bookImage = req.file?req.file.filename:bookImg
    console.log(bookImage);
    const {id} = req.params
    console.log(id);
    try {
        const existingBook= await books.findByIdAndUpdate({_id:id},{
            title, 
            authors,
            price, 
            language, 
            genre, 
            description,
            bookImg:bookImage,
        },{new:true})
        await existingBook.save()
        res.status(200).json(existingBook)
    } catch (error) {
        res.status(401).json(error)
    }  
}