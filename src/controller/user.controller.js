const bcrypt = require("bcrypt")

const user = require('../model/user.model')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (req, res, next) => {
    console.log(req.body);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        const userData = new user ({
            email: req.body.email,
            password: hashPassword,
        });
        
        const data = await userData.save();
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

//login

const login =  async (req, res) => {
    // console.log(process.env.JWT_KEY);
    try{
        const userFound = await user.findOne({email: req.body.email});
        console.log('user', userFound)
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, userFound.password);
        console.log(req.body.password);
        console.log('pass:', userFound.password)
        !validPassword && res.status(400).json("Wrong password");
        const token = jwt.sign({
            email:userFound.email
        },
        process.env.JWT_KEY
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600*24
        });
    } catch (err){
       console.log('error:', err)  
       res.status(500).json(err)
    }    
}
 function verifyToken(){
     const tokenReceived = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW40MDdAZ21haWwuY29tIiwiaWF0IjoxNjQ2NzU2OTQxfQ.3OE4D37q2KWjVDmnxZmk9LqiQaVu1qPbqsGDYS0yywQ";
     var decoded = jwt.verify(tokenReceived, process.env.JWT_KEY);
     console.log(decoded);
 }
verifyToken();
module.exports = { createUser, login}