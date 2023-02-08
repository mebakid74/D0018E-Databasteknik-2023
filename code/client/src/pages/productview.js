import React, {useState} from "react";
import axios from "axios";
import "./pages.css";

/////////////////////////////// Route info for debugging:
// POST path: /getproduct
// To backend: product id
// Return: product name, img, desc, quantity, reviews (list)
/////////////////////////////////////////////////////////

const ProductView = () => {
    const [pid, setPid] = useState(0);
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState(0);

    const getProductInfo = () => {
        axios.post("http://localhost:3001/getproduct", {
            pid: pid
        }).then((res) => {
            setName(res.data["name"]);
            setImg(res.data["img"]);
            setDesc(res.data["desc"]);
            setQuantity(res.data["quantity"]);
            let parent = document.getElementById("itemlist");
            let list = document.createElement("ul");
            res.data["reviews"].forEach(e => {
                let el = document.createElement("li");
                el.innerHTML = e["score"] + "/5  :  "  + e["text"];
                list.append(el);
            });
            parent.appendChild(list);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    return (
        <div>          
            <div className='productlist'>
                <label>ProductView</label>
                <input type="text" onChange={(e) => {setPid(e.target.value);}}></input>
                <button onClick={getProductInfo}>Get product info</button>
            </div>
            <hr/>
                <p>name: {name}</p>
                <p>img src: {img}</p>
                <p>description: {desc}</p>
                <p>quantity: {quantity}</p>
            <hr/>
            <div id="itemlist"/>
        </div>

    );};

export default ProductView;