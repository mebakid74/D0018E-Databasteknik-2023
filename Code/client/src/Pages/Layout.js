import { Outlet, Link } from "react-router-dom";

const Layout = () => {
return (
<>
    <nav>
        <ul>
            <li> <Link to="/">Homepage</Link> </li>
            <li> <Link to="/about">About</Link> </li>
        </ul>
    </nav>
    
    <Outlet/>
</>
)};

export default Layout;