// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend

module.exports = { setPost: function(app, db) {

    // POST request to confirm an order
    app.post("/setorder", (req, res) => {
        const uid = req.body.uid;
        res.json({
            confirmed: true,
            error: "No error"
        });
    });

    // POST request att order to cart
    app.post("/addproduct", (req, res) => {
        db.query(
            "INSERT INTO Cart VALUES (?, ?, ?);", 
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