////////////////////////////////////////////////////////
// MOVE TO MODULE FILE LATER
function getProduct() {
    console.warn("getProduct not implemented");
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// setup
const express = require ("express");
const app = express ();
const mysql =require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"6%guUk!4muBk^B",
    database: "employeesystem",
});

// test (OLD)
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values are correctly inserted");
            }
        }
    );
});

// start
const port = 3001;
app.listen(port, () => {
    getProduct();
    console.log(`Server is running on port ${port}`);
});

