import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isUserValid } from "../tools/validation"
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes } from "../constants";

const Cart = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserValid("")) {
            navigate("/account");
        }
    },[]);

    const [uid, setUid] = useState(0);
    const [els, setEls] = useState([]);

    const getCartInfo = () => {
        axios.post(routes.get_cart_page_info, {
            uid: uid
        }).then((res) => {
            console.log(res.data);

            if (res.data["data"] == null) { return;}

            let l = []
            for (const [,v] of Object.entries(res.data["data"])) {
                let s = "#"+ v["products_id"] + ":   " + v["amount"] + "st. ";
                if (s in l) { console.error("duplicate elements are not allowed"); }
                l.push(s);
            }

            console.log(l);
            setEls(l);

        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const requestOrder = () => {
        axios.post(routes.order_products_from_cart, {
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
                <button onClick={requestOrder}>Confirm order</button>
                <hr/>
                <Contentlist elements={els}></Contentlist>
            </div>
        </div>

    );};

export default Cart;