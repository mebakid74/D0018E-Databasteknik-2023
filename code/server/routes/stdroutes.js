// register POST routes for pages that don't require specialized data
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { isValidId } = require("../tools/parsing")


module.exports = { setPost: function(app, db) {

    app.post(routes.get_product_page_info, (req, res) => {
        var pid = req.body.pid;
        if (!isValidId(pid)) { res.json(constructError("Cannot get product", "ID is not in a valid format")); }

        db.query(
            "SELECT name, imagepath, description, quantity, price FROM Products WHERE products.id = ?;", 
            [pid], 
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                    res.json(constructError("Cannot get product", "SQL error; please contact server admin"));
                } else {
                    db.query(
                        `SELECT Reviews.id, Users.fname, Users.lname, Reviews.rating, Reviews.text, Reviews.date FROM Products
                        INNER JOIN Reviews ON Reviews.products_id = Products.id INNER JOIN Users ON Users.id = Reviews.users_id WHERE Products.id = ?;`, 
                        [pid],
                        (err2, sqlres2) => {
                            if (err2) {
                                console.log(err2);
                                res.json(constructError("Cannot create user", "SQL error; please contact server admin"));
                            }
                            else {
                                var retData;
                                if (sqlres.length > 0) {
                                    retData = constructSuccess({...sqlres[0], reviews: sqlres2});
                                    
                                } else {
                                    retData = constructError("invalid_product_id", "Length of return list from db was 0");
                                }
                                res.setHeader('Content-Type', 'application/json');
                                res.json(retData);
                            }
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
        var collection = req.body.collection;
        var page = req.body.page;

        if (-1 > 0) {
            query += " where Products.id in (SELECT products_id from productfilters where '1'='1' "
            filters.forEach(e => {
                query += " and " + e["filter"] + "=" + e["filteval"];
            });
            query += ")"
        }

        if (-1 > 0) {
            query += ""
        }

        db.query(
            "SELECT id, name, imagepath, price, quantity FROM Products;",
            [],
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                    res.json(constructError("Cannot get products", "SQL error; please contact server admin"));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres));
                }
            }
        );
    });

    app.post(routes.get_collection_list, (req, res) => {
        db.query(
            "SELECT id, name, description FROM Collections;",
            [],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot get collection", "SQL error; please contact server admin"));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres));
                }
            }
        );
    });
}}