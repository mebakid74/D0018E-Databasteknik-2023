import React, {useState, useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../structure/pages.css"
import Contentlist from "../components/contentlist";
import { clientParsedRoutes as routes, checkSuccess } from "../constants";
import { getToken } from "../tools/validation";
import PartialUserPage from "../components/partialuserpage";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";

const Page = (props) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [pid, setPid] = useState(0);
    const [revs, setRevs] = useState([]);
    const [revarea, setRevArea] = useState("");
    const [searchParams,] = useSearchParams();
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
    const [rating, setRating] = useState(0);

    useEffect(() => {
        var p = searchParams.get("prod_id");
        setPid(p);
        getProductInfo(p);
    },[]);
    
    const getProductInfo = (pid) => {
        axios.post(routes.get_product_page_info, { pid: pid
        }).then((res) => {
            if (checkSuccess(res)) {
                setProdData(res.data["data"]);
                var reviews = res.data["data"]["reviews"]
                var l = []
                reviews.forEach((e) => {
                    l.push(e["rating"] + '/5: "' + e["text"] + '" - ' + e["fname"] + " " + e["lname"] +", " + e["date"]);
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
            token: getToken()
        }).then((res) => {
            if (checkSuccess(res)) {
                alert("Product has been added to cart");
                navigate(0);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };
    const requestReviewAdd = () => {
        axios.post(routes.add_product_review, {
            pid: pid,
            token: getToken(),
            text: revarea,
            rating: rating
        }).then((res) => {
            if (checkSuccess(res)) {
                alert("review has been placed");
                navigate(0);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    };

    return (
        <div>
            <div className="product-head">
                <div className="phead-1">
                    <img src= {prodData.imagepath}></img><br></br>
                </div>
                {/*<h1>Fields</h1>*/}
                <p1>Name: {prodData.name}</p1>
                <p1>Description: {prodData.description}</p1>
                <p1>Quantity: {prodData.quantity}</p1>
                <p1>Price: {prodData.price}</p1>

                <p2>color: {prodData.color}</p2>
                <p2>size: {prodData.size}</p2>
                <hr/>
            </div>

            <br/>

            <div className='productlist'>
                <label>Order amount: </label>
                <input type="number" onChange={(e) => {setAmount(e.target.value);}}></input>
                <br/>
                <button onClick={props.userValid ? requestProductOrder
                    : ()=>{alert("You must be logged in to order")}}>Add to cart</button>
            </div>

            <div className="review">
                <h1>Customer Reviews</h1>
                <div className="review-list">
                    <Contentlist  elements={revs}></Contentlist>
                </div>

            </div>

            <div className="review-2">
                <h2>Tells us what you think about our product</h2>
                <textarea onChange={(e) => setRevArea(e.target.value)}
                          placeholder="Enter your comment here">
                </textarea>
                <br/>
                {Array(5)
                    .fill()
                    .map((_,index)=>
                        rating >= index + 1 ? (
                                <AiFillStar key={index} style={{color:'black'}}
                                            onClick={() => setRating(index + 1)}
                                />
                        ) : (
                                 <AiOutlineStar  key={index} 
                                     style={{color:'black'}}
                                     onClick={() => setRating(index + 1)}
                                 />
                    ))}
                <br/>
                <button onClick={props.userValid ? requestReviewAdd
                    : ()=>{alert("You must be logged in to review")}
                }>Submit</button>
            </div>
        </div>

    );
};

const ProductView = () => {
    return (
        <div>
            <PartialUserPage pageFunc={Page}/>
        </div>
    );
}

export default ProductView;