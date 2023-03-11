import React, { useState } from "react";
import axios from "axios";
import {checkSuccess, clientParsedRoutes as routes} from "../constants";
import AdminPage from "../components/adminpage";

const Page = (props) => {

    const [inputData, setInputData] = useState({
        deleteUser: 0,
        receiptUser: 0,
    });
    
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