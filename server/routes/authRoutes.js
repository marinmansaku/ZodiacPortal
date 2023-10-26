const express = require('express')
const authCtrl = require('../controllers/authController')
const authRoutes = express()
// const { verifyJWT } = require('../middleware/verifyJWT')

authRoutes.post('/api/user/login' ,authCtrl.loginUser);
authRoutes.get('/api/user/refresh', authCtrl.refreshToken);
authRoutes.post('/api/user/logout', authCtrl.logoutUser);

module.exports = authRoutes


