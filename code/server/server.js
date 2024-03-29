// express
const express = require ("express");
const app = express();
app.use(express.json());

// CORS
const cors = require("cors");
app.use(cors());

// mysql
const mysql = require("mysql");
const sqlconfig = require("./sqlconfig.json");
const db = mysql.createConnection(sqlconfig);

// security
const bcrypt = require("bcryptjs");
const creds = require("./tools/credentialmanager");

// initialize routes
const userroutes = require("./routes/userroutes");
const stdroutes = require("./routes/stdroutes");
const useractionroutes = require("./routes/useractionroutes");
const adminroutes = require("./routes/adminroutes");
userroutes.setPost(app, db, bcrypt, creds);
stdroutes.setPost(app, db);
useractionroutes.setPost(app, db, bcrypt, creds);
adminroutes.setPost(app, db, creds);

// start listening
const port = 3001;
app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});