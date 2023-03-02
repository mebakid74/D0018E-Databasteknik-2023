import React from "react";
import "../structure/pages.css";

const About = () => {
    return (
        <div className='about'>
            <h1>About us</h1>
            <div className="p-1">
                <p>
                    We are dedicated to providing our customers with the latest fashion trends,
                    high-quality products, and exceptional customer service.
                    <br/>
                    Our team is made up of passionate individuals who are dedicated to providing
                    you with the best shopping experience.
                </p>
                <br/>
            </div>

            <div className="p-2">
                <p>
                    We are always here to assist you with any questions or concerns you may have. <br/>
                    Our customer service team is available to help you with sizing, fit, and any
                    other inquiries you may have.
                </p>
                <br/>
            </div>

            <div className="p-3">
                <p>
                    Thank you for choosing our website for your fashion needs. <br/>
                    We hope you love our clothing as much as we do and we can't wait to see how you style them.
                </p>
            </div>

            <h2>NEWSLETTER</h2>
            <div className="cover">
                <img src="https://images.unsplash.com/photo-1601597676886-2761d9b330bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
            </div>
            <h3>SUBSCRIBE TO BE NOTIFIED <br/>
                OF ALL LATEST UPDATES</h3>
            <button onClick={() => {alert("function not implemented")}}>SUBSCRIBE</button>

        </div>
    );
}
export default About;