// register POST routes for pages that dont require specialized data

module.exports = { setPost: function(app, db) {

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