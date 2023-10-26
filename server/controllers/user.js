const express = require("express");
const dbo = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const { ClientRequest } = require("http");


// Convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

createUser = async (request, response) => {
    /**
     * 0. Check the inputs are valid (Done)
     * 1. Check the inputs are secure for the database (ToDo)
     * 2. Check if a user with the specified details already exists
     * 3. Send phone number verification
     *  
     */

    let userDetails = request.body;
    userDetails.verified = false;
    const validRegistration = validateRegistration(userDetails);
    if(validRegistration){
        let db_connect = dbo.getDb();
        const databaseUser = await db_connect.collection("users").findOne({email: userDetails.email});
        if(databaseUser){
            return response.status(409).send("A user with this email already exists!");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userDetails.password, salt);
        userDetails.password = hashPassword;
        delete userDetails.confirmPassword;
        const user = await db_connect.collection("users").insertOne(userDetails);
        const token = crypto.randomBytes(32).toString("hex");

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        await db_connect.collection("tokens").insertOne({
            userId: user.insertedId,
            token: token,
            date: today
        });
        const url = `${process.env.BASE_URL}users/${user.insertedId}/verify/${token}`;
        await sendEmail(userDetails.email, "Verify Email", url);
        
        response.status(201).send("A verification email has been sent to your email!");
    }else{
        response.status(200).send("Invalid inputs!");
    }
}

const openProfile = async (req,res) => {
    res.status(200).send("Profile open");
}

const verifyUser = async (request, response) => {
    try{
        const userId = request.params.id;
        const verificationCode = request.params.verificationCode;
        let db_connect = dbo.getDb();
        const tokenEntry = await db_connect.collection("tokens").findOne({userId: new ObjectId(userId)});
        if(!tokenEntry) {
            console.log("Redirect");
            // redirect to home page
        }
        if(tokenEntry.token == verificationCode){
            await db_connect.collection("users").updateOne({_id: new ObjectId(userId)}, {$set: {verified: true}});
            await db_connect.collection("tokens").deleteOne({userId: new ObjectId(userId)});
            // redirect to success page
        }else{
            console.log("Redirect");
            // redirect to home page
        }
    }catch(err){
        // Redirect to home page
    }
}

validateRegistration = (user) => {
    const {name,email,password,confirmPassword} = user;
    if(!name || name.length<3 || name.length>30){
        return false // Correct
    }
    if(!validateEmail(user.email)) {
        return false
    }
    if(!validatePassword(user.password, user.confirmPassword)) {
        return false
    }
    return true
    /**
     * 0. User.name is not empty
     * 1. User.name.length < x
     * 2. Phone number is valid
     * 3. Email is empty or valid
     * 4. Password meets criteria (TBD)
     * 5. Passwords match 
     */
}

// validatePhone = (phone) => {
//     var regex = /^(((067|068|069)\d{7}))$/; // Albanian phone number 
//     if(!regex.test(phone)){
//         return false;
//     }
//     return true;
// }

// validateEmail = (email) => {
//     var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if(!regex.test(email) && email){
//         return false;
//     }
//     return true;
// }

validatePassword = (password, confirmPassword) => {
    if(password.length<8 || password!==confirmPassword){
        return false;
    }
    return true;
}

// standardisePhone = (phone) => {
//     // Possible templates: 682189112 || 0682189112 => +355682189112
//     if(phone.length == 9){
//         return "0".concat(phone);
//     }
//     return phone;
//  }

module.exports = {
    createUser,
    verifyUser,
    openProfile
}