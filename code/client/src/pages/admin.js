import React, { useState } from "react";
import axios from "axios";
import {checkSuccess, clientParsedRoutes as routes} from "../constants";
import AdminPage from "../components/adminpage";
import { getToken } from "../tools/validation";

const Page = (props) => {

    const [inputData, setInputData] = useState({
        deleteUser: 0,
        receiptUser: 0,
    });

    const updateUser = () => {
        axios.post(routes.admin_update_user_data, {
            token: getToken(),
            uid_to_edit: inputData.updateUser,
            fname: inputData.updateUser,
            lname: inputData.updateUser,
            email: inputData.updateUser,
            phone: inputData.updateUser,
            address: inputData.updateUser
        }).then((res) => {
            console.log(res.data, "Successfully updated user details");
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }
    
    const deleteUser = () => {
        axios.post(routes.admin_remove_user, {
            token: getToken(),
            uid_to_remove: inputData.deleteUser
        }).then((res) => {
            console.log(res.data, "Successfully removed user");
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }
    const getReceipts = () => {
        axios.post(routes.admin_view_receipts, {
            token: getToken(),
            uid: inputData.deleteUser
        }).then((res) => {
            console.log(res.data, "Successfully received user receipts");
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }
    const addProduct = () => {
        axios.post(routes.admin_add_product, {
            token: getToken(),
            categoryId: inputData.addProduct,
            name: inputData.addProduct,
            desc: inputData.addProduct,
            image: inputData.addProduct
        }).then((res) => {
            console.log(res.data, "Successfully added new products");
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }
    const modifyProductPrice = () => {
        axios.post(routes.admin_modify_price, {
            token: getToken(),
            pid: inputData.modifyProductPrice,
            newPrice: inputData.modifyProductPrice
        }).then((res) => {
            console.log(res.data, "Successfully modified product price");
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const modifyProductStock = () => {
        axios.post(routes.admin_modify_price, {
            token: getToken(),
            pid: inputData.modifyProductStock,
            newStock: inputData.modifyProductStock
        }).then((res) => {
            console.log(res.data, "Successfully modified product stock");
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    return (
        <div className="admin">
            <h1>Welcome to the admin page</h1>
                <hr/>
            <div className="admin-2">
            <div className="user">
                <label>Remove user by UID</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, deleteUser: e.target.value})}}/>
                <button onClick={deleteUser}>Delete user</button>
            </div>

            <div className="add-p">
                <label>Add product</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, addProduct: e.target.value})}}/>
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="change-u">
                <label>Change user data by UID</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, updateUser: e.target.value})}}/>
                <button onClick={updateUser}>Update user</button>
            </div>

            <div className="receipts">
                <label>View receipts by UID</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, receiptUser: e.target.value})}}/>
                <button onClick={getReceipts}>Get receipts</button>
            </div>

            <div className="price">
                <label>Modify product price </label><br/>
                <input type="number" onChange={(e) => {setInputData({...inputData, modifyProductPrice: e.target.value})}}/>
                <button onClick={modifyProductPrice}>Modify price</button>
            </div>

            <div className="stock">
                <label>Modify product stock </label><br/>
                <input type="number" onChange={(e) => {setInputData({...inputData, modifyProductStock: e.target.value})}}/>
                <button onClick={modifyProductStock}>Modify stock</button>
            </div>
            </div>
            </div> 
    );
}

const Admin = () => {
    return (
        <div>
            <AdminPage link="/" pageFunc={Page}/>
        </div>
    );
}

export default Admin;