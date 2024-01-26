const express = require('express')
const alloyCtrl = require('../controllers/alloyController')
const alloyRoutes = express()

alloyRoutes.post('/api/alloy/add' ,alloyCtrl.addAlloy);
alloyRoutes.get('/api/alloy/getAll' , alloyCtrl.getAlloys);
// alloyRoutes.post('/api/alloy/getJson' , alloyCtrl.getJson);

module.exports = alloyRoutes


