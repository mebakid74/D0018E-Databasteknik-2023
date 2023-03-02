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

const isUserValid = () => {
    var t = getCookie("token");
    if (t != null) {
        axios.post(routes.validate_user_login, {
            token: t
        }).then((res) => {
            return res.data["data"]["valid"];
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }
    return false;
};

const isUserAdmin = (validationToken) => {
    var t = getCookie("token");
    console.log(t);
    if (t != null) {
        axios.post(routes.validate_admin_login, {
            token: t
        }).then((res) => {
            console.log(res.data["data"]["admin"]);
            return res.data["data"]["admin"];
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }
}
export { isUserValid, isUserAdmin, setCookie, getCookie, clearCookie };