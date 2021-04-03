import Cookies from "js-cookie"

export function setUserCookie(userInfo) {
    const info = Object.entries(userInfo);
    for (let i = 0; i < info.length; i++) {
        Cookies.set(info[i][0], info[i][1]);
    }
    return true;
}

export function getUserCookie() {
    return {
        username: Cookies.get('username'),
        appkey: Cookies.get('appkey'),
        email: Cookies.get('email'),
        role: Cookies.get('role')
    }
}

export function removeUserCookie() {
    Cookies.remove('username');
    Cookies.remove('appkey');
    Cookies.remove('email');
    Cookies.remove('role');
    return true;
}