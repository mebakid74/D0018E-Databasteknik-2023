import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isUserValid } from "../tools/validation"
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes } from "../constants";
import RedirectUserPage from "../components/redirectuserpage"

const Page = (props) => {
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

    // Cart inc. & dec. system
    const [Item, setItem] = useState(0);
    const IncrementItem = () => {
        if (Item<10) {
            setItem(Number(Item)+1);
        }
    };
    const DecrementItem = () => {
        if(Item>0){
            setItem(Item-1);
        }
    };
    const handelChange = (e) => {
        setItem(e.target.value);
    }
    // Total cost of items in cart
    const cost = ((total, item) => total + item.amount * item.price, 0);

    return (
        <div>
            <div className='cart'>
                <label>Cart</label>
                <input
                    type="text" onChange={(e) => {setUid(e.target.value);}}></input>
                <button onClick={getCartInfo}>Get cart info</button>
                <button onClick={requestOrder}>Confirm order</button>
                <hr/>
                <Contentlist elements={els}></Contentlist>
            </div>

            <div className="cartadd">
                <div className="cartdec">
                    <button className="btn-1" type = "button" onClick={DecrementItem}> - </button>
                </div>
                <input type="text" value={Item} onChange = {handelChange}/>

                <div className="cartinc">
                    <button className="btn-1" type = "button" onClick={IncrementItem}> + </button>
                </div>
                    {/*<input type="text" value={Item} onChange = {handelChange}/>*/}
            </div>

            <div className="totalitems">
                <span>Total price of your cart</span> <br/>
                <span>$ {cost} </span>
            </div>

            <div className="cartfooter">
                <button>Empty cart</button> <br/>
                <button>Proceed to checkout</button>
            </div>
        </div>

    );};


const PageE = (props) => {
    return (
        <div>
            <h1>Hola</h1>
        </div>
    );
}

const Cart = () => {
    return (
        <div>
            <RedirectUserPage link="/" pageComponent={Page}/>
        </div>
    );
}
export default Cart;