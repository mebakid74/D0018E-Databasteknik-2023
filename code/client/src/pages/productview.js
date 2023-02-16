import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../structure/pages.css"
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes } from "../constants";

import { AiFillStar,AiOutlineStar } from "react-icons/ai";

const ProductView = () => {
    const [amount, setAmount] = useState(0);
    const [pid, setPid] = useState(0);
    const [uid, setUid] = useState(0);
    const [prodData, setProdData] = useState({
        name: "",
        description: "",
        imagepath: "", 
        quantity: "", 
        price: "", 
        color: "", 
        size: "",
        reviews: []
    });
    const [revs, setRevs] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        var p = searchParams.get("prod_id");
        console.log(p)
        setPid(p);
        getProductInfo(p); // param required here 
    },[]);
    
    const getProductInfo = (pid) => {
        axios.post(routes.get_product_page_info, {
            pid: pid
        }).then((res) => {
            console.log(res.data);
            if (res.data["data"] != null) {
                setProdData(res.data["data"]);
                var reviews = res.data["data"]["reviews"]
                var l = []
                reviews.forEach((e) => {
                    l.push("#" + e["id"] + "    " + e["rating"] + '/5: "' + e["text"] + '" - ' + e["fname"] + " " + e["lname"] +", " + e["date"]);
                });
                setRevs(l);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const requestProductOrder = () => {
        axios.post(routes.add_product_to_cart, {
            pid: pid,
            amount: amount,
            uid: uid
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };

    /*Reviews*/
    const [rating, setRating] = useState(0);

    return (
        <div>          
            <div className='productlist'>
                <label>Debug input fields</label>
                <input type="text" onChange={(e) => {setUid(e.target.value);}}></input>
                <input type="text" onChange={(e) => {setAmount(e.target.value);}}></input>
                <button onClick={requestProductOrder}>Order</button>
            </div>
            <hr/>
                <h1>Fields</h1>
                <p>name: {prodData.name}</p>
                <p>Description: {prodData.description}</p>
                <p>img src: {prodData.imagepath}</p>
                <p>quantity: {prodData.quantity}</p>
                <p>price: {prodData.price}</p>
                <hr/>
                <p>color: {prodData.color}</p>
                <p>size: {prodData.size}</p>
            <hr/>
            <Contentlist elements={revs}></Contentlist>

            <div>
                <h2>Review</h2>
                {Array(5)
                    .fill()
                    .map((_,index)=>
                        rating >= index + 1 ? (
                                <AiFillStar style={{color:'black'}}
                                            onClick={() => setRating(index + 1)}
                                />
                        ) : (
                                 <AiOutlineStar
                                     style={{color:'black'}}
                                     onClick={() => setRating(index + 1)}
                                 />
                    ))}
                <textarea
                    placeholder="Enter your comment here">
                </textarea>
                <button>Submit</button>
            </div>
        </div>

    );};

export default ProductView;
