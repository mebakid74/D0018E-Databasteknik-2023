// register POST routes that only an admin should be able to access
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.admin_remove_user, (req, res) => {
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

}};