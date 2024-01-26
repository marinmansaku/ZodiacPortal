const express = require("express");
const cors = require("cors");
var cookies = require("cookie-parser");
const fs = require('fs');
var dbf = require('dbf-reader');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const app = express();
require("dotenv").config({ path: "./config.env" });
const port = 3001;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookies());

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

app.use(require("./routes/user.js"));
app.use(require("./routes/authRoutes.js"));
app.use(require("./routes/alloyRoutes.js"));

app.use(express.urlencoded({ extended: true }));


const uploadTest = (req,res) => {
  fs.readFile(req.file.path, function(err, data) {
    var datatable = dbf.Dbf.read(data);
    res.json(datatable.rows.pop());
  });
}

app.post("/api/alloy/getJSON", upload.single('file'), uploadTest);
// app.post('/api/alloy/getJSON', uploadFiles);

function uploadFiles(req, res) {
  const file = req.body;

  fs.writeFile('uploads.txt', Buffer.from(file), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  // fs.readFile('uploads/ANALYSIS.DBF', function(err, data) {
  //     var datatable = dbf.Dbf.read(data);
  //     console.log(datatable);
  //     // const split = data.toString('ascii').split(' ');
  //     // const newSplit = [];
  //     // split.forEach((sp) => {
  //     //   if(sp){
  //     //     newSplit.push(sp);
  //     //   }
  //     // })
  //     // console.log(newSplit.slice(-27));
  //   }
  // );
  res.json(req.body);
}
