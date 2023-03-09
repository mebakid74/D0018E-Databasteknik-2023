// register POST requests for returning user data / pages
const { routes, constructError, constructSuccess } = require("../../client/src/constants");
const { isValidEmail, isValidId, isValidPassword } = require("../tools/parsing");
 

module.exports = {  setPost: function(app, db, bcrypt, creds) {
    
    app.post(routes.get_account_page_info, (req, res) => {
        db.query(
            "c;",
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
        var uid = creds.getUidFromToken(req.body.token);
        if (!isValidId(uid)) { res.json(constructError("Cannot get cart", "uid from token is not related to a logged in user")); }

        db.query(
            "SELECT products.name, products_id, amount, price FROM Carts INNER JOIN Products on carts.products_id = products.id WHERE users_id = ?;", 
            [uid], 
            (err, sqlres) => {
                if (err) { 
                    console.log(err);
                    res.constructError("Cannot get cart", "SQL error; please contact server admin");
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
                    res.constructError("Cannot login", "SQL error; please contact server admin");
                } else {
                    var ret = { uid: sqlres[0]["id"] };
                    if (bcrypt.compareSync(pass, sqlres[0]["password"]) && !creds.getUidStored(ret["uid"])) {
                        ret["valid"] = true;
                        ret["validationToken"] = creds.assignToken(ret["uid"]);
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

    app.post(routes.logout_user, (req, res) => {
        var r = creds.removeToken(req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.json((r) ? constructSuccess() : constructError("Cannot logout", "Token is not related to any logged in user"));
    });

    app.post(routes.validate_user_login, (req, res) => {
        var ret = { "valid": creds.verifyToken(req.body.token) }
        res.setHeader('Content-Type', 'application/json');
        res.json(constructSuccess(ret));
    });

    app.post(routes.validate_admin_login, (req, res) => {
        var ret = { "admin": creds.getAdminFromToken(req.body.token) }
        res.setHeader('Content-Type', 'application/json');
        res.json(constructSuccess(ret));
    });
}}