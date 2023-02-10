const sqlconfig = require("./sqlconfig.json");
const express = require ("express");
const app = express ();
const mysql =require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(sqlconfig);

// initialize routes
const userroutes = require("./routes/userroutes");
const stdroutes = require("./routes/stdroutes");
const useractionroutes = require("./routes/useractionroutes");
userroutes.setPost(app, db);
stdroutes.setPost(app, db);
useractionroutes.setPost(app, db);

// start listening
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});