
const mongoose = require('mongoose')

const connectionstring = process.env.DATABASE
mongoose.connect(connectionstring).then(()=>{
    console.log('mongoDB connected successfully');    
}).catch((err)=>{
    console.log(`connection failed due to ${err}`);    
})