// register POST routes that only an admin should be able to access
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.admin_remove_user, (req, res) => {
        
    });

}};