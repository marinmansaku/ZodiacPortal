const express = require("express");
const cors = require("cors");
var cookies = require("cookie-parser");

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