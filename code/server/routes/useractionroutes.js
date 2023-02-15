// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend
const { routes, errcode, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db, bcrypt) {

    app.post(routes.order_products_from_cart, (req, res) => {
        db.query(
            `INSERT INTO Receipts (users_id, orderdate, orderstatus) VALUES (?, CURDATE(), "Pending");
            INSERT INTO Receiptitems SELECT receipts.id, carts.products_id, carts.amount FROM Receipts
            INNER JOIN Carts ON Carts.users_id = Receipts.users_id;
            DELETE FROM Carts WHERE Users_id = ?;`, 
            [req.body.uid, req.body.uid],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError(errcode.failed_move_cart_to_order, err));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        );
    });

    app.post(routes.add_product_to_database, (req, res) => {
        db.query(
            "INSERT INTO Carts VALUES (?, ?, ?);", 
            [req.body.pid, req.body.uid, req.body.amount], 
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        confirmed: true,
                        error: "No error"
                    });
                }
            }
        );
    });

    app.post(routes.validate_login_details, (req, res) => {
        db.query(
            "SELECT users.id, password FROM Users WHERE email=?",
            [req.body.email],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    var ret = { uid: sqlres[0]["id"] };
                    if (bcrypt.compareSync(req.body.password, sqlres[0]["password"])) {
                        ret["valid"] = true;
                        ret["validationToken"] = "asd123";
                    }
                    else {
                        ret["valid"] = false;
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(ret));
                }
            }
        )
    });

    app.post(routes.register_new_user, (req, res) => {
        let b = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(b.password, salt);
        db.query(
            `INSERT INTO Users (fname, lname, email, phonenumber, address, Users.password, DateJoined, registered) 
            VALUES (?, ?, ?, ?, ?, ?, CURDATE(), 1);`,
            [b.fname, b.lname, b.email, b.phonenumber, b.address, hashedPassword],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        confirmed: true,
                        error: "No error"
                    });
                }
            }
        )
    });

    app.post(routes.increment_product_in_cart, (req, res) => {
        db.query(
            "SELECT quantity FROM Products WHERE Products.id = ?;",
            [req.body.pid],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    var n = sqlres[0]["quantity"];
                    var inc = req.body.increment;
                    if (n - inc <= 0) {
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            confirmed: false,
                            error: "Not enough items to increment"
                        });
                    }
                    else {
                        db.query(
                            `UPDATE Products SET quantity = quantity-1 WHERE Products.id = ?;
                            UPDATE Carts SET amount = amount+1 WHERE users_id=? AND products_id=?;`, 
                            [req.body.pid, req.body.uid, req.body.pid],
                            (err, sqlres) => {
                                if (err) { console.log(err);
                                } else {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({
                                        confirmed: true,
                                        error: "No error"
                                    });
                                }
                            }
                        );
                    }
                }
            }
        );
    });
}}