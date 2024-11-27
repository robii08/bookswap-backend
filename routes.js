const express = require('express')
const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')
const jwt=require('./middleware/jwtMiddleware')
const multer = require('./middleware/multerMiddleware')
const router = new express.Router()

router.post("/register", userController.registerController)

router.post('/login',userController.loginController)

router.post('/add-book',jwt,multer.single("bookImg"),bookController.addBooksController)

router.get('/all-books',bookController.getAllBooksController)

router.get('/home-books',bookController.getHomeBookController)

router.get('/user-books',jwt,bookController.getUserBooksController)

router.delete('/delete-userbooks/:id',bookController.deleteUserBooksController)

router.get('/view-book/:id',bookController.getABookController)

router.put('/edit-project/:id',jwt,multer.single("bookImg"),bookController.updateBookController)




module.exports = router