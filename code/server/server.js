const sqlconfig = require("./sqlconfig.json");
const express = require ("express");
const app = express ();
const mysql =require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(sqlconfig);

// POST request to handle personal account
app.post("/getaccount", (req, res) => {
    db.query(
        "SELECT c.fname, c.lname, c.email, c.phonenumber, c.address FROM Customer as c WHERE c.id = ?;",
        [req.body.uid],
        (err, sqlres) => {
            if (err) {
                console.log(err);
            } else {
                res.setHeader('Content-Type', 'application/json');
                console.log(sqlres);
                res.json(sqlres[0]);
            }
        }
    );

    /*res.json({
        fname: "John",
        lname: "Doe",
        email: "johndoe213@somedomain.xyz",
        addr: "Somestreet 26",
        phone: "+46xxxxxxxxx",
    });*/
});

// POST request to handle collections
app.post("/getcoll", (req, res) => {
    const cid = req.body.cid;
    res.json({
        prodIds: [
            24,
            225,
            189
        ] 
    });
});

// POST request to handle cart details
app.post("/getcart", (req, res) => {
    const uid = req.body.uid;
    res.json({
        cart: [
            {"pid": 22, "amount": 2},
            {"pid": 445, "amount": 1}
        ]
    });
});

// POST request to confirm an order
app.post("/setorder", (req, res) => {
    const uid = req.body.uid;
    res.json({
        confirmed: true,
        error: "No error"
    });
});

// POST request to handle product pages
app.post("/getproduct", (req, res) => {
    const pid = req.body.pid;
    res.json({
        name: `prod-with-id ${pid}`,
        img:`img/prods/${pid}`,
        desc: "temporary test description",
        quantity: 123,
        reviews: [
            {score:1, text: "not a good product"},
            {score:5, text: "very good product"}
        ]
    });
});


// start listening
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});