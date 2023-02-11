import axios from "axios";
import React, { useState } from "react";



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

const Account = () => {
    return (
        <section>
            <div className="col">
                <h1>Login</h1>
                <div className="login">
                    <h2>E-mail address*</h2>
                    <form className="login-form">
                        <div className="text-box">
                            <input type="email" placeholder="example@email.com" />
                        </div>
                    </form>
                    <h3>Password*</h3>
                    <form className="login-form">
                        <div className="text-box">
                            <input type="password" placeholder="password" />
                        </div>
                    </form>
                    <button type="submit">LOGIN</button>
                    <a href="">Forgot your credentials?</a>
                </div>
            </div>


            <div className="col-2">
                <h1>Are you not registered?</h1>
                <div className="reg">
                    <h2>Full Name*</h2>
                    <form className="reg-form">
                        <div className="text-box">
                            <input type="name" placeholder="fullname" />
                        </div>
                    </form>

                    <h3>E-mail address*</h3>
                    <form className="reg-form">
                        <div className="text-box">
                            <input type="email" placeholder="example@email.com" />
                        </div>
                    </form>

                    <h4>Phone Number*</h4>
                    <form className="reg-form">
                        <div className="text-box">
                            <input type="phone" placeholder="phone number" />
                        </div>
                    </form>

                    <h5>Password*</h5>
                    <form className="reg-form">
                        <div className="text-box">
                            <input type="password" placeholder="password" />
                        </div>
                    </form>



                    <button type="submit">CREATE NEW ACCOUNT</button>

                </div>
            </div>
        </section>


    );};

export default Account;