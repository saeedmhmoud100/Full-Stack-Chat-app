import customFetch from "@/hooks/serverActions/methods/customFeatch";


export default async function Get(url : string,token:string, data : any) {
    return await customFetch(url, 'GET',token, data)
}