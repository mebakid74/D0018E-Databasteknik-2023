import { Outlet, Link } from "react-router-dom";
import "./pages.css";
import { ShoppingCart } from "phosphor-react";

const Layout = () => {
return (
<>
    <nav className="nav">
        <ul>
             <Link to="/">Home</Link>
             <Link to="/about">About</Link>
             <Link to="/product">Shop</Link>

            <Link to="/cart"><ShoppingCart size={30}/></Link>

        </ul>
    </nav>
    
    <Outlet/>
</>
)};

export default Layout;