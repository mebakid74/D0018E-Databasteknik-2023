import React, {useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import {clientParsedRoutes as routes} from "../constants";
import { useSearchParams } from "react-router-dom";

class Contentlist extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    {this.props.elements.map((el) => <li key={el}>{el}</li>)}
                </ul>
            </div>
        );
    }
}
export default Contentlist;
