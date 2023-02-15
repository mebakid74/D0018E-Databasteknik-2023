import Axios from "axios";
import React, { useState } from "react";

import "../structure/pages.css";

/////////////////////////////// Route info for debugging:
// POST path: /getaccount
// To backend: user validation (userID until login/validation done)
// Return: fname, lname, email, address, phonenumber
/////////////////////////////////////////////////////////


/*const Account = () => {
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
            <input type="text" defaultValue={0} onChange={(e) => {setUid(e.target.value);}}></input>
            <button onClick={getDisplayInfo}>Get account info</button>
            <hr/>
            <p>name: {userdata.fname} {userdata.lname}</p>
            <p>email: {userdata.email}</p>
            <p>address: {userdata.address}</p>
            <p>phone number: {userdata.phonenumber}</p>
        </div>

    );};

export default Account;*/


function Account() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addUser = () => {
        getDisplayInfo();

        console.log(fname, lname);
        console.log(phone);
        console.log(address);
        console.log(email);
        console.log(password);

        Axios.post("http://localhost:3001/register", {
            fname: fname,
            lname: lname,
            phonenumber: phone,
            address: address,
            email: email,
            password: password,
        }).then(() => {
            console.log("Account creation sucessfully added to database");
        });
    };

    const validateUserLogin = () => {
        Axios.post("http://localhost:3001/validatelogin", {
            email: email,
            password: password
        }).then((res) => {
            var b = res.data;
            console.log(b["uid"], b["valid"]);
            if (b["valid"]) {
                console.log(b["validationToken"]);
            }
        });
    }

    const getDisplayInfo = () => {
        console.log()
    };

    return (
        <div className="App">
            <h1>Are you not registered?</h1>
        <div className="information">
            <label>First name:</label>
            <input
                type="text"
                onChange={(event) => {
                    setFname(event.target.value);
                }}
            />
            <label>Last name:</label>
            <input
                type="text"
                onChange={(event) => {
                    setLname(event.target.value);
                }}
            />
            <label>Phone:</label>
            <input
                type="number"
                onChange={(event) => {
                    setPhone(event.target.value);
                }}
            />
            <label>Address:</label>
            <input
                type="text"
                onChange={(event) => {
                    setAddress(event.target.value);
                }}
            />
            <label>Email:</label>
            <input
                type="text"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button onClick={addUser}>Create an account</button>
            <button onClick={validateUserLogin}>Debug: Validate login)</button>
        </div>
            <div>
                <h2>Login</h2>
                <div className="information">
                    <label>E-mail address*</label>
                    <input
                        type="text"
                        />
                    <label>Password*</label>
                    <input
                        type="text"
                    />
                    <button onClick={addUser}>Login</button>
                </div>

            </div>
    </div>

    );
}

export default Account;
