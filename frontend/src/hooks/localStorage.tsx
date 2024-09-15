



export function setUserToken(token: {access: string, refresh: string }) {

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

export function setAccessToken(token: string) {
    const userToken = getUserToken();
    if(!userToken) return;
    userToken.access = token;
    setUserToken(userToken);
}

export function setRefreshToken(token: string) {
    const userToken = getUserToken();
    if(!userToken) return;
    userToken.refresh = token;
    setUserToken(userToken);

}

export function removeUserToken() {
    localStorage.removeItem('token');
}