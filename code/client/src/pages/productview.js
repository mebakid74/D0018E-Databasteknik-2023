import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../structure/pages.css"
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes } from "../constants";

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
        size: ""
    });

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        var p = searchParams.get("prod_id");
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

    return (
        <div>          
            <div className='productlist'>
                <label>Debug input fields</label>
                <input type="text" onChange={(e) => {setUid(e.target.value);}}></input>
                <input type="text" onChange={(e) => {setAmount(e.target.value);}}></input>
                <button onClick={requestProductOrder}>Order</button>
            </div>
            <hr/>
                <label>Fields</label>
                <p>name: {prodData.name}</p>
                <p>Description: {prodData.description}</p>
                <p>img src: {prodData.imagepath}</p>
                <p>quantity: {prodData.quantity}</p>
                <p>price: {prodData.price}</p>
                <hr/>
                <p>color: {prodData.color}</p>
                <p>size: {prodData.size}</p>
            <hr/>
        </div>

    );};

export default ProductView;
