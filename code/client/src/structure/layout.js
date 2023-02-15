import { Outlet, Link } from "react-router-dom";
import "./pages.css";

const Layout = () => {
return (
<>
    <nav className="nav">
        <ul>
            <Link to="/product">SHOP</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/collection">COLLECTION</Link>
            <div>
                <h1 className='title'>EVERYTHING'S ATTIRE</h1>
            </div>
            <Link to="/">HOME</Link>
            <Link to="/cart">CART</Link>
            <Link to="/account">ACCOUNT</Link>
        </ul>

    </nav>
    
    <Outlet/>
</>
)};

export default Layout;