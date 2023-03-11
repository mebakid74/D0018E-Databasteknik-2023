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

    const [adminid, setAdminId] = useState("");
    const [adminemail, setAdminEmail] = useState("");
    const [adminpassword, setAdminPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/admin_register", {
            adminid : adminid,
            adminemail : adminemail,
            adminpassword : adminpassword,
        }).then((response) => {
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                setRegisterStatus("Admin account created successfully");
            }
        })
    }
    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/admin_login", {
            adminid : adminid,
            adminpassword : adminpassword,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus("Admin account successfully logged in");
                setLoginStatus(response.data[0].adminemail);
            }
        })
    }
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => { setPasswordShown(!passwordShown); };

    return (
        <div>
            <h1>Welcome to the admin page</h1>

                    <div className="admin-panel">
                        <form>
                            <h1>Login</h1>
                            <label className="adminid">Admin id</label>
                            <input className="adminid-input" type="text" name="adminid"
                            placeholder="Enter your admin id" required
                                   onChange={(event) => {setAdminId(event.target.value)}}/>
                            <br/>
                            <label className="adminpassword">Admin password</label>
                            <input className="adminpassword-input" type={passwordShown ? "text" : "password"} name="adminpassword"
                                   placeholder="Enter your admin password" required
                                   onChange={(event) => {setAdminPassword(event.target.value)}}/>
                            <br/>
                            <button onClick={togglePassword}>Show Password</button>
                            <button onClick={loginStatus}>Login</button>
                        </form>

                        <br />

                            <form>
                                <h1>Register</h1>
                                <label className="adminid">Admin id</label>
                                <input className="adminid-input" type="text" name="adminid"
                                       placeholder="Enter your admin id" required
                                       onChange={(event) => {setAdminId(event.target.value)}}/>
                                <br/>
                                <label className="adminemail">Admin email</label>
                                <input className="adminemail-input" type="text" name="adminemail"
                                       placeholder="Enter your admin email" required
                                       onChange={(event) => {setAdminEmail(event.target.value)}}/>
                                <br/>
                                <label className="adminpassword">Admin password</label>
                                <input className="adminpassword-input" type={passwordShown ? "text" : "password"} name="adminpassword"
                                       placeholder="Enter your admin password" required
                                       onChange={(event) => {setAdminPassword(event.target.value)}}/>
                                <br/>
                                <button onClick={togglePassword}>Show Password</button>
                                <button onClick={registerStatus}>Create an admin account</button>
                            </form>

                        <br/>




                    </div>

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