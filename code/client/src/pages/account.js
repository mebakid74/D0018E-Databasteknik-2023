import axios from "axios";
import React, { useState } from "react";
import "../structure/pages.css";
import { clientParsedRoutes as routes } from "../constants"

const Account = () => {
    const [userdata, setUserdata] = useState({
        fname: "",
        lname: "",
        phone: "",
        addr: "",
        email: "",
        password: ""
    });
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });

    const addUser = () => {
        console.log(userdata);
        console.log(routes);
        axios.post(routes.register_new_user, {
            fname:          userdata.fname,
            lname:          userdata.lname,
            phonenumber:    userdata.phone,
            address:        userdata.addr,
            email:          userdata.email,
            password:       userdata.password,
        }).then((res) => {
            alert((res.data["error"] === "No error") ? "User has been registered" : "User could not be registered");
            setUserdata({
                fname: "",
                lname: "",
                phone: "",
                addr: "",
                email: "",
                password: ""
            });
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    };

    const validateUserLogin = () => {
        axios.post(routes.validate_login_details, {
            email:      logindata.email,
            password:   logindata.password
        }).then((res) => {
            alert((res.data["valid"]) ? "You have been logged in.\nYour token is " + res.data["validationToken"] : "You could not be logged in");
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    return (
        <div className="App">
            <h1>Are you not registered?</h1>
        <div className="information">
            <label>First name:</label>
            <input type="text"
                onChange={(event) => {
                    setUserdata({...userdata, fname: event.target.value});
                }}
            />
            <label>Last name:</label>
            <input type="text"
                onChange={(event) => {
                    setUserdata({...userdata, lname: event.target.value });
                }}
            />
            <label>Phone:</label>
            <input type="number"
                onChange={(event) => {
                    setUserdata({...userdata, phone: event.target.value });
                }}
            />
            <label>Address:</label>
            <input type="text"
                onChange={(event) => {
                    setUserdata({...userdata, addr: event.target.value });
                }}
            />
            <label>Email:</label>
            <input type="text"
                onChange={(event) => {
                    setUserdata({...userdata, email: event.target.value });
                }}
            />
            <label>Password:</label>
            <input type="text"
                onChange={(event) => {
                    setUserdata({...userdata, password: event.target.value });
                }}
            />
            <button onClick={addUser}>Create an account</button>
        </div>

        <div>
            <h2>Login</h2>
            <div className="information">
                <label>E-mail address*</label>
                <input type="text"
                    onChange={(event) => {
                        setLogindata({...logindata, email: event.target.value })
                    }}
                />
                <label>Password*</label>
                <input type="text"
                    onChange={(event) => {
                        setLogindata({...logindata, password: event.target.value });
                    }}
                />
                <button onClick={validateUserLogin}>Login</button>
            </div>
        </div>
    </div>
    );
}
export default Account;
