// register POST requests for returning user data / pages
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { isValidEmail, isValidId, isValidPassword } = require("../tools/parsing");
 

module.exports = {  setPost: function(app, db, bcrypt, creds) {
    
    app.post(routes.get_cart_page_info, (req, res) => {
        var uid = creds.getUidFromToken(req.body.token);
        if (!isValidId(uid)) { res.json(constructError("Cannot get cart", "uid from token is not related to a logged in user")); }

        db.query(
            "SELECT products.name, products_id, amount, price FROM Carts INNER JOIN Products on carts.products_id = products.id WHERE users_id = ?;", 
            [uid], 
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot get cart", "SQL error; please contact server admin"));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(constructSuccess(sqlres));
                }
            }
        ); 
    });

    app.post(routes.login_user, (req, res) => {
        var email = req.body.email;
        var pass = req.body.password;
        if (!isValidEmail(email)) { res.json(constructError("Cannot login", "email is not in valid format")); }
        if (!isValidPassword(pass)) { res.json(constructError("Cannot login", "password is not in valid format")); }

        db.query(
            "SELECT users.id, password FROM Users WHERE email=?",
            [email],
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.json(constructError("Cannot login", "SQL error; please contact server admin"));
                } else {
                    var uid = sqlres[0]["id"];
                    if (uid == null) {
                        res.json(constructError("Cannot login", "Email is not assigned"));
                    }
                    else {
                        db.query(
                            "select users_id from admins where users_id =?",
                            [uid],
                            (err2, sqlres2) => {
                                if (err2) { 
                                    console.log(err2);
                                    res.json(constructError("Cannot login", "SQL error; please contact server admin"));
                                } else {
                                    var ret = {};
                                    var a = (sqlres2.length > 0);
                                    if (bcrypt.compareSync(pass, sqlres[0]["password"]) && !creds.getUidStored(uid)) {
                                        ret["valid"] = true;
                                        ret["validationToken"] = creds.assignToken(uid, a);
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(constructSuccess(ret));
                                    }
                                    else {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(constructError("Cannot login", "Invalid login"));
                                    }

                                }
                            }
                        )
                    }

                }
            }
        )

        

    });

    app.post(routes.logout_user, (req, res) => {
        var r = creds.removeToken(req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.json((r) ? constructSuccess() : constructError("Cannot logout", "Token is not related to any logged in user"));
    });

    app.post(routes.validate_user_login, (req, res) => {
        var r = creds.verifyToken(req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.json((r) ? constructSuccess() : constructError("Cannot login", "invalid token"));
    });

    app.post(routes.validate_admin_login, (req, res) => {
        var r = creds.getAdminFromToken(req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.json((r) ? constructSuccess() : constructError("Cannot login", "invalid token"));
    });
}}