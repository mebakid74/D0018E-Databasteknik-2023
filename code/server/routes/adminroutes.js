// register POST routes that only an admin should be able to access
const { routes, constructError, constructSuccess } = require("../../client/src/constants");



module.exports = { setPost: function(app, db, creds) {
    const checkAdmin = (req, onDone) => {
        var admin = (creds.getAdminFromToken(req.body.token) === true);
        if (admin) {
            onDone();
        }
    }

    app.post(routes.admin_remove_user, (req, res) => {
        var uid = req.body.uid_to_remove;
        checkAdmin(req, () => {
            db.query(
                `DELETE FROM Users WHERE id=?;`, 
                [uid],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot delete user", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess());
                    }
                }
            );
        });
    });

    app.post(routes.admin_add_product, (req, res) => {
        var cid = req.body.categoryId;
        var name = req.body.name;
        var desc = req.body.desc;
        var image = req.body.image;
        checkAdmin(req, () => {
            db.query(
                `insert into products (categories_id, name, imagepath, description, quantity, price, dateadded, dateremoved) 
                values (?, ?, ?, ?, 0, 0, CURDATE(), NULL);`, 
                [cid, name, image, desc],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot add product", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess(sqlres));
                    }
                }
            );
        });
    });

    app.post(routes.admin_update_user_data, (req, res) => {
        var uid = req.body.uid_to_edit;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var phone = req.body.phone;
        var addr = req.body.address;
        checkAdmin(req, () => {
            db.query(
                `UPDATE Users SET fname=?, lname=?, email=?, phonenumber=?, address=? WHERE id=?;`, 
                [fname, lname, email, phone, addr, uid],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot update user data", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess(sqlres));
                    }
                }
            );
        });
    });

    app.post(routes.admin_view_receipts, (req, res) => {
        var uid = req.body.uid_to_view;
        checkAdmin(req, () => {
            db.query(
                `SELECT * FROM Receiptitems INNER JOIN Receipts ON receipts_id = Receipts.id WHERE users_id = ? ORDER BY receipts_id;`, 
                [uid],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot get receipts", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess(sqlres));
                    }
                }
            );
        });
    });

    app.post(routes.admin_modify_price, (req, res) => {
        var pid = req.body.pid;
        var newPrice = req.body.newprice;
        checkAdmin(req, () => {
            db.query(
                `UPDATE Products SET price=? WHERE id=?;`, 
                [newPrice, pid],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot modify price", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess());
                    }
                }
            );
        });
    });

    app.post(routes.admin_modify_stock, (req, res) => {
        var pid = req.body.pid;
        var newStock = req.body.newstock;
        checkAdmin(req, () => {
            db.query(
                `UPDATE Products SET quantity=? WHERE ID=?;`, 
                [newStock, pid],
                (err, sqlres) => {
                    if (err) { 
                        console.log(err);
                        res.json(constructError("Admin - Cannot modify stock", "SQL error; please contact server admin"));
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.json(constructSuccess());
                    }
                }
            );
        });
    });

}};