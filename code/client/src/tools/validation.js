import axios from "axios";
import { clientParsedRoutes as routes } from "../constants"

const setCookie = (key, value) => {
    document.cookie = key+"="+value+";";
}

// https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
const getCookie = (key) => {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${key}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

//https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
const clearCookie = (key, value) => {
    /*if( getCookie( key )) {
        document.getCookie = value + "="+
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
        "   ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }*/
}

const setToken = (v) => {setCookie("token", v);} 
const getToken = () => {return getCookie("token");}
const clearToken = () => {clearCookie("token")}

export { setToken, getToken, clearToken };