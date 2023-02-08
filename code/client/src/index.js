import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './pages/pages.css';
import Home from './pages/home';
import Layout from './pages/layout';
import About from './pages/about';
import ProductView from "./pages/productview";
import Account from "./pages/account";
import Collection from "./pages/collection";
import Cart from "./pages/cart";

export default function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route index element={<Home/>} />
          <Route path="about" element={<About/>}/>
          <Route path="product" element={<ProductView/>} />
          <Route path="account" element={<Account/>}/>
          <Route path="collection" element={<Collection/>}/>
          <Route path="cart" element={<Cart/>}/>

        </Route>
      </Routes>
      </BrowserRouter> 
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);