



export function setUserToken(token: string) {

    localStorage.setItem('token', JSON.stringify(token));
}

export function getUserToken() {
    return JSON.parse(localStorage.getItem('token'));
}

export function getAccessToken() {
    return getUserToken()?.access;
}

export function getRefreshToken() {
    return getUserToken()?.refresh;
}