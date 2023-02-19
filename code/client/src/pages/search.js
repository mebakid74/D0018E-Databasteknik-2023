import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../structure/pages.css"
import Contentlist from "../components/contentlist";
import ProductView from "./productview";

const Search = () => {

    const [cartItems, setCartItems] = useState([]);
    const { products } = Contentlist;
    const onAdd = (product) => {
        console.log("Item added to cart");
        setCartItems([...cartItems, products]);
    }
    /*const onRemove = (product) => {
        console.log("Item removed from cart");
         setCartItems([...cartItems, products]);
    }*/
    /*constant array of product name, details e.t.c */
    const [searchInput, setSearchInput] = useState("");
    const product = [
        { name: "Bag", content: "Accessory", color: "Black" },
    ];

    /*Handler function that will read changes in the search bar and return the product.*/
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        product.filter((content) => {
            return content.name.match(searchInput);
        });
    }

    /*Sorting and Filter */
    const [agreement, setAgreement] = useState(false);
    const handleChanger = (event) => {
        setAgreement(event.target.checked);
    };

    return (
        <div className="shop">
            <h1>Shop</h1>
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />
            <div className="show">
                <h2>Showing 1-6 of 10 items</h2>
            </div>

            {/* /<div className="dropdown-1">
                <h3>Shop by color</h3>
                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>Black</label>

                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>Red</label>

                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>Green</label>

                <br /><br/>
            </div>

            <div className="dropdown-2">

            <h4>Shop by sizes</h4>
                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>XL</label>
                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>
     L
                </label>

                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChanger}
                />
                <label>
                    M
                </label>

                <br /><br/>

                <button disabled={!agreement}>FILTER</button>

            </div> */}

            {/*<div className="dropdown-3">
                <h5>Popular products</h5>
            </div>*/}

            <div className="products">

                <div className="prod-1">
                    <Link to="/product?prod_id=2">
                    <img src="https://images.unsplash.com/photo-1587467512961-120760940315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"/>
                    <h3>Red Leather Flip Case</h3>
                    </Link>
                    <p>$110 USD</p>
                    {/*<button onClick={() => onAdd(product)}>Add to cart</button>*/}
                </div>

                <div className="prod-2">
                    <Link to="/product?prod_id=3">
                    <img src="https://images.unsplash.com/photo-1592842312573-dca0b185d2e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"/>
                    <h4>Black and Gold Perfume - CHANEL COCO NOIR</h4>
                    </Link>
                    <p>$60 USD</p>
                    {/*<button onClick={() => onAdd(product)}>Add to cart</button>*/}
                </div>

                <div className="prod-3">
                    <Link to="/product?prod_id=4">
                    <img src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=361&q=80"/>
                    <h5>Black Leather - PRADA MILANO Bag</h5>
                    </Link>
                    <p>$150 USD</p>
                    {/*<button onClick={() => onAdd(product)}>Add to cart</button>*/}
                </div>

                <header>
                    {/*<button>Got to cart ({cartItems.length})</button>*/}
                </header>

            </div>

        </div>

    )
}
export default Search;
