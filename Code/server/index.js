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

// js disabled fix (doesnt seem to work rn)
// https://www.upbeatcode.com/react/solved-you-need-to-enable-javascript-to-run-this-app/
app.use(express.static(__dirname));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// start
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

