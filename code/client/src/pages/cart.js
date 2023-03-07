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

            <div className="container">
                <form>
                    <div className="row">
                        <div className="col">
                            <h1 className="title">Billing address</h1>

                            <div className="input-box">
                                <span>Address : </span>
                                    <input type="text" placeholder="city - street" />
                            </div>

                            <div className="flex">
                                <div className="input-box">
                                    <span>Country :</span>
                                    <input type="text" placeholder="Sweden"/>
                                </div>

                                 <div className="input-box">
                                    <span>Zip code :</span>
                                    <input type="text" placeholder="973 55"/>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <h1 className="title">Payment</h1>

                            <div className="input-box">
                                <span>Accepted cards :</span>
                                <img src="" alt=""/>
                            </div>

                            <div className="input-box">
                                <span>Card holder : </span>
                                    <input type="text" placeholder="Mr. X" />
                            </div>

                            <div className="input-box">
                                <span>Credit Card Number :</span>
                                <input type="number" placeholder="1111-2222-0000-8888"/>
                            </div>

                            <div className="input-box">
                                <span>Exp month :</span>
                                <input type="text" placeholder="973 55"/>
                            </div>

                            <div className="flex">
                                <div className="input-box">
                                    <span>Exp Year :</span>
                                    <input type="number" placeholder="2026"/>
                                </div>
                                 <div className="input-box">
                                    <span>CVV :</span>
                                    <input type="number" placeholder="026"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="submit" value="Continue to checkout" className="submit-btn"/>

                </form>
                
            </div>
        </div>

   );
};

const Cart = () => {
    return (
        <div>
            <RedirectUserPage link="/account" pageFunc={Page}/>
        </div>
    );
}
export default Cart;