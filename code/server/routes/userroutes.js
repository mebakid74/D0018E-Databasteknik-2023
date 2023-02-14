// register POST requests for returning user data / pages

module.exports = {  setPost: function(app, db) {
    
    // POST request to handle personal account
    app.post("/getaccount", (req, res) => {
        db.query(
            "SELECT fname, lname, email, phonenumber, address FROM Users WHERE Users.id = ?;",
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
        db.query(
            "SELECT products_id, amount FROM Carts WHERE users_id = ?;", 
            [req.body.uid], 
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sqlres);
                 }

        }); 
    });
}}