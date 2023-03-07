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
            token: getToken()
        }).then((res) => {
            if (checkSuccess(res)) {
                alert("Product has been added to cart");
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
            <div className='productlist'>
                <label>Order amount: </label>
                <input type="text" onChange={(e) => {setAmount(e.target.value);}}></input>
                <button onClick={props.userValid ? requestProductOrder 
                                        : ()=>{alert("You must be logged in to order")}}>Order</button>
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
                                <AiFillStar key={index} style={{color:'black'}}
                                            onClick={() => setRating(index + 1)}
                                />
                        ) : (
                                 <AiOutlineStar  key={index} 
                                     style={{color:'black'}}
                                     onClick={() => setRating(index + 1)}
                                 />
                    ))}
                <textarea onChange={(e) => setRevArea(e.target.value)}
                    placeholder="Enter your comment here">
                </textarea>
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