


export default async function customFetch(url: string, method: string, data: any) {
    const headerData= {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    if(method !== 'GET' && method !== 'HEAD'){
        headerData['body'] = JSON.stringify(data)
    }


    const response = await fetch(url, headerData);
    return response.json();
}