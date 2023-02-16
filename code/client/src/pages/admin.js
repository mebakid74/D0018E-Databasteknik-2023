import React, { useState } from "react";
import axios from "axios";
import { isUserAdmin } from "../tools/validation"
import { clientParsedRoutes as routes } from "../constants";

// stuff that admin can do uniquely:
// (DONE) remove users
// add product
// (LATER) add category
// (LATER) edit all carts
// change all user data
// view all receipts
// 

const LoggedIn = () => {};
const NotLoggedIn = () => {};

const Admin = () => {
    const [inputData, setInputData] = useState({
        deleteUser: 0,
        receiptUser: 0,
    });

    var token = "";
    //var isAdmin = isUserAdmin(token);
    var isAdmin = true;
    
    const deleteUser = () => {
        axios.post(routes.admin_remove_user, {
            uid: inputData.deleteUser
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }

    const getReceipts = () => {
        axios.post(routes.admin_view_receipts, {
            uid: inputData.deleteUser
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }

    return (
        <div>
            {isAdmin 

            ? <div>
                <h1>Welcome to the admin page</h1>

                <hr></hr>
                <label>Remove user by UID</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, deleteUser: e.target.value})}}/>
                <button onClick={deleteUser}>Delete user</button>

                <hr></hr>
                <label>Add product - To be implemented</label><br/>

                <hr></hr>
                <label>Change user data by UID - To be impemented</label><br/>

                <hr></hr>
                <label>View receipts by UID</label><br/>
                <input type="text" onChange={(e) => {setInputData({...inputData, receiptUser: e.target.value})}}/>
                <button onClick={getReceipts}>Get receipts</button>
            </div> 

            : <div>
                <h1>You are not logged in as admin</h1>
            </div>}
        </div>
    );
}
export default Admin;