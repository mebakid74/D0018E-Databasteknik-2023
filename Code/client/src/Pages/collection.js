import React, {useState} from "react";
import axios from "axios";
import "./pages.css";

/////////////////////////////// Route info for debugging:
// POST path: /getcoll
// To backend: collection ID
// Return: prodIds (list)
/////////////////////////////////////////////////////////

const Collection = () => {
    const [cid, setCid] = useState(0);

    const getCollectionInfo = () => {
        axios.post("http://localhost:3001/getcoll", {
            cid: cid
        }).then((res) => {
            let parent = document.getElementById("itemlist");
            let list = document.createElement("ul");
            res.data["prodIds"].forEach(e => {
                let el = document.createElement("li");
                el.innerHTML = e;
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
            <h1 className='collection'>COLLECTION</h1>
            <input type="text" onChange={(e) => {setCid(e.target.value);}}></input>
            <button onClick={getCollectionInfo}>Get collection info</button>
            <hr/>   
            <div id="itemlist"/>
        </div>
    )};

export default Collection;