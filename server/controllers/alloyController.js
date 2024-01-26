const dbo = require("../db/conn");
const asyncHandler = require('express-async-handler');

const ObjectId = require("mongodb").ObjectId;

addAlloy = async (req,res) => {
    let alloy = req.body;
    let db_connect = dbo.getDb();
    db_connect.collection('alloys').insertOne(alloy);
}

getAlloys = async (req,res) => {
    let db_connect = dbo.getDb();
    var alloys = await db_connect.collection('alloys').find({}).toArray();
    return res.json(alloys);
}

getJson = async (req,res) => {
    console.log(req.body);
}

module.exports = {
    addAlloy,
    getAlloys,
    getJson
}
