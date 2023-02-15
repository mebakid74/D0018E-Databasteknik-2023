const express = require ("express");
const app = express ();
app.use(express.json());

const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

const mysql = require("mysql");
const sqlconfig = require("./sqlconfig.json");
const db = mysql.createConnection(sqlconfig);

const bcrypt = require("bcryptjs");

const { routes } = require("../client/src/constants");
console.log(routes.add_product_to_database);

// initialize routes
const userroutes = require("./routes/userroutes");
const stdroutes = require("./routes/stdroutes");
const useractionroutes = require("./routes/useractionroutes");
userroutes.setPost(app, db);
stdroutes.setPost(app, db);
useractionroutes.setPost(app, db, bcrypt);

// start listening
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});