const clientParsedRoutes = {};
const routes = {   
    get_product_page_info: "/getprod",
    get_account_page_info: "/getacc",
    get_collection_id_list: "/getcoll",
    get_cart_page_info: "/getcart",
    add_product_to_database: "/addprod",
    order_products_from_cart: "/ordercart",
    validate_login_details: "/validate",
    register_new_user: "/register",
    get_filtered_product_list: "/getprodfiltered",
    increment_product_in_cart: "/incrementcart"
}

Object.entries(routes).forEach((e) => {
    const [k,v] = e;
    clientParsedRoutes[k] = "http://localhost:3001" + v;
}); 

// it is preferred to use this instead of a new creation to avoid misspelling 
const constructError = (text, dets="") => {
    return { "error": text, "details": dets };
};

const constructSuccess = (d=null, dets="") => {
    return {...constructError("success", dets), data:d };
};

module.exports = {
    routes, clientParsedRoutes, constructError, constructSuccess
}