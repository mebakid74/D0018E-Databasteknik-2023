// register POST routes for pages that don't require specialized data
const { routes } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.get_product_page_info, (req, res) => {
        db.query(
            "SELECT name, imagepath, description, quantity, price, color, size FROM Products WHERE products.id = ?;", 
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

    app.post(routes.get_filtered_product_list, (req, res) => {
        const sortParse = (v) => {
            return (v==null) ? "*" : v;
        }

        var sortByColor = sortParse(req.body.color);
        var sortBySize = sortParse(req.body.size);

        db.query(
            `SELECT name, imagepath, quantity FROM Products
            WHERE color=? AND size=?`,
            [sortByColor, sortBySize],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sqlres);
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