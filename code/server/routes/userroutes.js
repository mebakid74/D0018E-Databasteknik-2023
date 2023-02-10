// register POST requests for returning user data / pages

module.exports = {  setPost: function(app, db) {
    
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
                    res.json(sqlres[0]);
                }
            }
        );
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

}}