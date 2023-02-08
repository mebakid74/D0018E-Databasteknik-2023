import axios from "axios";
import React, { useState } from "react";
import { getUserValidation } from "../tools/validationTools"

/////////////////////////////// Route info for debugging:
// POST path: /getaccount
// To backend: user validation (userID until login/validation done)
// Return: uid, fname, lname, email, addr, phone
/////////////////////////////////////////////////////////


const Account = () => {
    const [uid, setUid] = useState(0);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [addr, setAddr] = useState("");
    const [phone, setPhone] = useState("");

    // used exclusively for login
    const [password, setPassword] = useState(""); 

    const getDisplayInfo = () => {
        valid = getUserValidation(email, password);
        if (!valid) {
            console.error("not a validated user");
            return;
        }
        axios.post("http://localhost:3001/getaccount", {
            uid: uid
        }).then((res) => {
            setFname(res.data["fname"]);
            setLname(res.data["lname"]);
            setEmail(res.data["email"]);
            setAddr(res.data["addr"]);
            setPhone(res.data["phone"]);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };

    

    return (
        <div>
            <h1 className='account'>ACCOUNT</h1>
            <input type="text" onChange={(e) => {setEmail(e.target.value);}}></input>
            <input type="text" onChange={(e) => {setPassword(e.target.value);}}></input>
            <button onClick={getDisplayInfo}>Get account info</button>
            <hr/>
            <p>name: {fname} {lname}</p>
            <p>email: {email}</p>
            <p>address: {addr}</p>
            <p>phone number: {phone}</p>
        </div>

    );};

export default Account;