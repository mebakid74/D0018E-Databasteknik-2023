import React, {useState} from "react";
import axios from "axios";
import "../structure/pages.css";
import Contentlist from "../components/contentlist";

/////////////////////////////// Route info for debugging:
// POST path: /getcoll
// To backend: collection ID
// Return: prodIds (list)
/////////////////////////////////////////////////////////

const Collection = () => {
    const [cid, setCid] = useState(0);
    const [els, setEls] = useState([]);

    const getCollectionInfo = () => {
        axios.post("http://localhost:3001/getcoll", {
            cid: cid
        }).then((res) => {
            setEls(res.data["prodIds"]);
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    return (
        <div>
            <h1 className='collection'>COLLECTION</h1>
            <input type="text" onChange={(e) => {setCid(e.target.value);}}></input>
            <button onClick={getCollectionInfo}>Get collection info</button>
            <hr/>   
            <Contentlist elements={els}></Contentlist>
        </div>
    )};

export default Collection;