import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './Pages/pages.css';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import About from './Pages/About';
import ProductView from "./Pages/ProductView";

import account from "./Pages/user/account";
import collection from "./Pages/collection";
import cart from "./Pages/cart/cart";

export default function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route index element={<Home/>} />
          <Route path="about" element={<About/>}/>
          <Route path="product" element={<ProductView/>} />

          <Route path="account" element={<account/>}/>
          <Route path="collection" element={<collection/>}/>
          <Route path="/cart" element={<cart/>}/>

        </Route>
      </Routes>
      </BrowserRouter> 
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);