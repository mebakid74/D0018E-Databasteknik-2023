// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend
const { routes } = require("../../client/src/constants");


module.exports = { setPost: function(app, db, bcrypt) {

    app.post(routes.order_products_from_cart, (req, res) => {
        db.query(
            `INSERT INTO Receipts (users_id, orderdate, orderstatus) VALUES (?, CURDATE(), "Pending");
            INSERT INTO Receiptitems SELECT receipts.id, carts.products_id, carts.amount FROM Receipts
            INNER JOIN Carts ON Carts.users_id = Receipts.users_id;
            DELETE FROM Carts WHERE Users_id = ?;`, 
            [req.body.uid, req.body.uid],
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
    });

    app.post(routes.add_product_to_database, (req, res) => {
        db.query(
            "INSERT INTO Carts VALUES (?, ?, ?);", 
            [req.body.pid, req.body.uid, req.body.amount], 
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
    });

    app.post(routes.validate_login_details, (req, res) => {
        db.query(
            "SELECT users.id, password FROM Users WHERE email=?",
            [req.body.email],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    var ret = {error: "No error", uid: sqlres[0]["id"]};
                    if (bcrypt.compareSync(req.body.password, sqlres[0]["password"])) {
                        ret["valid"] = true;
                        ret["validationToken"] = "asd123";
                    }
                    else {
                        ret["valid"] = false;
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ret);
                }
            }
        )
    });

    app.post(routes.register_new_user, (req, res) => {
        let b = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(b.password, salt);
        db.query(
            `INSERT INTO Users (fname, lname, email, phonenumber, address, Users.password, registered) 
            VALUES (?, ?, ?, ?, ?, ?, 1);`,
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
}}