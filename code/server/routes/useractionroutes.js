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
        const uid = req.body.uid;
        res.json({
            confirmed: true,
            error: "No error"
        });
    });

}}