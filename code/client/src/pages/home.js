import React, {useEffect} from "react";
import { useState } from "react";
import "../structure/pages.css";

import home from "../asset/video/home.mp4";
import img4 from "../asset/image/img4.jpg";
import img6 from "../asset/image/img6.jpg";
import img10 from "../asset/image/img10.jpg";
import img11 from "../asset/image/img11.jpg";
import img12 from "../asset/image/img12.jpg";
import img13 from "../asset/image/img13.jpg";
import img14 from "../asset/image/img14.jpg";

import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import {Link, useSearchParams} from "react-router-dom";

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
        setCurrentSlide(currentSlide === 0 ? 4 : prevSlide => prevSlide - 1);
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 4 ? 0 : prevSlide => prevSlide + 1);
    };


    return (
        <div className="home">

        <div className="container" style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
             {data.map((image, index) => (
                <img key={index} src={image} alt="" />
            ))}
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
            <h1>LEATHER SHARP 2023 </h1>
            <img src={img4} className="img4" alt=""/>
            <p>$28.00 USD</p>
            <h2>NEW COLLECTION</h2>
            <p2>Elevate your style with our metallic finished bovine leather accessory. </p2> <br/>
            <p3>Expertly crafted in Spain, it features a metal buckle closure and a leather </p3> <br/>
            <p4>belt loop for added convenience. </p4>
            <br />
            <Link to="/collection">
                <button>VIEW ALL</button>
            </Link>
        </div>

        <div className="home-2">
            <h2>OVERSIZE CIRCLES BELT</h2>
            <img src={img6} className="img6" alt=""/>
            <p4>
                Metal belt with different sized circles and lobster clasp
                closure.
            </p4>
            <br/>
            <p5>$58.00 USD</p5>
            <br />
            <Link to="search?collection=0">
            <button>VIEW ALL</button>
            </Link>
        </div>

        <div className="home-3">
            <h3>SPRING SUMMER
                2023 COLLECTION</h3>
            <img src={img14} className="img14" alt=""/>
            <Link to="/collection">
                <br/>
            <button>VIEW COLLECTION</button>
            </Link>
        </div>

        <div className="home-4">
            <h4>SEASONAL HIGHLIGHTS</h4>
            <div className="home-prod-w">
            <div className="home-prod-1">
                <Link to="/product">
                    <img src={img10} className="img10"/>
                    <h1>Off-white Dreamy</h1>
                </Link>
                <p>$95.00 USD</p>
            </div>

            <div className="home-prod-2">
                <Link to="/product">
                    <img src={img11} className="img11" alt=""/>
                    <h1>Off-white classics </h1>
                </Link>
                <p>$110.00 USD</p>
            </div>

            <div className="home-prod-3">
                <Link to="/product">
                    <img src={img13} className="img13" alt=""/>
                    <h1>Off-white limited edition </h1>
                </Link>
                <p>$180.00 USD</p>
            </div>
            </div>
            <div className="home-prod">
                <Link to="search?collection=0">
                    <button>VIEW ALL</button>
                </Link>
            </div>
        </div>

        <div className="home-5">
            <h5>COLLECTION V5 COMING UP SOON</h5>
            <video loop autoPlay muted>
                <source src={home} />
            </video>
        </div>

        <div className="home-6">
            <h6>NEWSLETTER</h6>
            <div className="cover">
                <img src={img12} className="img12" alt=""/>
            </div>
            <div className="news-1">
                <h1>SUBSCRIBE TO BE NOTIFIED <br/>
                    OF ALL LATEST UPDATES</h1>
            </div>
            <input
                type="text"
                placeholder="Enter your email here"
            />
            <button onClick={() => {alert("Newletter and subscription success")}}>SUBSCRIBE</button>
        </div>

        <div className="home-7">
            <h8>EVERYTHING'S ATTIRE FOOTER</h8>
            <div className="footer.w">
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
        </div>
        <br/>
        <div className="home-8">
            <h9>All rights received - 2023 EVERYTHING'S ATTIRE  </h9>
            <h10>Terms & Conditions</h10>
            <h11>Luleå, Sweden</h11>
            <h12>2023-02-26</h12>
        </div>

    </div>

);};

export default Home;