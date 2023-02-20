const clientParsedRoutes = {};
const routes = {   
    get_product_page_info: "/getprod",
    get_account_page_info: "/getacc",
    get_collection_id_list: "/getcoll",
    get_cart_page_info: "/getcart",
    add_product_to_cart: "/addprod",
    order_products_from_cart: "/ordercart",
    validate_user_login: "/validate",
    validate_admin_login: "/validateadmin",
    login_user: "/login",
    register_new_user: "/register",
    get_filtered_product_list: "/getprodfiltered",
    increment_product_in_cart: "/incrementcart",
    add_product_review: "/addreview",
    admin_remove_user: "/ad_rmuser",
    admin_add_product: "/ad_addprod",
    admin_update_user_data: "/ad_updateuser",
    admin_view_receipts: "/ad_getreceipts"
}

Object.entries(routes).forEach((e) => {
    const [k,v] = e;
    clientParsedRoutes[k] = "http://localhost:3001" + v;
}); 

const constructError = (text, dets=null) => {
    return { "status": text, "details": dets };
};

const constructSuccess = (d=null, dets=null) => {
    return {...constructError("success", dets), data:d };
};

module.exports = {
    routes, clientParsedRoutes, constructError, constructSuccess
}