// register POST routes for pages that don't require specialized data
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { isValidId } = require("../tools/parsing")


module.exports = { setPost: function(app, db) {

    app.post(routes.get_product_page_info, (req, res) => {
        var pid = req.body.pid;
        if (!isValidId(pid)) { res.json(constructError("Cannot get product", "ID is not in a valid format")) }

        db.query(
            "SELECT name, imagepath, description, quantity, price FROM Products WHERE products.id = ?;", 
            [pid], 
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    db.query(
                        `SELECT Reviews.id, Users.fname, Users.lname, Reviews.rating, Reviews.text, Reviews.date FROM Products
                        INNER JOIN Reviews ON Reviews.products_id = Products.id INNER JOIN Users ON Users.id = Reviews.users_id WHERE Products.id = ?;`, 
                        [pid],
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
            "SELECT id, name, imagepath, quantity FROM Products;",
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
        var input = {};
        input.cid = parsing.parseNumber(req.body.cid);
        res.json(constructSuccess({
            prodIds: [ 24, 225, 189 ] 
        }));
    };
}}