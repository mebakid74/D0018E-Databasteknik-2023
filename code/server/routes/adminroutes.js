// register POST routes that only an admin should be able to access
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db, creds) {

    app.post(routes.admin_remove_user, (req, res) => {
        var aid = creds.
        var uid = req.body.uid;
        console.log("remove product with id ", req.body.uid);
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