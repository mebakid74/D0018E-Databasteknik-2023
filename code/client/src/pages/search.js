import { React, useState } from "react";


const Search = () => {
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
    
    
                <div className="dropdown-1">
                    <h3>Shop by color</h3>
                    <input
                        type="checkbox"
                        name="agreement"
                        onChange={handleChanger}
                    />
                    <label>
                        Black
                    </label>
    
                    <input
                        type="checkbox"
                        name="agreement"
                        onChange={handleChanger}
                    />
                    <label>
                        Red
                    </label>
    
                    <input
                        type="checkbox"
                        name="agreement"
                        onChange={handleChanger}
                    />
                    <label>
                        Green
                    </label>
    
                    <br /><br/>
    
                </div>
    
                <div className="dropdown-2">
    
                <h4>Shop by sizes</h4>
                    <input
                        type="checkbox"
                        name="agreement"
                        onChange={handleChanger}
                    />
                    <label>
                        XL
                    </label>
    
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
    
                </div>
    
                {/*<div className="dropdown-3">
                    <h5>Popular products</h5>
                </div>*/}
    
                <div className="products">
    
                    <div className="prod-1">
                        <img src="https://images.unsplash.com/photo-1587467512961-120760940315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"/>
                        <h3>Red Leather Flip Case</h3>
                        <p>$ 110</p>
                    </div>
    
                    <div className="prod-2">
                        <img src="https://images.unsplash.com/photo-1592842312573-dca0b185d2e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"/>
                        <h4>Black and Gold Perfume - CHANEL COCO NOIR</h4>
                        <p>$ 60</p>
                    </div>
    
                    <div className="prod-3">
                        <img src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=361&q=80"/>
                        <h5>Black Leather - PRADA MILANO Bag</h5>
                        <p>$ 150</p>
                    </div>
                </div>
    
    
    
            </div>
        )
}
export default Search;