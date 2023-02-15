const routes = {   
    get_product_page_info: "/getprod",
    get_account_page_info: "/getacc",
    get_collection_id_list: "/getcoll",
    get_cart_page_info: "/getcart",
    add_product_to_database: "/addprod",
    order_products_from_cart: "/ordercart",
    validate_login_details: "/validate",
    register_new_user: "/register",
    get_filtered_product_list: "/getprodfiltered"
}

const clientParsedRoutes = {};

Object.entries(routes).forEach((e) => {
    const [k,v] = e;
    clientParsedRoutes[k] = "http://localhost:3001" + v;
}); 

module.exports = {
    routes, clientParsedRoutes
}