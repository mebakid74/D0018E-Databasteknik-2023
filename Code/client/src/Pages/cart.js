import React, { useState } from "react";
import axios from "axios";

/////////////////////////////// Route info for debugging:
// POST path: /getcart
// To backend: user validation (userID until login/validation done)
// Return: cart {prodId, ammount} (list)

// POST path: /setorder
// To backend: user validation (userID until login/validation done)
// Return: error/confirmation bool
/////////////////////////////////////////////////////////

const Cart = () => {
    const [uid, setUid] = useState(0);

    const getCartInfo = () => {
        axios.post("http://localhost:3001/getcart", {
            uid: uid
        }).then((res) => {
            console.log(res.data["cart"]);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const setOrder = () => {
        axios.post("http://localhost:3001/setorder", {
            uid: uid
        }).then((res) => {
            console.log("order confirmed: " + res.data["confirmed"]);
            console.log("error: " + res.data["error"]);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    return (
        <div>
            <div className='cart'>
                <label>Cart</label>
                <input type="text" onChange={(e) => {setUid(e.target.value);}}></input>
                <button onClick={getCartInfo}>Get cart info</button>
                <button onClick={setOrder}>Confirm order</button>
                <hr/>

            </div>
        </div>

    );};

export default Cart;