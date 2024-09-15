import {getAccessToken} from "@/hooks/localStorage";


export const backendUrl = 'http://127.0.0.1:8000'

export default async function customFetch(url: string, method: string, data: any={},formData=false) {
    const token = getAccessToken();
    const headerData = {
        method: method,
        headers: {
            "Content-Type":"application/json"
        },
    }

    if (token) {
        headerData.headers['Authorization'] = `Bearer ${token}`
    }else{
        // headerData.headers['Content-Type'] = 'application/json'
    }
    if (method !== 'GET' && method !== 'HEAD') {
        headerData['body'] = formData ? data : JSON.stringify(data)
    }

    if (url[0] != '/') {
        url = '/' + url;
    }

    url = backendUrl + url;
    return await fetch(url, headerData);
}