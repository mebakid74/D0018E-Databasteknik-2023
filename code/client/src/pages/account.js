import axios from "axios";
import React, { useState } from "react";



/////////////////////////////// Route info for debugging:
// POST path: /getaccount
// To backend: user validation (userID until login/validation done)
// Return: fname, lname, email, address, phonenumber
/////////////////////////////////////////////////////////


const Account = () => {
    const [uid, setUid] = useState(0);
    const [userdata, setUserdata] = useState({
        fname: "",
        lname: "",
        email: "",
        address: "",
        phonenumber: "",
    }); 

    const getDisplayInfo = () => {
        axios.post("http://localhost:3001/getaccount", {
            uid: uid
        }).then((res) => {
            console.log(res.data);
            setUserdata(res.data);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };

    return (
        <div>
            <h1 className='account'>ACCOUNT</h1>
            <input type="text" onChange={(e) => {setUid(e.target.value);}}></input>
            <button onClick={getDisplayInfo}>Get account info</button>
            <hr/>
            <p>name: {userdata.fname} {userdata.lname}</p>
            <p>email: {userdata.email}</p>
            <p>address: {userdata.address}</p>
            <p>phone number: {userdata.phonenumber}</p>
        </div>

    );};

export default Account;