// register POST routes that only an admin should be able to access
const { routes, constructError, constructSuccess } = require("../../client/src/constants");


module.exports = { setPost: function(app, db) {

    app.post(routes.admin_register, (req, res) => {
        const adminid = req.body.adminid;
        const adminemail = req.body.adminemail;
        const adminpassword = req.body.adminpassword;

        db.query("INSERT INTO admins (adminid, adminemail, adminpassword) VALUES(?, ?, ?)",
            [adminid, adminemail, adminpassword], (err, res) => {
            if(res) {
                res.send(res);
                console.log("Admin account successfully created")
            } else {
                res.send({message: "Admin details required"})
            }
        })
    })
    app.post(routes.admin_login, (req, res) => {
        const adminid = req.body.adminid;
        const adminpassword = req.body.adminpassword;

        db.query("SELECT * FROM admins WHERE adminid  = ? AND adminpassword = ?",
            [adminid, adminpassowrd], (err, res) => {
                if(err) {
                    req.setEncoding({err: err});
                } else {
                    if(res.length > 0){
                        res.send(res);
                    } else {
                        res.send({message: "Admin id or password does not exist"})
                    }
                }
            })
    })

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