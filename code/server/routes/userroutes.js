// register POST requests for returning user data / pages
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


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

    app.post(routes.login_user, (req, res) => {
        db.query(
            "SELECT users.id, password FROM Users WHERE email=?",
            [req.body.email],
            (err, sqlres) => {
                if (err) { console.log(err);
                } else {
                    var ret = { uid: sqlres[0]["id"] };
                    if (bcrypt.compareSync(req.body.password, sqlres[0]["password"]) && !creds.getUidStored(ret["uid"])) {
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
        creds.removeToken(req.body.token);
        res.setHeader('Content-Type', 'application/json');
        res.json(constructSuccess());
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