import { React, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../structure/pages.css"
import axios from "axios";
import { clientParsedRoutes as routes, checkSuccess } from "../constants";
import { getToken } from "../tools/validation"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onChange = (event) => {
        setSearchTerm(event.target.value);}
    const onSearch = (searchTerm) => {
        console.log('search', searchTerm);}

    const [searchData, setSearchData] = useState({
        "filters": {},
        "sortmode": "",
        "collection": ""
    });
    const [resultData, setResultData] = useState([{}]);
    const [searchParams,] = useSearchParams();

    useEffect(() => {
        var p = searchParams.get("page");
        var c = searchParams.get("collection");
        if (c != "") { getFilteredSearch(p, c); }
        else { getFilteredSearch(p); }
        
    },[]);
    const getFilteredSearch = (p, c=searchData.collection) => {
        axios.post(routes.get_filtered_product_list, {
            filters: searchData.filters,
            sortmode: searchData.sortmode,
            collection: searchData.collection,
            token: getToken(),
            page: p
        }).then((res) => {
            if (checkSuccess(res)) {
                console.log(res.data);
                setResultData(res.data["data"]);
            }
        }).catch((err) => {
            console.error(err);
            console.error(err.response.data);
        })
    }

    return (
        <div className="shop">
            <h1>Shop</h1>
            <hr/>
            <div className="search-wrap">
                    <input id="search" type="text" placeholder="Search here" onChange={onChange}/>
            </div>
            <hr/>

            <div className="show">
                <h2>Showing 1-6 of 10 items</h2>
            </div>

            <div className="product-cont">{
                    resultData
                        .filter((val) => {
                            if(searchTerm == "") {
                                return val;
                            } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                            }
                        })
                        .map((val, i) => {
                            return(
                                <Link key={i} to = {"/product?prod_id=" + val.id}>
                                <div key={val.id}>
                                    <img src = {val.imagepath} alt="" />
                                    <h3>{val.name}</h3>
                                    <p className="product_price">{val.price}</p>
                                </div>
                                </Link>
                            )})}
            </div>
        </div>
    )
}
export default Search;
{/* <div className="products">
                <div className="prod-1">
                    <Link to="/product?prod_id=2">
                    <img src="https://images.unsplash.com/photo-1587467512961-120760940315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"/>
                    <h3>Red Leather Flip Case</h3>
                    </Link>
                    <p>$110 USD</p>
                </div>

                <div className="prod-2">
                    <Link to="/product?prod_id=3">
                    <img src="https://images.unsplash.com/photo-1592842312573-dca0b185d2e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"/>
                    <h4>Black and Gold Perfume - CHANEL COCO NOIR</h4>
                    </Link>
                    <p>$60 USD</p>
                </div>

                <div className="prod-3">
                    <Link to="/product?prod_id=4">
                    <img src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=361&q=80"/>
                    <h5>Black Leather - PRADA MILANO Bag</h5>
                    </Link>
                    <p>$150 USD</p>
                </div>

                <header>
                    {/*<button>Got to cart ({cartItems.length})</button>
                </header>
            </div>*/}