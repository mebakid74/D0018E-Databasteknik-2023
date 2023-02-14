// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend

module.exports = { setPost: function(app, db) {

    // POST request to confirm an order
    app.post("/setorder", (req, res) => {
        // create receipt;

        // insert; final query
        db.query(
            `INSERT INTO Receipts (users_id, orderdate, orderstatus) VALUES (?, NOW(), "Pending");
            INSERT INTO Receiptitems 
            SELECT receipts.id, carts.products_id, carts.amount FROM Receipts
            INNER JOIN Carts ON Carts.users_id = Receipts.users_id;
            DELETE FROM Carts WHERE Users_id = ?;`, 
            [req.body.uid, req.body.uid],
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        confirmed: true,
                        error: "No error"
                    });
                }
        });
    });

    // POST request att order to cart
    app.post("/addproduct", (req, res) => {
        db.query(
            "INSERT INTO Carts VALUES (?, ?, ?);", 
            [req.body.pid, req.body.uid, req.body.amount], 
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        confirmed: true,
                        error: "No error"
                    });
                }
        });
    });

    // handle login / registration
    app.post("/login", (req, res) => {
        
    });
}}