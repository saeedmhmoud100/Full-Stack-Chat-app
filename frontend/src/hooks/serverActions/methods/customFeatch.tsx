import {getAccessToken} from "@/hooks/localStorage";


export const backendUrl = 'http://127.0.0.1:8000'

export default async function customFetch(url: string, method: string, data: any) {
    const headerData = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    if (method !== 'GET' && method !== 'HEAD') {
        headerData['body'] = JSON.stringify(data)
    }
    const token = getAccessToken();
    if (token) {
        headerData.headers['Authorization'] = `Bearer ${token}`
    }
    if (url[0] != '/') {
        url = '/' + url;
    }

    url = backendUrl + url;

    return await fetch(url, headerData);


}