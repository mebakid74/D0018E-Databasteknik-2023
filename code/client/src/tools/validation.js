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

const clearCookie = () => {
    //to be implemented (for logout)
}

const isUserValid = () => {
    var t = getCookie("token");
    console.log(t);
    if (t != null) {
        axios.post(routes.validate_user_login, {
            token: t
        }).then((res) => {
            console.log(res.data["data"]["valid"]);
            return res.data["data"]["valid"];
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }
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