import React, { useState } from "react";
import axios from "axios";
import {checkSuccess, clientParsedRoutes as routes} from "../constants";
import AdminPage from "../components/adminpage";
import { getToken } from "../tools/validation";

const Page = (props) => {

    const [inputDataU, setInputDataU] = useState({
        uid:0, fname:"", lname:"", email:"", phone:0, address:""
    });
    const [inputDataD, setInputDataD] = useState({
        uid:0
    });
    const [inputDataGR, setInputDataGR] = useState({
        uid:0
    });
    const [inputDataAP, setInputDataAP] = useState({
        cat:1, name:"", desc:"", img:""
    });
    const [inputDataMP, setInputDataMP] = useState({
        pid:1, n:0
    });
    const [inputDataMQ, setInputDataMQ] = useState({
        pid:1, n:0
    });

    const updateUser = () => {
        axios.post(routes.admin_update_user_data, {
            token: getToken(),
            uid_to_edit: inputDataU.uid,
            fname: inputDataU.fname,
            lname: inputDataU.lname,
            email: inputDataU.email,
            phone: inputDataU.phone,
            address: inputDataU.address
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully updated user details");
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }
    
    const deleteUser = () => {
        axios.post(routes.admin_remove_user, {
            token: getToken(),
            uid_to_remove: inputDataD.uid
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully removed user");
            }
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }
    const getReceipts = () => {
        axios.post(routes.admin_view_receipts, {
            token: getToken(),
            uid_to_view: inputDataGR.uid
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully received user receipts");
            }
        }).catch((err) => {
            console.error(err); 
            console.error(err.response.data);
        })
    }
    const addProduct = () => {
        axios.post(routes.admin_add_product, {
            token: getToken(),
            categoryId: inputDataAP.cat,
            name: inputDataAP.name,
            desc: inputDataAP.desc,
            image: inputDataAP.img
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully added new products");   
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }
    const modifyProductPrice = () => {
        axios.post(routes.admin_modify_price, {
            token: getToken(),
            pid: inputDataMP.pid,
            newprice: inputDataMP.n
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully modified product price");
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const modifyProductStock = () => {
        axios.post(routes.admin_modify_stock, {
            token: getToken(),
            pid: inputDataMQ.pid,
            newstock: inputDataMQ.n
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data, "Successfully modified product stock");
            }
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
                <label>uid: <input title="dsa" type="text" onChange={(e) => {setInputDataD({...inputDataD, uid: e.target.value})}}/> </label>
                <button onClick={deleteUser}>Delete user</button>
            </div>

            <div className="add-p">
                <label>Add product</label><br/>
                <label>cat: <input type="text" onChange={(e) => {setInputDataAP({...inputDataAP, cat: e.target.value})}}/> </label>
                <label>name: <input type="text" onChange={(e) => {setInputDataAP({...inputDataAP, name: e.target.value})}}/> </label>
                <label>desc: <input type="text" onChange={(e) => {setInputDataAP({...inputDataAP, desc: e.target.value})}}/> </label>
                <label>img: <input type="text" onChange={(e) => {setInputDataAP({...inputDataAP, img: e.target.value})}}/> </label>
                <button onClick={addProduct}>Add Product</button>
            </div>

            <div className="change-u">
                <label>Change user data by UID</label><br/>
                <label>uid: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, uid: e.target.value})}}/></label>
                <label>fname: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, fname: e.target.value})}}/></label>
                <label>lname: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, lname: e.target.value})}}/></label>
                <label>email: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, email: e.target.value})}}/></label>
                <label>phone: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, phone: e.target.value})}}/></label>
                <label>address: <input type="text" onChange={(e) => {setInputDataU({...inputDataU, address: e.target.value})}}/></label>
                <button onClick={updateUser}>Update user</button>
            </div>

            <div className="receipts">
                <label>View receipts by UID</label><br/>
                <label>uid: <input type="text" onChange={(e) => {setInputDataGR({...inputDataGR, uid: e.target.value})}}/></label>
                <button onClick={getReceipts}>Get receipts</button>
            </div>

            <div className="price">
                <label>Modify product price </label><br/>
                <label>pid: <input type="number" onChange={(e) => {setInputDataMP({...inputDataMP, pid: e.target.value})}}/></label>
                <label>new: <input type="number" onChange={(e) => {setInputDataMP({...inputDataMP, n: e.target.value})}}/></label>
                <button onClick={modifyProductPrice}>Modify price</button>
            </div>

            <div className="stock">
                <label>Modify product stock </label><br/>
                <label>pid: <input type="number" onChange={(e) => {setInputDataMQ({...inputDataMQ, pid: e.target.value})}}/></label>
                <label>new: <input type="number" onChange={(e) => {setInputDataMQ({...inputDataMQ, n: e.target.value})}}/></label>
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