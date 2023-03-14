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
    const getFilteredSearch = (p, c="") => {
        axios.post(routes.get_filtered_product_list, {
            filters: searchData.filters,
            sortmode: searchData.sortmode,
            collection: c,
            token: getToken(),
            page: p
        }).then((res) => {
            if (checkSuccess(res)) {
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
                                    <img src = {val.imagepath} />
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