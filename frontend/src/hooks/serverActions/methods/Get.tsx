import customFetch from "@/hooks/serverActions/methods/customFeatch";


export default async function Get(url : string, data : any) {
    return await customFetch(url, 'GET', data)
}