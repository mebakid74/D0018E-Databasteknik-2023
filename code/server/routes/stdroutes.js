// register POST routes for pages that don't require specialized data
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.get_product_page_info, (req, res) => {
        db.query(
            "SELECT name, imagepath, description, quantity, price, color, size FROM Products WHERE products.id = ?;", 
            [req.body.pid], 
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    db.query(
                        `SELECT Reviews.id, Users.fname, Users.lname, Reviews.rating, Reviews.text, Reviews.date FROM Products
                        INNER JOIN Reviews ON Reviews.products_id = Products.id INNER JOIN Users ON Users.id = Reviews.users_id WHERE Products.id = ?;`, 
                        [req.body.pid],
                        (err2, sqlres2) => {
                            var retData;
                            if (sqlres.length > 0) {
                                retData = constructSuccess({...sqlres[0], reviews: sqlres2});
                                
                            } else {
                                retData = constructError("invalid_product_id", "Length of return list from db was 0");
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.json(retData);
                        }
                    )

                }
            }
        );
    });

    app.post(routes.get_filtered_product_list, (req, res) => {
        var query = "";
        var filters = req.body.filters;
        var sortmode = req.body.sortmode;
        var collections = req.body.collections;

        if (filters.length > 0) {
            query += " where Products.id in (SELECT products_id from productfilters where '1'='1' "
            filters.forEach(e => {
                query += " and " + e["filter"] + "=" + e["filteval"];
            });
            query += ")"
        }

        if (collections.length > 0) {
            query += ""
        }

        db.query(
            "SELECT id, name, imagepath, quantity FROM Products" + query + ";",
            [],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres));
                }
            }
        );
    });

    // collections not implemented in db yet
    app.post(routes.get_collection_id_list), (req, res) => {
        const cid = req.body.cid;
        res.json(constructSuccess({
            prodIds: [ 24, 225, 189 ] 
        }));
    };
}}