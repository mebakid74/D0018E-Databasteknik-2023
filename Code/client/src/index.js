import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './Pages/pages.css';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import About from './Pages/About';
import ProductView from "./Pages/ProductView";
import Account from "./Pages/account";
import Collection from "./Pages/collection";
import Cart from "./Pages/cart";

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
          <Route path="/cart" element={<Cart/>}/>

        </Route>
      </Routes>
      </BrowserRouter> 
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);