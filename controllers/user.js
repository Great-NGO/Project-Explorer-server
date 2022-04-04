require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { userSignupValidator, validate } = require('../services/validation');


router.post('/signup', userSignupValidator(), validate, async(req, res) => {

    try {
        console.log("CHECKKKK");
        console.log(req.body);
        const { firstname, lastname, email, password, program, matricNumber, graduationYear } = req.body;
        
        //Validate input    //Already have a middleware handling validation
        // if(!(firstname && lastname && email && password && matricNumber && program && graduationYear)) {
        //     res.status(400).json({error:"All input is required"})
        // }

        //Check if User exists
        const userExists = await User.findOne({email})

        //If user exists send error message
        if(userExists) {
           return res.status(400).json({errors: ["User with specified email already exists. Please Login!"] })
        }

        //Encrypt Password
        const encryptedPassword = await bcrypt.hash(password, 10)
        console.log("The encrypted password", encryptedPassword)

        //Create a new User in our database
        let user = new User({
            firstname,
            lastname,
            email,
            matricNumber,
            program,
            graduationYear,
            password:encryptedPassword
        })

        
        //Create a token
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])  e.g // const token = jwt.sign({ user_id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h'})

        const token = jwt.sign({ user_id: user._id}, process.env.JWT_SECRET)

        user.token = token;

        console.log(`The User is ${user}`)

        await user.save();

        // const { firstname, lastname, program, email, matricNumber, graduationYear } = user
        user ={
            firstname, lastname, program, email, matricNumber, graduationYear
        }

        res.status(200).json({ message: "User Signup successful! Please login", user, status:"Signup OK"});

    } catch (error) {
        console.log(error)
    }

})

router.post('/login', async(req, res) => {
    //Login logic

    try {
        console.log("LOGINNN");
        console.log(req.body);
        const {email, password } = req.body;

        //Validate User input
        if(!(email && password)) {
            res.status(400).json({error:"Please login with valid email and password"})
        }

        //Check if user exists in our database
        const userExists = await User.findOne({ email})

        if (userExists && (await bcrypt.compare(password, userExists.password))) {
            //Create token
            const token = jwt.sign({user_id: userExists._id}, process.env.JWT_SECRET);

            //Save user token
            userExists.token = token;

            //Save token in a cookie and send back cookie to the client
            res.cookie('authToken', token, {
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000*60*60*24, //Cookie expires after 24hours of being logged in.. 1000 milliseconds * 60seconds * 60minutes *24 hours 
                httpOnly: true
            })
    
            const { _id, firstname, lastname, program, email, matricNumber, graduationYear, profilePicture } = userExists

            //To send back info to
            let user ={
                _id, firstname, lastname, program, email, matricNumber, graduationYear, profilePicture
            }
    
            // console.log(`The Logged in User ${userExists}`)
            console.log(`The Logged in User user:`, user)

            //User
            res.status(200).json({message: "User log in successful!", user, status: "Login OK"})

        }
        else {
            res.status(400).json({error: "Incorrect email/password"});

        }


    } catch (error) {
        console.log(error);
    }

})

module.exports = router;