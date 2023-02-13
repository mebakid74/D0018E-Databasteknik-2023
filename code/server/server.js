const sqlconfig = require("./sqlconfig.json");
const express = require ("express");
const app = express ();
app.use(express.json());

const mysql = require("mysql");
const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

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