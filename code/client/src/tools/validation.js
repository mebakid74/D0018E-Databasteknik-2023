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

}

const isUserValid = () => {
    var t = getCookie("token");
    if (t != null) {
        return true;
    }
    return false;
};

const isUserAdmin = (validationToken) => {
    return true;
}
export { isUserValid, isUserAdmin, setCookie, getCookie, clearCookie };