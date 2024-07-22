import {getAccessToken} from "@/hooks/localStorage";


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
    if (url[0] == '/') {
        url = url.slice(1)
    }

    url = 'http://127.0.0.1:8000/' + url;

    return await fetch(url, headerData);


}