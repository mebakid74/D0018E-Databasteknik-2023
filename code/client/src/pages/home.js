import React from "react";
import { useState } from "react";

import "../structure/pages.css";
import home from "../asset/video/home.mp4";

import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import {Link} from "react-router-dom";

/////////////////////////////// Route info for debugging:
// nothing atm; static page
/////////////////////////////////////////////////////////

const Home = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const data = [
        "https://images.unsplash.com/photo-1528120369764-0423708119ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
        "https://images.unsplash.com/photo-1635279474047-ab3cda78bbe8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80",
        "https://images.unsplash.com/photo-1546536133-d1b07a9c768e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
        "https://images.unsplash.com/photo-1603189343302-e603f7add05a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    ];

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1
    )};
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1
    )};


return (
    <div className="home">
        <div className="container" style={{transform:
        `translateX(-${currentSlide * 100}vw)`}} >
            <img src={data[0]} alt="" />
            <img src={data[1]} alt="" />
            <img src={data[2]} alt="" />
            <img src={data[3]} alt="" />
            <img src={data[4]} alt="" />

        </div>

        <div className="icons">
            <div className="icon" onClick={prevSlide}>
                <WestOutlinedIcon />
            </div>
            <div className="icon" onClick={nextSlide}>
                <EastOutlinedIcon />
            </div>
        </div>

        <div className="home-1">
            <p1>LEATHER SHARP 2023 </p1> <br />
            <p2>$28.00 USD</p2>
            <br />
            <h1>NEW COLLECTION</h1>
            <p3>
                Elevate your style with our metallic finished bovine leather accessory.
                Expertly crafted in Spain, it features a metal buckle closure and a leather
                belt loop for added convenience.
            </p3>
            <br />
            <button>ADD TO CART ></button>
        </div>

        <br/>

        <div className="home-2">
            <h2>OVERSIZE CIRCLES BELT</h2>
            <p4>
                Metal belt with different sized circles and lobster clasp closure.
            </p4>
            <br/>
            <p5>$58.00 USD</p5>
            <br />
            <button>VIEW ALL ></button>
        </div>

        <br/>

        <div className="home-3">
            <h3>SPRING SUMMER 2023 COLLECTION</h3>
            <button>VIEW COLLECTION ></button>
        </div>

        <br/>

        <div className="home-4">
            <h4>SEASONAL HIGHLIGHTS</h4>
            <div className="home.prod-1">
                <Link to="/product">
                    <img src=""/>
                    <h1>Off-white Dreamy</h1>
                </Link>
                <p>$95.00 USD</p>
            </div>
            <br/>
            <div className="home.prod-2">
                <Link to="/product">
                    <img src=""/>
                    <h1>Off-white classics </h1>
                </Link>
                <p>$110.00 USD</p>
            </div>
            <br/>
            <div>
                <button>VIEW ALL ></button>
            </div>
        </div>
        <br/>
        <div className="home-5">
            <h5>COLLECTION V5 COMING UP SOON</h5>
            <video loop autoPlay>
                <source src={home} />
            </video>
        </div>

        <br/>
        <div className="home-6">
            <h6>NEWSLETTER</h6>
            <div className="cover">
                <img src="https://images.unsplash.com/photo-1601597676886-2761d9b330bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
            </div>
            <h7>SUBSCRIBE TO BE NOTIFIED <br/>
                OF ALL LATEST UPDATES</h7>
            <br/>
            <button>SUBSCRIBE</button>
        </div>
        <br/>
        <div className="home-7">
            <h8>EVERYTHING'S ATTIRE FOOTER</h8>
            <div className="footer-1">
                <h1>Navigate</h1>
                <ul>SHOP</ul>
                <ul>COLLECTION</ul>
                <ul>ABOUT</ul>
                <ul>ACCOUNT</ul>
                <ul>CART</ul>
            </div>
            <br/>
            <div className="footer-2">
                <h1>Assistance</h1>
                <ul>Shipping & returns</ul>
                <ul>Privacy policy</ul>
                <ul>FAQ</ul>
            </div>
            <br/>
            <div className="footer-3">
                <h1>Socials</h1>
                <ul>Instagram</ul>
                <ul>Facebook</ul>
                <ul>Youtube</ul>
            </div>
        </div>
        <br/>
        <div className="home-8">
            <h9>All rights received - 2023 EVERYTHING'S ATTIRE  </h9>
            <br/>
            <h10>Terms & Conditions</h10>
            <br/>
            <h11>Luleå, Sweden</h11>

        </div>

    </div>

);};

export default Home;