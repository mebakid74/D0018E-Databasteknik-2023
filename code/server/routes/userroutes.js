// register POST requests for returning user data / pages
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = {  setPost: function(app, db) {
    
    app.post(routes.get_account_page_info, (req, res) => {
        db.query(
            "SELECT fname, lname, email, phonenumber, address FROM Users WHERE Users.id = ?;",
            [req.body.uid],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres[0]));
                }
            }
        );
    });

    app.post(routes.get_cart_page_info, (req, res) => {
        db.query(
            "SELECT products_id, amount FROM Carts WHERE users_id = ?;", 
            [req.body.uid], 
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres));
                }
            }
        ); 
    });
}}