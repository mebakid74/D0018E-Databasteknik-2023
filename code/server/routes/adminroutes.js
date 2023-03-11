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
        console.log("add product");
    });

    app.post(routes.admin_update_user_data, (req, res) => {
        console.log("update user data");
    });

    app.post(routes.admin_view_receipts, (req, res) => {
        console.log("view reciepts");
    });

    app.post(routes.admin_modify_price, (req, res) => {
        console.log("modify price");
    });

    app.post(routes.admin_modify_stock, (req, res) => {
        console.log("modify stock");
    });

}};