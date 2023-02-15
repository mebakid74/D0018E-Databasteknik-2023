// register POST routes for pages that dont require specialized data
const { routes } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.get_product_page_info, (req, res) => {
        db.query(
            "SELECT name, imagepath, quantity, price, color, size FROM Products WHERE products.id = ?;", 
            [req.body.pid], 
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sqlres[0]);
                }
            }
        );
    });

    // collections not implemented in db yet
    app.post(routes.get_collection_id_list), (req, res) => {
        const cid = req.body.cid;
        res.json({
            prodIds: [
                24,
                225,
                189
            ] 
        });
    };
}}