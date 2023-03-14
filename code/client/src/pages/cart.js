import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { clientParsedRoutes as routes, checkSuccess } from "../constants";
import RedirectUserPage from "../components/redirectuserpage"
import { getToken } from "../tools/validation"
import card from "../asset/image/card.png";
import img4 from "../asset/image/img4.jpg";
const Page = (props) => {
    const navigate = useNavigate();
    const [els, setEls] = useState([]);

    useEffect(()=>{getCartInfo();},[]);
    const getCartInfo = () => {
        axios.post(routes.get_cart_page_info, { token: getToken()
        }).then((res) => {
            if (checkSuccess(res)) {
                setEls(res.data["data"]);
                console.log(els, res.data);
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
                navigate(0);
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

    // Checkout confirm
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const handleCheckout = (event) => {
        event.preventDefault();
        const addressInput = document.getElementById("address");
        const countryInput = document.getElementById("country");
        const zipCodeInput = document.getElementById("zip-code");
        const zipCarHolderInput = document.getElementById("cardholder");
        const zipCreditCardNumberInput = document.getElementById("creditcardnumber");
        const zipExpMonthInput = document.getElementById("exp-month");
        const zipExpYearInput = document.getElementById("exp-year");
        const zipCvvInput = document.getElementById("cvv");
        //setIsFormSubmitted(true);
        if (addressInput.value.trim() === "" || countryInput.value.trim() === "" || zipCodeInput.value.trim() === "" ||
            zipCarHolderInput.value.trim() === "" || zipCreditCardNumberInput.value.trim() === "" ||
            zipExpMonthInput.value.trim()  === "" ||  zipExpYearInput.value.trim()  === "" ||
            zipCvvInput.value.trim() === "")
        {
            alert("Please fill out all fields before continuing to checkout.");
        } else {
            window.alert("Order succeeded and confirmed!");
        }
    }

    return (
        <div>
            <div className='cart'>
                <label>Cart</label>
            </div>

            <div className="carrt">
            { els.map((v,i) => { return (
                <div key={i}>
                    <a>{v.name}, {v.amount}</a>
                </div>
            )})}
            </div>

            <hr/>

            <div className="cartt">
                <button onClick={requestOrder}>Confirm order</button>
            </div>


            {/*
            <div className="cartadd">
                <div className="cartdec">
                    <button className="btn-1" type = "button" onClick={DecrementItem}> - </button>
                </div>
                <input type="text" value={Item} onChange = {handelChange}/>

                <div className="cartinc">
                    <button className="btn-1" type = "button" onClick={IncrementItem}> + </button>
                </div>
            </div>

            <div className="totalitems">
                <span>Total price of your cart</span> <br/>
                <span>$ {cost} </span>
            </div>

            <div className="cartfooter">
                <button>Empty cart</button> <br/>
            </div>
            */}

            <div className="container-cart">
                <form>
                    <div className="row">
                        <div className="col">
                            <h1>Billing address</h1>
                            <br/>
                            <div className="input-box-1">
                                <span>Address   :   </span>
                                <input type="text" placeholder="City and street" id="address"
                                       onChange={(event) => setAddress(event.target.value)} required/>
                                {isFormSubmitted && address.trim() === "" && (
                                    <span className="error-message">This field is required</span>
                                )}
                                {/*<input type="text" placeholder="City and street" />*/}
                            </div>
                            <br/>
                            <div className="input-box-1">
                                <span>Country   :     </span>
                                <input type="text" placeholder="Sweden" id="country"
                                       onChange={(event) => setCountry(event.target.value)} required/>
                                {isFormSubmitted && country.trim() === "" && (
                                    <span className="error-message">This field is required</span>
                                )}
                                {/*<input type="text" placeholder="Sweden"/>*/}
                            </div>
                            <br/>
                             <div className="input-box-1">
                                <span>Zip code :</span>
                                 <input type="number" placeholder="973 55" id="zip-code"
                                        onChange={(event) => setZipCode(event.target.value)} required/>
                                 {isFormSubmitted && zipCode.trim() === "" && (
                                     <span className="error-message">This field is required</span>
                                 )}
                                 {/*<input type="text" placeholder="973 55"/>*/}
                            </div>
                        </div>

                        <div className="col">
                            <h1 className="title-1">Payment</h1>
                            <br/>
                            <div className="input-box-1">
                                <span>Accepted cards :</span>
                                <img src={card} className="card" alt=""/>
                            </div>
                            <br/>
                            <div className="input-box-1">
                                <span>Card holder : </span>
                                <input type="text" placeholder="Mr. X" id="cardholder"
                                       onChange={(event) => setCardHolder(event.target.value)} required/>
                                {isFormSubmitted && cardHolder.trim() === "" && (
                                    <span className="error-message">This field is required</span>
                                )}
                                {/*<input type="text" placeholder="Mr. X" />*/}
                            </div>
                            <br/>
                            <div className="input-box-1">
                                <span>Credit Card Number : </span>
                                <input type="number" placeholder="1111-2222-0000-8888" id="creditcardnumber"
                                       onChange={(event) => setCardNumber(event.target.value)} required/>
                                {isFormSubmitted && cardNumber.trim() === "" && (
                                    <span className="error-message">This field is required</span>
                                )}
                                {/*<input type="number" placeholder="1111-2222-0000-8888"/>*/}
                            </div>
                            <br/>
                            <div className="input-box-1">
                                <span>Exp month : </span>
                                <input type="number" placeholder="973 55" id="exp-month"
                                       onChange={(event) => setExpMonth(event.target.value)} required/>
                                {isFormSubmitted && expMonth.trim() === "" && (
                                    <span className="error-message">This field is required</span>
                                )}
                            </div>
                            <br/>
                            <div className="flex">
                                <div className="input-box-1">
                                    <span>Exp Year : </span>
                                    <input type="number" placeholder="2026" id="exp-year"
                                           onChange={(event) => setExpYear(event.target.value)} required/>
                                    {isFormSubmitted && expYear.trim() === "" && (
                                        <span className="error-message">This field is required</span>
                                    )}
                                    {/*<input type="number" placeholder="2026"/>*/}
                                </div>
                                <div className="input-box-1">
                                    <span>CVV : </span>
                                    <input type="number" placeholder="026" id="cvv"
                                           onChange={(event) => setCvv(event.target.value)} required/>
                                    {isFormSubmitted && cvv.trim() === "" && (
                                        <span className="error-message">This field is required</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <input type="submit" value="Continue to checkout" className="submit-btn" onClick={handleCheckout}/>
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