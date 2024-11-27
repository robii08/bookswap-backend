require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require("./routes")
require('./connection')

const bserver = express()
bserver.use(cors())
bserver.use(express.json())
bserver.use(router)
bserver.use('/uploads',express.static('./uploads'))



const PORT = 4000 | process.env.PORT

bserver.listen(PORT,()=>{
    console.log(`server is running successfully at port ${PORT}`);
    
})