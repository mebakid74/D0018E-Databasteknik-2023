import { Outlet, Link } from "react-router-dom";
import "./pages.css";
import { ShoppingCart } from "phosphor-react";

const Layout = () => {
return (
<>
    <nav className="nav">
        <ul>
            <Link to="/product">SHOP</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/collection">COLLECTION</Link>
            <div>
                <h1 className='title'>EVERYTHING'S ATTRIE</h1>
            </div>
            <Link to="/">SEARCH PRODUCT</Link>
            <Link to="/account">ACCOUNT</Link>

            <Link to="/cart"><ShoppingCart size={22}/></Link>
        </ul>

    </nav>
    
    <Outlet/>
</>
)};

export default Layout;