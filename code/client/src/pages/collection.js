import React, {useState} from "react";
import axios from "axios";
import "../structure/pages.css";
import Contentlist from "../components/contentlist";
import {Title} from "@mui/icons-material";

/*import Carousel from 'react-bootstrap/Carousel';*/

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/////////////////////////////// Route info for debugging:
// POST path: /getcoll
// To backend: collection ID
// Return: prodIds (list)
/////////////////////////////////////////////////////////

/*const Collection = () => {
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

export default Collection;*/

const Collection = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className="collection">
            <h1>Collection</h1>

            <p>
                New freshness and lightness.  In a juxtaposition of elements and garments - direct, recognizable, and <br/>
                archetypal pieces - the collection is an expression of a choice that evokes memories, domestication,
                and sophistication.
            </p>

            <br/>

            <hr/>

            <container>
                <div>
                    <h2>Filter | Sort</h2>

                    {/* <h3>New Collection</h3>

                    <h4>Spring Summer 2023 Collection</h4>

                    <h5>Seasonal Highlights</h5>

                    <h6>Best Sellers</h6>*/}
                </div>

                <Carousel responsive={responsive}>
                    <div className="item-1">
                        New Collection
                        <img src = "https://images.unsplash.com/photo-1587538520952-fafa4eeee7be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"/>
                    </div>

                    <div className="item-2">
                        Spring Summer 2023 Collection
                        <img src="https://images.unsplash.com/photo-1596993100471-c3905dafa78e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
                    </div>

                    <div className="item-3">
                        Seasonal Highlights
                        <img src="https://images.unsplash.com/photo-1601597565151-70c4020dc0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
                    </div>

                    <div className="item-4">
                        Best Sellers
                        <img src="https://images.unsplash.com/photo-1523297467724-f6758d7124c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=419&q=80"/>
                    </div>
                </Carousel>


            </container>

        </div>

    )
};

export default Collection;


