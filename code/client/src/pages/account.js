import axios from "axios";
import React, { useState } from "react";
import { setCookie, getCookie, clearCookie } from "../tools/validation"
import "../structure/pages.css";
import { clientParsedRoutes as routes } from "../constants"
import UserPage  from "../components/userpage"

const LoggedIn = () => {
    const logOutUser = () => {
        axios.post(routes.logout_user, {
            token: getCookie("token")
        }).then((res) => {
            clearCookie();
            console.log(res);
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    return (
        <div>
            <h1>You are logged in</h1>
            <button onClick={logOutUser}>Log out</button>
        </div>
    );
}

const NotLoggedIn = () => {
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
        axios.post(routes.register_new_user, {
            fname:          userdata.fname,
            lname:          userdata.lname,
            phonenumber:    userdata.phone,
            address:        userdata.addr,
            email:          userdata.email,
            password:       userdata.password,
        }).then((res) => {
            if (res.data["data"]["valid"]) {
                setCookie("token", "securitytokenhere")
            }
            alert((res.data["data"]["valid"]) ? "User has been registered" : "User could not be registered");
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
        axios.post(routes.login_user, {
            email:      logindata.email,
            password:   logindata.password
        }).then((res) => {
            var data = res.data["data"];
            console.log(res.data);
            alert((data["valid"]) ? "You have been logged in.\nYour token is " + data["validationToken"] : "You could not be logged in");
            if (data["valid"]) {
                setCookie("token", data["validationToken"])
            }
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => { setPasswordShown(!passwordShown); };

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
                <input type={passwordShown ? "text" : "password"}
                       onChange={(event) => {
                           setUserdata({...userdata, password: event.target.value });
                }}
                />
                <button onClick={togglePassword}>Show Password</button>
                <button onClick={addUser}>Create an account</button>
            </div>

            <div className="login">
                <h2>Login</h2>
                <div className="information">
                    <label>
                        <i className="fa fa-envelope"> E-mail address* </i>
                        </label>
                    <input
                        type="text"
                        placeholder= "Enter your email"
                        onChange={(event) => {
                            setLogindata({...logindata, email: event.target.value })
                        }}
                    />

                    <label>
                        <i className="fa fa-lock">  Password* </i>
                       </label>
                    <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(event) => {
                               setLogindata({...logindata, password: event.target.value });
                           }}
                    />

                    <button onClick={togglePassword}>Show Password</button>
                    <button onClick={validateUserLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

const Account = () => {
    return (
        <div>
            <UserPage validRenderComponent={LoggedIn} invalidRenderComponent={NotLoggedIn}></UserPage>
        </div>
    );
}
    
export default Account;