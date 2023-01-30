import './App.css';
import React, {useState} from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import About from './Pages/About';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="about" element={<About/>}/>
       </Route>
    </Routes>
    </BrowserRouter> 
  );
}

export default App;