import React, { useState } from "react";
import axios from "axios";
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes, checkSuccess } from "../constants";
import RedirectUserPage from "../components/redirectuserpage"
import { getToken } from "../tools/validation"

const Page = (props) => {
    const [els, setEls] = useState([]);

    const getCartInfo = () => {
        axios.post(routes.get_cart_page_info, { token: getToken()
        }).then((res) => {
            if (checkSuccess(res)) {
                let l = []
                for (const [,v] of Object.entries(res.data["data"])) {
                    let s = "#"+ v["products_id"] + ":   " + v["amount"] + "st. ";
                    if (s in l) { console.error("duplicate elements are not allowed"); }
                    l.push(s);
                }
                setEls(l);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const requestOrder = () => {
        axios.post(routes.order_products_from_cart, { token: getToken()
        }).then((res) => {
            if (checkSuccess(res)) {
                alert("Order has been placed");
            }
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

    );
};

const Cart = () => {
    return (
        <div>
            <RedirectUserPage link="/" pageComponent={Page}/>
        </div>
    );
}
export default Cart;