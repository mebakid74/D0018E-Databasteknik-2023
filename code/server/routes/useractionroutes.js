// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { getUidFromToken } = require("../tools/credentialmanager");
const { isValidId } = require("../tools/parsing");
const b = require("mysql/lib/ConnectionConfig");


module.exports = { setPost: function(app, db, bcrypt, creds) {

    app.post(routes.order_products_from_cart, (req, res) => {
        var uid = req.body.uid;
        if (!isValidId(uid)) { res.json(constructError("Cannot get product lists from cart", "ID is not in a valid format")) }

        db.query(
            `INSERT INTO Receipts (users_id, orderdate, orderstatus) VALUES (?, CURDATE(), "Pending");
            INSERT INTO Receiptitems SELECT receipts.id, carts.products_id, carts.amount FROM Receipts
            INNER JOIN Carts ON Carts.users_id = Receipts.users_id;
            DELETE FROM Carts WHERE Users_id = ?;`, 
            [uid, uid],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Error when placing order", err));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        );
    });

    app.post(routes.add_product_to_cart, (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;
        var amount = req.body.amount;

        db.query(
            "INSERT INTO Carts VALUES (?, ?, ?);", 
            [pid, uid, amount], 
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        );
    });

    app.post(routes.register_new_user, (req, res) => {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var phone = req.body.phonenumber;
        var addr = req.body.address;

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(b.password, salt);
        db.query(
            `INSERT INTO Users (fname, lname, email, phonenumber, address, Users.password, DatetimeJoined, registered) 
            VALUES (?, ?, ?, ?, ?, ?, NOW(), 1);`,
            [fname, lname, email, phone, addr, hashedPassword],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess({}));
                }
            }
        )
    });

    app.post(routes.increment_product_in_cart, (req, res) => {
        var pid = req.body.pid;
        var uid = req.body.uid;

        db.query(
            "SELECT quantity FROM Products WHERE Products.id = ?;",
            [pid],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    var n = sqlres[0]["quantity"];
                    var inc = req.body.increment;
                    if (n - inc <= 0) {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructError("Could not add product to cart", "Not enought items in cart to increment."));
                    }
                    else {
                        db.query(
                            `UPDATE Products SET quantity = quantity-1 WHERE Products.id = ?;
                            UPDATE Carts SET amount = amount+1 WHERE users_id=? AND products_id=?;`, 
                            [pid, uid, pid],
                            (err2, sqlres2) => {
                                if (err2) { console.log(err2);
                                } else {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(constructSuccess());
                                }
                            }
                        );
                    }
                }
            }
        );
    });

    app.post(routes.add_product_review, (req, res) => {
        var uid = req.body.uid;
        var pid = req.body.pid;
        var rating = req.body.rating;
        var text = req.body.text;

        db.query(
            `INSERT INTO Reviews(users_id, products_id, rating, text, date) VALUES (?, ?, ?, ?, CURDATE());`, 
            [uid, pid, rating, text], 
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        )
    });
}}