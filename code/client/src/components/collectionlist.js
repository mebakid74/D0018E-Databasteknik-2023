import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {clientParsedRoutes as routes} from "../constants";

const Collectionlist = () => {

    //List for only one specific collection products
    const [collection, setCollection] = useState();
    const [collectionId, setCollectionId] = useState(0);
    const [collectionData, setCollectionData] = useState({
        collectionName: "",
        productName: "",
        productPrice: "",
    });
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        var collection = searchParams.get("collection_id");
        console.log(collection)
        setCollectionId(collection);
        getCollectionInfo(collection);
    },[]);

    const getCollectionInfo = (collectionId) => {
        axios.post(routes.get_collectionpage_info, {
            collectionId: collectionId
        }).then((res) => {
            console.log(res.data);
            if (res.data["data"] != null) {
                setCollectionData(res.data["data"]);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };

    return (
        <div>
            <div className='collectionproductlist'>
                <h1>Collection Type</h1>
                <div className="collectiondetails">
                    <p>collectionName: {collectionData.name}</p>
                    <p>productName: {collectionData.name}</p>
                    <p>productPrice: {collectionData.price}</p>
                </div>

            </div>
        </div>
    );
};

export default Collectionlist;