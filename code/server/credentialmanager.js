const crypto = require("crypto");
const tokenLengthBytes = 64;

var stored = {}

const generateToken = () => {
    while(1) {
        var t = crypto.randomBytes(tokenLengthBytes).toString("hex");
        if (!verifyToken(t)) {
            return t;
        }
    }
}

const verifyToken = (token) => { 
     return (token in stored);
}

const removeToken = (token) => {
    if (verifyToken(token)) {
        delete stored[token];
    }
    console.log(stored);
}

const getUidFromToken = (token) => {
    if (verifyToken(token)) {
        return stored[token["uid"]];
    }
    console.error("invalid token");
}

const getAdminFromToken = (token) => {
    if (verifyToken(token)) {
        return stored[token["admin"]];
    }
    console.error("invalid token");
}

const getUidStored = (uid) => {
    var f = false;
    Object.values(stored).forEach((e) => {
        if (e["uid"] == uid) {
            f = true;
        }
    })
    return f;
}

const assignToken = (uid, admin=false) => {
    token = generateToken();
    stored[token] = {
        "uid": uid,
        "admin": admin
    }
    console.log(stored);
    return token;
}

module.exports = { verifyToken, removeToken, getUidFromToken, assignToken, getUidStored, getAdminFromToken };