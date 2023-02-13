// register POST routes for pages that dont require specialized data

module.exports = { setPost: function(app, db) {

    // POST request to handle product pages
    app.post("/getproduct", (req, res) => {
        db.query(
            "SELECT category_id, quantity, price, color, size FROM mydb.products WHERE products.id = ?;", 
            [req.body.pid], 
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(sqlres);
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sqlres);
                 }
        });
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
}}