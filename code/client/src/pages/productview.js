import React, {useState} from "react";
import axios from "axios";
import "../structure/pages.css"
import Contentlist from "../components/contentlist";

/////////////////////////////// Route info for debugging:
// POST path: /getproduct
// To backend: product id
// Return: product name, img, desc, quantity, reviews (list)

// POST path: /addproduct
// To backend: product id, ammount, user validation
// Return: confirmed, error
/////////////////////////////////////////////////////////

const ProductView = () => {
    const [pid, setPid] = useState(0);
    const [amount, setAmount] = useState(0);
    const [uid, setUid] = useState(0);
    const [prodData, setProdData] = useState({
        name: "",
        img: "",
        desc: "",
        quantity: ""
    });
    const [els, setEls] = useState([]);

    const getProductInfo = () => {
        axios.post("http://localhost:3001/getproduct", {
            pid: pid
        }).then((res) => {
            setProdData(res.data);
            let l = []
            res.data["reviews"].forEach(el => {
                l = l.concat([el["score"] + "/5: " + el["text"]]);
            });
            setEls(l);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    const requestProductOrder = () => {
        axios.post("http://localhost:3001/addproduct", {
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
                <label>ProductView</label>
                <input type="text" onChange={(e) => {setPid(e.target.value);}}></input>
                <input type="text" onChange={(e) => {setUid(e.target.value);}}></input>
                <input type="text" onChange={(e) => {setAmount(e.target.value);}}></input>
                <button onClick={getProductInfo}>Get product info</button>
                <button onClick={requestProductOrder}>Order</button>
            </div>
            <hr/>
                <p>name: {prodData.name}</p>
                <p>img src: {prodData.img}</p>
                <p>description: {prodData.desc}</p>
                <p>quantity: {prodData.quantity}</p>
            <hr/>
            <Contentlist elements={els}></Contentlist>
        </div>

    );};

export default ProductView;