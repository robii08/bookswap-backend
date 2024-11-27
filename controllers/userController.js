
const users = require('../models/userModel')
const jwt = require('jsonwebtoken');

exports.registerController = async(req,res) =>{
    console.log('inside controller');
    const {username, email, password} = req.body
    console.log(username,email,password);

    try {
        const existingUser = await users.findOne({email})

        if(existingUser){
            res.status(406).json('Account already exist')

        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
       res.status(401).json(error) 
    }
}

exports.loginController = async(req,res)=>{
    const {email, password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretkey")
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('Account doesnot exist')
        }
    } catch (error) {
        res.status(401).json(error) 
    }
    
}
