import React, {useState} from "react";
import axios from "axios";
import "./pages.css";

const ProductView = () => {
    const [pid, setPid] = useState(0);
    const getProductInfo = () => {
        axios.post("http://localhost:3001/getproduct", {
            pid: pid
        }).then((res) => {
            var pname = res.data;
            console.log("product name: " + pname);
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>          
            <div className='productlist'>
                <label>ProductView</label>
                <input type="text" onChange={(e) => {setPid(e.target.value);}}></input>
                <button onClick={getProductInfo}>Get info</button>
            </div>
        </div>

    );};

export default ProductView;