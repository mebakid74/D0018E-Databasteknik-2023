// register POST requests for paths that allow the user to (or attempt to) make decisions on the backend
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { isValidId, isValidNumber, isValidEmail, isValidPassword, isValidAddress, isValidName } = require("../tools/parsing");


module.exports = { setPost: function(app, db, bcrypt, creds) {

    app.post(routes.order_products_from_cart, (req, res) => {
        var uid = creds.getUidFromToken(req.body.token);
        if (!isValidId(uid)) { res.json(constructError("Cannot get product lists from cart", "ID is not in a valid format")); }

        db.query(
            `INSERT INTO Receipts (users_id, orderdatetime, orderstatus) VALUES (?, CURDATE(), "Pending");
            INSERT INTO Receiptitems SELECT receipts.id, carts.products_id, carts.amount FROM Receipts
            INNER JOIN Carts ON Carts.users_id = Receipts.users_id;
            DELETE FROM Carts WHERE Users_id = ?;`, 
            [uid, uid],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot add order", "SQL error; please contact server admin"));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        );
    });

    app.post(routes.add_product_to_cart, (req, res) => {
        var pid = req.body.pid;
        var amount = req.body.amount;
        var uid = creds.getUidFromToken(req.body.token);
        if (!isValidId(pid)) { res.json(constructError("Cannot add product(s) to cart", "product ID is not in a valid format")); }
        if (!isValidNumber(amount)) { res.json(constructError("Cannot add product(s) to cart", "requested amount is not a number")); }
        if (!isValidId(uid)) { res.json(constructError("Cannot add product(s) to cart", "uid from token is not erlated to a logged in user")); }

        db.query(
            "INSERT INTO Carts VALUES (?, ?, ?);", 
            [pid, uid, amount], 
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot add products(s) to cart", "SQL error; please contact server admin"));
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
        var pass = req.body.password;
        if (!isValidName(fname)) { res.json(constructError("Cannot register new user", "first name is not in a valid format")); }
        if (!isValidName(lname)) { res.json(constructError("Cannot register new user", "last name is not in a valid format")); }
        if (!isValidEmail(email)) { res.json(constructError("Cannot register new user", "email is not in a valid format")); }
        if (!isValidNumber(phone)) { res.json(constructError("Cannot register new user", "phone number is not in a valid format")); }
        if (!isValidAddress(addr)) { res.json(constructError("Cannot register new user", "address is not in a valid format")); }
        if (!isValidPassword(pass)) { res.json(constructError("Cannot register new user", "password is not in a valid format")); }

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(pass, salt);
        db.query(
            `INSERT INTO Users (fname, lname, email, phonenumber, address, Users.password, DatetimeJoined, registered) 
            VALUES (?, ?, ?, ?, ?, ?, NOW(), 1);`,
            [fname, lname, email, phone, addr, hashedPassword],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot create user", "SQL error; please contact server admin"));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        )
    });

    app.post(routes.increment_product_in_cart, (req, res) => {
        var pid = req.body.pid;
        var uid = creds.getUidFromToken(req.uid.token);
        if (!isValidId(pid)) { res.json(constructError("Cannot add product to cart", "product ID is not in a valid format")); }
        if (!isValidId(uid)) { res.json(constructError("Cannot add product to cart", "uid from token is not related to a logged in user")); }

        db.query(
            "SELECT quantity FROM Products WHERE Products.id = ?;",
            [pid],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot get product quantity", "SQL error; please contact server admin"));
                } else {
                    var n = sqlres[0]["quantity"];
                    var inc = req.body.increment;
                    if (n - inc <= 0) {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructError("Cannot add product to cart", "Not enought items in cart to increment."));
                    }
                    else {
                        db.query(
                            `UPDATE Products SET quantity = quantity-1 WHERE Products.id = ?;
                            UPDATE Carts SET amount = amount+1 WHERE users_id=? AND products_id=?;`, 
                            [pid, uid, pid],
                            (err2, sqlres2) => {
                                if (err2) {
                                    console.log(err2);
                                    res.json(constructError("Cannot update cart", "SQL error; please contact server admin"));
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
        var uid = creds.getUidFromToken(req.body.token);
        var pid = req.body.pid;
        var rating = req.body.rating;
        var text = req.body.text;
        if (!isValidId(uid)) { res.json(constructError("Cannot add review", "uid from token is not related to a logged in user")); }
        if (!isValidName(pid)) { res.json(constructError("Cannot add review", "product id is not in a valid format")); }
        if (!isValidRating(rating)) { res.json(constructError("Cannot add review", "rating is not in a valid format")); }
        if (!isValidReviewText(text)) { res.json(constructError("Cannot add review", "text field is not in a valid format")); }

        db.query(
            `INSERT INTO Reviews(users_id, products_id, rating, text, date) VALUES (?, ?, ?, ?, CURDATE());`, 
            [uid, pid, rating, text], 
            (err, sqlres) => {
                if (err) {
                    console.log(err);
                    res.constructError("Cannot add review", "SQL error; please contact server admin") 
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess());
                }
            }
        )
    });
}}