const express = require('express')
const userCtrl = require('../controllers/user')
const userRoutes = express()
const {verifyJWT} = require('../middleware/verifyJWT')

// const { userAuth } = require("../middleware/auth.js");

userRoutes.post('/api/user/register', userCtrl.createUser);
userRoutes.get('/users/:id/verify/:verificationCode', userCtrl.verifyUser);
userRoutes.get('/api/user/profile', verifyJWT, userCtrl.openProfile);

module.exports = userRoutes


